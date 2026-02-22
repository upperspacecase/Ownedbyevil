"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getCorporation,
  getBrandsByCorporation,
  getRatingColor,
  getRatingLabel,
  getSeverityColor,
} from "@/data/brands";
import { RatingCircle, RatingBar } from "@/components/RatingBadge";
import BrandCard from "@/components/BrandCard";

export default function CorporationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const corp = getCorporation(slug);

  if (!corp) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-4xl">?</p>
        <h2 className="mt-4 text-lg font-black text-stone-900 dark:text-stone-100">Corporation not found</h2>
        <Link href="/" className="mt-4 inline-block text-sm font-bold text-red-600">&larr; Back to home</Link>
      </div>
    );
  }

  const ownedBrands = getBrandsByCorporation(corp.slug);
  const categoryGroups = ownedBrands.reduce(
    (acc, brand) => {
      if (!acc[brand.category]) acc[brand.category] = [];
      acc[brand.category].push(brand);
      return acc;
    },
    {} as Record<string, typeof ownedBrands>
  );

  const familyOwners = corp.owners.filter((o) => o.type === "family" || o.type === "individual");
  const institutionalOwners = corp.owners.filter((o) => o.type === "institutional");
  const executives = corp.owners.filter((o) => o.type === "executive");

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* Back */}
      <div className="py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-600 dark:text-stone-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Corporation Header */}
      <div className="flex items-start gap-4 pb-4">
        <RatingCircle rating={corp.ethicalRating} size="lg" />
        <div>
          <span className="text-3xl">{corp.logo}</span>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">
            {corp.name}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {corp.country} &middot; {corp.revenue}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <div className={`inline-block rounded border px-2 py-0.5 text-xs font-black ${getRatingColor(corp.ethicalRating)}`}>
              {corp.ethicalRating} — {getRatingLabel(corp.ethicalRating)}
            </div>
            {corp.stockTicker && (
              <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-mono font-bold text-stone-500 dark:bg-stone-800">
                {corp.stockTicker}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Rating + Description */}
      <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <RatingBar rating={corp.ethicalRating} />
        <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">{corp.description}</p>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-stone-50 p-3 text-center dark:bg-stone-800">
            <p className="text-lg font-black text-stone-900 dark:text-stone-100">{ownedBrands.length}</p>
            <p className="text-[10px] text-stone-500">Brands tracked</p>
          </div>
          <div className="rounded-lg bg-stone-50 p-3 text-center dark:bg-stone-800">
            <p className="text-lg font-black text-stone-900 dark:text-stone-100">{corp.employees}</p>
            <p className="text-[10px] text-stone-500">Employees</p>
          </div>
          <div className="rounded-lg bg-stone-50 p-3 text-center dark:bg-stone-800">
            <p className="text-lg font-black text-red-600">{corp.issues.length}</p>
            <p className="text-[10px] text-stone-500">Issues</p>
          </div>
        </div>
      </div>

      {/* ═══ WHO OWNS THIS ═══ */}
      <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50/50 p-4 dark:border-red-900 dark:bg-red-950/20">
        <p className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
          {corp.publiclyTraded ? "Who owns the shares" : "Who owns the company"}
        </p>

        {/* Family / Individual owners */}
        {familyOwners.length > 0 && (
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Individual / Family
            </p>
            <div className="mt-1 space-y-1">
              {familyOwners.map((owner, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-stone-900">
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{owner.name}</p>
                    <p className="text-[10px] text-stone-400">{owner.role}</p>
                  </div>
                  <div className="text-right">
                    {owner.ownershipPercent && (
                      <p className="text-sm font-black text-red-600 dark:text-red-400">
                        {owner.ownershipPercent}%
                      </p>
                    )}
                    {owner.estimatedValue && (
                      <p className="text-[10px] font-semibold text-stone-500">{owner.estimatedValue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Institutional */}
        {institutionalOwners.length > 0 && (
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Institutional Shareholders
            </p>
            <div className="mt-1 space-y-1">
              {institutionalOwners.map((owner, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-stone-900">
                  <div>
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{owner.name}</p>
                    <p className="text-[10px] text-stone-400">{owner.role}</p>
                  </div>
                  <div className="text-right">
                    {owner.ownershipPercent && (
                      <p className="text-xs font-black text-stone-700 dark:text-stone-300">
                        {owner.ownershipPercent}%
                      </p>
                    )}
                    {owner.estimatedValue && (
                      <p className="text-[10px] text-stone-400">{owner.estimatedValue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Executives */}
        {executives.length > 0 && (
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Key Executives
            </p>
            <div className="mt-1 space-y-1">
              {executives.map((exec, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-stone-900">
                  <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{exec.name}</p>
                  <p className="text-[10px] text-stone-400">{exec.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ownership bar chart */}
        {corp.owners.some((o) => o.ownershipPercent) && (
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Ownership breakdown
            </p>
            <div className="mt-2 flex h-6 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
              {corp.owners
                .filter((o) => o.ownershipPercent)
                .map((owner, i) => {
                  const colors = [
                    "bg-red-500", "bg-orange-500", "bg-amber-500",
                    "bg-yellow-500", "bg-stone-400",
                  ];
                  return (
                    <div
                      key={i}
                      className={`${colors[i % colors.length]} flex items-center justify-center text-[8px] font-bold text-white`}
                      style={{ width: `${owner.ownershipPercent}%` }}
                      title={`${owner.name}: ${owner.ownershipPercent}%`}
                    >
                      {(owner.ownershipPercent ?? 0) > 5 ? `${owner.ownershipPercent}%` : ""}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* ═══ ISSUES ═══ */}
      {corp.issues.length > 0 && (
        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Known Ethical Issues
          </p>
          <div className="mt-3 space-y-2">
            {corp.issues.map((issue, i) => (
              <div key={i} className="rounded-lg bg-stone-50 p-3 dark:bg-stone-800">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{issue.category}</span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{issue.description}</p>
                {issue.source && (
                  <p className="mt-0.5 text-[9px] italic text-stone-400 dark:text-stone-600">
                    Source: {issue.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ OWNED BRANDS ═══ */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Brands owned ({ownedBrands.length})
        </p>
        {Object.entries(categoryGroups).map(([category, categoryBrands]) => (
          <div key={category} className="mb-4">
            <p className="mb-1 text-[11px] font-semibold text-stone-400 dark:text-stone-500">{category}</p>
            <div className="space-y-2">
              {categoryBrands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
