import Link from "next/link";
import { Brand, getCorporation, getRatingColor } from "@/data/brands";
import { RatingCircle } from "./RatingBadge";

export default function BrandCard({ brand }: { brand: Brand }) {
  const parent = brand.parentSlug ? getCorporation(brand.parentSlug) : null;

  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:border-slate-200 hover:shadow-md active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <RatingCircle rating={brand.ethicalRating} size="sm" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{brand.logo}</span>
          <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {brand.name}
          </h3>
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {brand.category}
          </span>
          {parent && (
            <>
              <span className="text-xs text-slate-300 dark:text-slate-600">
                •
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                by {parent.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div
        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getRatingColor(brand.ethicalRating)}`}
      >
        {brand.ethicalRating}
      </div>

      <svg
        className="h-4 w-4 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 dark:text-slate-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
