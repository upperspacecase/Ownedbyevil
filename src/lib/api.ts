// ════════════════════════════════════════════════════
// External API clients: Open Food Facts + Wikidata
// ════════════════════════════════════════════════════

// ── Open Food Facts ──────────────────────────────────

export interface OpenFoodFactsProduct {
  code: string;
  product_name: string;
  brands: string;
  brand_owner: string;
  categories_tags: string[];
  image_url?: string;
}

export async function fetchProductByBarcode(
  barcode: string
): Promise<OpenFoodFactsProduct | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return {
      code: barcode,
      product_name: data.product.product_name || "",
      brands: data.product.brands || "",
      brand_owner: data.product.brand_owner || "",
      categories_tags: data.product.categories_tags || [],
      image_url: data.product.image_url,
    };
  } catch {
    return null;
  }
}

// ── Wikidata SPARQL ──────────────────────────────────

export interface WikidataEntity {
  id: string;
  label: string;
  description: string;
}

export interface WikidataOwner {
  name: string;
  wikidataId: string;
  ownershipPercent?: number;
}

export interface OwnershipTreeData {
  company: WikidataEntity;
  owners: WikidataOwner[];
  parentOrg?: WikidataEntity;
  subsidiaries: WikidataEntity[];
}

/** Search Wikidata for a company entity by name */
export async function searchWikidataEntity(
  name: string
): Promise<WikidataEntity | null> {
  try {
    const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&type=item&limit=5&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.search?.length) return null;
    const match = data.search[0];
    return {
      id: match.id,
      label: match.label || name,
      description: match.description || "",
    };
  } catch {
    return null;
  }
}

/** Fetch ownership, parent org, and subsidiaries from Wikidata SPARQL */
export async function fetchWikidataOwnership(
  entityId: string
): Promise<OwnershipTreeData | null> {
  // Sanitize entityId to prevent SPARQL injection — must be Qnnn format
  if (!/^Q\d+$/.test(entityId)) return null;

  const sparql = `
SELECT ?companyLabel ?relType ?related ?relatedLabel ?proportion WHERE {
  VALUES ?company { wd:${entityId} }
  {
    ?company p:P127 ?ownerStmt .
    ?ownerStmt ps:P127 ?related .
    OPTIONAL { ?ownerStmt pq:P1107 ?proportion . }
    BIND("owned_by" AS ?relType)
  }
  UNION {
    ?company wdt:P749 ?related .
    BIND("parent_org" AS ?relType)
  }
  UNION {
    ?company wdt:P355 ?related .
    BIND("subsidiary" AS ?relType)
  }
  UNION {
    ?related wdt:P749 ?company .
    BIND("subsidiary" AS ?relType)
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}
LIMIT 150`;

  try {
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparql)}`;
    const res = await fetch(url, {
      headers: { Accept: "application/sparql-results+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();

    const owners: WikidataOwner[] = [];
    let parentOrg: WikidataEntity | undefined;
    const subsidiaryMap = new Map<string, WikidataEntity>();

    for (const b of data.results.bindings) {
      const relType = b.relType.value;
      const relatedId = b.related.value.split("/").pop() || "";
      const relatedLabel = b.relatedLabel?.value || relatedId;
      const proportion = b.proportion?.value
        ? parseFloat(b.proportion.value)
        : undefined;

      if (relType === "owned_by") {
        // P1107 stores proportions as 0-1 decimals; convert to percentage
        let pct = proportion;
        if (pct !== undefined && pct > 0 && pct <= 1) {
          pct = pct * 100;
        }
        // Deduplicate owners
        if (!owners.some((o) => o.wikidataId === relatedId)) {
          owners.push({
            name: relatedLabel,
            wikidataId: relatedId,
            ownershipPercent: pct
              ? Math.round(pct * 10) / 10
              : undefined,
          });
        }
      } else if (relType === "parent_org" && !parentOrg) {
        parentOrg = { id: relatedId, label: relatedLabel, description: "" };
      } else if (relType === "subsidiary") {
        if (!subsidiaryMap.has(relatedId)) {
          subsidiaryMap.set(relatedId, {
            id: relatedId,
            label: relatedLabel,
            description: "",
          });
        }
      }
    }

    // Sort owners by ownership percent descending
    owners.sort(
      (a, b) => (b.ownershipPercent || 0) - (a.ownershipPercent || 0)
    );

    const companyLabel =
      data.results.bindings[0]?.companyLabel?.value || entityId;

    return {
      company: { id: entityId, label: companyLabel, description: "" },
      owners,
      parentOrg,
      subsidiaries: Array.from(subsidiaryMap.values()),
    };
  } catch {
    return null;
  }
}

/** Convenience: search by name, then fetch ownership */
export async function fetchOwnershipByName(
  companyName: string
): Promise<OwnershipTreeData | null> {
  const entity = await searchWikidataEntity(companyName);
  if (!entity) return null;
  return fetchWikidataOwnership(entity.id);
}

// ── Simple in-memory cache ───────────────────────────

const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache(key: string, data: unknown): void {
  cache.set(key, { data, ts: Date.now() });
}
