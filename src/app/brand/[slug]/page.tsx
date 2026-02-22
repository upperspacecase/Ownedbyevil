"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getBrand,
  getCorporation,
  getBrandsByCorporation,
  getRatingColor,
  getRatingLabel,
  getSeverityColor,
  brands,
} from "@/data/brands";
import { RatingCircle, RatingBar } from "@/components/RatingBadge";
import BrandCard from "@/components/BrandCard";

export default function BrandPage() {
  const params = useParams();
  const slug = params.slug as string;
  const brand = getBrand(slug);

  if (!brand) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-4xl">😕</p>
        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          Brand not found
        </h2>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400"
        >
          ← Back to search
        </Link>
      </div>
    );
  }

  const parent = brand.parentSlug ? getCorporation(brand.parentSlug) : null;
  const siblingBrands = parent
    ? getBrandsByCorporation(parent.slug)
        .filter((b) => b.slug !== brand.slug)
        .slice(0, 5)
    : [];
  const alternatives = brand.alternatives
    .map((slug) => brands.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-lg px-4 pb-24">
      {/* Back button */}
      <div className="py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Brand Header */}
      <div className="flex flex-col items-center pb-6 pt-2 text-center">
        <div className="mb-4 text-5xl">{brand.logo}</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {brand.name}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {brand.category}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-3">
          <RatingCircle rating={brand.ethicalRating} size="lg" />
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {getRatingLabel(brand.ethicalRating)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ethical Rating
            </p>
          </div>
        </div>
      </div>

      {/* Rating Bar */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <RatingBar rating={brand.ethicalRating} />
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {brand.description}
        </p>
      </div>

      {/* Ownership Chain */}
      {parent && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ownership Chain
          </h3>
          <div className="flex flex-col gap-3">
            {/* Corporation */}
            <Link
              href={`/corporation/${parent.slug}`}
              className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg dark:bg-slate-800">
                {parent.logo}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {parent.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Parent Corporation • {parent.country}
                </p>
              </div>
              <div
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getRatingColor(parent.ethicalRating)}`}
              >
                {parent.ethicalRating}
              </div>
            </Link>

            {/* Connector */}
            <div className="flex items-center justify-center">
              <div className="flex h-6 w-6 items-center justify-center">
                <svg className="h-4 w-4 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Brand */}
            <div className="flex items-center gap-3 rounded-xl border-2 border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg dark:bg-slate-800">
                {brand.logo}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {brand.name}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  This brand • {brand.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Issues */}
      {parent && parent.issues.length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Known Issues — {parent.name}
          </h3>
          <div className="flex flex-col gap-2">
            {parent.issues.map((issue, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-50 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getSeverityColor(issue.severity)}`}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {issue.category}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {issue.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Where to Find - UK Supermarkets */}
      {brand.supermarkets.length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Available at
          </h3>
          <div className="flex flex-wrap gap-2">
            {brand.supermarkets.map((store) => {
              const storeIcons: Record<string, string> = {
                Tesco: "🔵",
                "Sainsbury's": "🟠",
                ASDA: "🟢",
                Morrisons: "🟡",
                Waitrose: "🟤",
                Ocado: "🟣",
                Boots: "💙",
                "Co-op": "💚",
                Superdrug: "💜",
              };
              return (
                <span
                  key={store}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <span>{storeIcons[store] || "🏪"}</span>
                  {store}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Ethical Alternatives */}
      {alternatives.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Ethical Alternatives
          </h3>
          <div className="flex flex-col gap-2">
            {alternatives.map(
              (alt) => alt && <BrandCard key={alt.slug} brand={alt} />
            )}
          </div>
        </div>
      )}

      {/* Sibling Brands */}
      {siblingBrands.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Also owned by {parent?.name}
          </h3>
          <div className="flex flex-col gap-2">
            {siblingBrands.map((b) => (
              <BrandCard key={b.slug} brand={b} />
            ))}
          </div>
          {parent && getBrandsByCorporation(parent.slug).length > 6 && (
            <Link
              href={`/corporation/${parent.slug}`}
              className="mt-2 block text-center text-xs font-medium text-blue-600 dark:text-blue-400"
            >
              View all {getBrandsByCorporation(parent.slug).length} brands →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
