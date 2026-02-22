"use client";

import { useState, useEffect, useMemo } from "react";
import { Corporation } from "@/data/brands";
import {
  fetchWikidataOwnership,
  fetchOwnershipByName,
  OwnershipTreeData,
  getCached,
  setCache,
} from "@/lib/api";

interface OwnershipTreeProps {
  productName?: string;
  brandName?: string;
  corporation?: Corporation;
  /** For products found via Open Food Facts (no local corporation) */
  externalBrandOwner?: string;
}

interface TreeOwner {
  name: string;
  ownershipPercent?: number;
  type: "individual" | "family" | "institutional" | "executive" | "unknown";
  role?: string;
  estimatedValue?: string;
  source: "local" | "wikidata";
}

export default function OwnershipTree({
  productName,
  brandName,
  corporation,
  externalBrandOwner,
}: OwnershipTreeProps) {
  const companyName = corporation?.name || externalBrandOwner;
  const cacheKey = useMemo(
    () => (companyName ? `wd:${corporation?.wikidataId || companyName}` : null),
    [companyName, corporation?.wikidataId]
  );

  // Check cache synchronously for initial state
  const initialCached = useMemo(
    () => (cacheKey ? getCached<OwnershipTreeData>(cacheKey) : null),
    [cacheKey]
  );

  const [wikidataTree, setWikidataTree] = useState<OwnershipTreeData | null>(
    initialCached
  );
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!companyName || !cacheKey || initialCached) return;

    let cancelled = false;
    const wikidataId = corporation?.wikidataId;

    const controller = new AbortController();

    (async () => {
      try {
        if (!cancelled) setLoading(true);

        const tree = wikidataId
          ? await fetchWikidataOwnership(wikidataId)
          : await fetchOwnershipByName(companyName);

        if (!cancelled && tree) {
          setCache(cacheKey, tree);
          setWikidataTree(tree);
        }
      } catch {
        if (!cancelled) setFetchError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [companyName, corporation?.wikidataId, cacheKey, initialCached]);

  // Merge local + Wikidata owners
  const owners: TreeOwner[] = [];

  if (corporation) {
    for (const o of corporation.owners) {
      owners.push({
        name: o.name,
        ownershipPercent: o.ownershipPercent,
        type: o.type,
        role: o.role,
        estimatedValue: o.estimatedValue,
        source: "local",
      });
    }
  }

  // Add Wikidata-only owners not already in local data
  if (wikidataTree) {
    for (const wo of wikidataTree.owners) {
      const exists = owners.some(
        (o) =>
          o.name.toLowerCase().includes(wo.name.toLowerCase()) ||
          wo.name.toLowerCase().includes(o.name.toLowerCase())
      );
      if (!exists) {
        owners.push({
          name: wo.name,
          ownershipPercent: wo.ownershipPercent,
          type: "unknown",
          source: "wikidata",
        });
      }
    }
  }

  const ownersWithStake = owners
    .filter((o) => o.ownershipPercent)
    .sort((a, b) => (b.ownershipPercent || 0) - (a.ownershipPercent || 0));
  const executives = owners.filter((o) => o.type === "executive");
  const totalKnown = ownersWithStake.reduce(
    (s, o) => s + (o.ownershipPercent || 0),
    0
  );

  // Color for owner type dot
  const dotColor = (type: TreeOwner["type"]) => {
    switch (type) {
      case "family":
        return "bg-purple-500";
      case "individual":
        return "bg-blue-500";
      case "institutional":
        return "bg-stone-400";
      case "executive":
        return "bg-stone-300";
      default:
        return "bg-stone-300";
    }
  };

  return (
    <div className="rounded-xl border-2 border-red-200 bg-gradient-to-b from-red-50 to-white p-4">
      <p className="text-xs font-black uppercase tracking-wider text-red-600">
        Ownership Tree
      </p>

      <div className="mt-3 space-y-0">
        {/* ── Product node ── */}
        {productName && (
          <>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-stone-200 text-sm">
                <svg
                  className="h-4 w-4 text-stone-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-700">
                  {productName}
                </p>
                {brandName && brandName !== productName && (
                  <p className="text-[10px] text-stone-400">
                    Brand: {brandName}
                  </p>
                )}
              </div>
            </div>
            {/* connector */}
            <div className="ml-3.5 h-4 border-l-2 border-dashed border-red-200" />
          </>
        )}

        {/* ── Corporation node ── */}
        {(corporation || externalBrandOwner) && (
          <div className="rounded-lg bg-red-100/60 p-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-200 text-sm">
                <svg
                  className="h-4 w-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-stone-900">
                  {corporation?.name || externalBrandOwner}
                </p>
                {corporation && (
                  <p className="text-[10px] text-stone-500">
                    {corporation.country} &middot; {corporation.revenue}
                    {corporation.publiclyTraded ? " · Public" : " · Private"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Wikidata parent org ── */}
        {wikidataTree?.parentOrg && (
          <>
            <div className="ml-3.5 h-3 border-l-2 border-dashed border-amber-300" />
            <div className="ml-5 flex items-center gap-2 rounded bg-amber-50 px-2.5 py-1.5">
              <svg
                className="h-3 w-3 shrink-0 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <p className="text-[10px] text-amber-700">
                Parent: <strong>{wikidataTree.parentOrg.label}</strong>
              </p>
              <span className="rounded bg-amber-100 px-1 py-px text-[8px] font-bold text-amber-600">
                WIKIDATA
              </span>
            </div>
          </>
        )}

        {/* ── Connector to owners ── */}
        <div className="ml-3.5 h-3 border-l-2 border-dashed border-red-200" />

        {/* ── Shareholders with stakes ── */}
        {ownersWithStake.length > 0 && (
          <div className="relative ml-5">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-red-500">
              Shareholders
            </p>

            {/* vertical line */}
            <div className="absolute -left-4 top-5 bottom-0 border-l border-red-200" />

            <div className="space-y-1">
              {ownersWithStake.map((owner, i) => (
                <div key={i} className="relative flex items-center gap-0">
                  {/* horizontal branch */}
                  <div className="absolute -left-4 top-1/2 w-4 border-t border-red-200" />

                  <div className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-1.5 shadow-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`h-2 w-2 shrink-0 rounded-full ${dotColor(owner.type)}`}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-stone-900">
                          {owner.name}
                        </p>
                        {owner.role && (
                          <p className="truncate text-[10px] text-stone-400">
                            {owner.role}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs font-black text-red-600">
                          {owner.ownershipPercent}%
                        </p>
                        {owner.estimatedValue && (
                          <p className="text-[10px] text-stone-400">
                            {owner.estimatedValue}
                          </p>
                        )}
                      </div>
                      {/* mini bar */}
                      <div className="h-3 w-10 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-red-400"
                          style={{
                            width: `${Math.min(owner.ownershipPercent || 0, 100)}%`,
                          }}
                        />
                      </div>
                      {owner.source === "wikidata" && (
                        <span className="rounded bg-blue-50 px-1 py-px text-[7px] font-bold text-blue-500">
                          WD
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* other shareholders remainder */}
              {totalKnown > 0 && totalKnown < 100 && (
                <div className="relative">
                  <div className="absolute -left-4 top-1/2 w-4 border-t border-red-200" />
                  <div className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-1.5">
                    <p className="text-[10px] text-stone-400">
                      Other shareholders
                    </p>
                    <p className="text-[10px] font-bold text-stone-400">
                      {(100 - totalKnown).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Executives ── */}
        {executives.length > 0 && (
          <div className="ml-5 mt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Key Executives
            </p>
            <div className="mt-1 space-y-0.5">
              {executives.map((exec, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-0.5">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-stone-300" />
                  <p className="text-[10px] text-stone-600">
                    <strong>{exec.name}</strong>
                    {exec.role && <span> — {exec.role}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Subsidiaries from Wikidata ── */}
        {wikidataTree?.subsidiaries && wikidataTree.subsidiaries.length > 0 && (
          <div className="ml-5 mt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Subsidiaries{" "}
              <span className="rounded bg-blue-50 px-1 py-px text-[7px] font-bold text-blue-500">
                WIKIDATA
              </span>
            </p>
            <div className="mt-1 flex flex-wrap gap-1">
              {wikidataTree.subsidiaries.slice(0, 12).map((sub, i) => (
                <span
                  key={i}
                  className="rounded bg-stone-100 px-2 py-0.5 text-[10px] text-stone-500"
                >
                  {sub.label}
                </span>
              ))}
              {wikidataTree.subsidiaries.length > 12 && (
                <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] text-stone-400">
                  +{wikidataTree.subsidiaries.length - 12} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="mt-2 flex items-center gap-2 rounded bg-stone-50 px-3 py-2">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
            <p className="text-[10px] text-stone-400">
              Fetching live ownership data from Wikidata...
            </p>
          </div>
        )}

        {/* ── Error ── */}
        {fetchError && !wikidataTree && (
          <div className="mt-2 rounded bg-stone-50 px-3 py-2">
            <p className="text-[10px] text-stone-400">
              Could not reach Wikidata. Showing local data only.
            </p>
          </div>
        )}

        {/* ── Source badges ── */}
        <div className="mt-3 flex items-center gap-2">
          {corporation && (
            <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[8px] font-bold text-stone-500">
              LOCAL DATA
            </span>
          )}
          {wikidataTree && (
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[8px] font-bold text-blue-500">
              + WIKIDATA LIVE
            </span>
          )}
          {!corporation && !wikidataTree && !loading && externalBrandOwner && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[8px] font-bold text-amber-500">
              OPEN FOOD FACTS
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
