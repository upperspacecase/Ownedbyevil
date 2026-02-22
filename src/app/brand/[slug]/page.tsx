"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getBrand,
  getCorporation,
  getBrandsByCorporation,
  getAlternativesForBrand,
  getRatingColor,
  getRatingLabel,
  getSeverityColor,
} from "@/data/brands";
import { RatingCircle, RatingBar } from "@/components/RatingBadge";
import BrandCard from "@/components/BrandCard";
import AlternativeCard from "@/components/AlternativeCard";
import OwnershipTree from "@/components/OwnershipTree";

export default function BrandPage() {
  const params = useParams();
  const slug = params.slug as string;
  const brand = getBrand(slug);

  if (!brand) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-4xl">?</p>
        <h2 className="mt-4 text-lg font-black text-stone-900">Brand not found</h2>
        <Link href="/" className="mt-4 inline-block text-sm font-bold text-red-600">
          &larr; Back to home
        </Link>
      </div>
    );
  }

  const parent = brand.parentSlug ? getCorporation(brand.parentSlug) : null;
  const siblingBrands = parent
    ? getBrandsByCorporation(parent.slug).filter((b) => b.slug !== brand.slug).slice(0, 5)
    : [];
  const alternatives = getAlternativesForBrand(brand.slug);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* Back */}
      <div className="py-4">
        <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-red-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Brand Header */}
      <div className="flex items-start gap-4 pb-6">
        <RatingCircle rating={brand.ethicalRating} size="lg" />
        <div>
          <h2 className="text-2xl font-black tracking-tight text-stone-900">
            {brand.name}
          </h2>
          <p className="text-sm text-stone-500">{brand.category}</p>
          <div className={`mt-2 inline-block rounded border px-2 py-0.5 text-xs font-black ${getRatingColor(brand.ethicalRating)}`}>
            {brand.ethicalRating} — {getRatingLabel(brand.ethicalRating)}
          </div>
        </div>
      </div>

      {/* Rating bar */}
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <RatingBar rating={brand.ethicalRating} />
        <p className="mt-3 text-xs text-stone-500">{brand.description}</p>
      </div>

      {/* ═══ OWNERSHIP TREE ═══ */}
      {parent && (
        <div className="mt-4">
          <OwnershipTree
            productName={brand.name}
            brandName={brand.name}
            corporation={parent}
          />
          <Link
            href={`/corporation/${parent.slug}`}
            className="mt-2 block text-center text-xs font-bold text-red-600 hover:underline"
          >
            See full corporation details &rarr;
          </Link>
        </div>
      )}

      {/* Corporate Issues */}
      {parent && parent.issues.length > 0 && (
        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wider text-stone-400">
            Known issues — {parent.name}
          </p>
          <div className="mt-3 space-y-2">
            {parent.issues.map((issue, i) => (
              <div key={i} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${getSeverityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                  <span className="text-xs font-bold text-stone-700">{issue.category}</span>
                </div>
                <p className="mt-1 text-[11px] text-stone-500">{issue.description}</p>
                {issue.source && (
                  <p className="mt-0.5 text-[9px] italic text-stone-400">
                    Source: {issue.source}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ THE SWITCH ═══ */}
      {alternatives.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-emerald-600">
            Make the switch
          </p>
          <div className="space-y-2">
            {alternatives.map((alt) => (
              <AlternativeCard key={alt.slug} alt={alt} />
            ))}
          </div>
        </div>
      )}

      {/* Available at */}
      {brand.supermarkets.length > 0 && (
        <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-black uppercase tracking-wider text-stone-400">
            Available at
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {brand.supermarkets.map((store) => (
              <span key={store} className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600">
                {store}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sibling brands */}
      {siblingBrands.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-black uppercase tracking-wider text-stone-400">
            Also owned by {parent?.name}
          </p>
          <div className="space-y-2">
            {siblingBrands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
