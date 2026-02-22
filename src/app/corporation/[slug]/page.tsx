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
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-4xl">😕</p>
        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          Corporation not found
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

  const ownedBrands = getBrandsByCorporation(corp.slug);
  const categoryGroups = ownedBrands.reduce(
    (acc, brand) => {
      if (!acc[brand.category]) acc[brand.category] = [];
      acc[brand.category].push(brand);
      return acc;
    },
    {} as Record<string, typeof ownedBrands>
  );

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

      {/* Corporation Header */}
      <div className="flex flex-col items-center pb-6 pt-2 text-center">
        <div className="mb-4 text-5xl">{corp.logo}</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {corp.name}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {corp.country} • {corp.revenue} Revenue
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-3">
          <RatingCircle rating={corp.ethicalRating} size="lg" />
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {getRatingLabel(corp.ethicalRating)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ethical Rating
            </p>
          </div>
        </div>
      </div>

      {/* Rating + Description */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <RatingBar rating={corp.ethicalRating} />
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {corp.description}
        </p>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {ownedBrands.length}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Brands Tracked
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {corp.employees}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Employees
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800">
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {corp.issues.length}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Issues
            </p>
          </div>
        </div>
      </div>

      {/* Issues */}
      {corp.issues.length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Known Ethical Issues
          </h3>
          <div className="flex flex-col gap-2">
            {corp.issues.map((issue, i) => (
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

      {/* Owned Brands by Category */}
      <div className="mb-6">
        <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Brands Owned ({ownedBrands.length})
        </h3>
        {Object.entries(categoryGroups).map(([category, categoryBrands]) => (
          <div key={category} className="mb-4">
            <p className="mb-2 px-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {category}
            </p>
            <div className="flex flex-col gap-2">
              {categoryBrands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ownership Network Visual */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Brand Network
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Center: Corporation */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-2xl dark:border-slate-700 dark:bg-slate-800">
            {corp.logo}
          </div>
          {/* Surrounding brands */}
          {ownedBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="group relative"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-transform hover:scale-110 ${getRatingColor(brand.ethicalRating)}`}
              >
                {brand.logo}
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
