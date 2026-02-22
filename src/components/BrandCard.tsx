import Link from "next/link";
import { Brand, getCorporation, getRatingColor } from "@/data/brands";
import { RatingCircle } from "./RatingBadge";

export default function BrandCard({ brand }: { brand: Brand }) {
  const parent = brand.parentSlug ? getCorporation(brand.parentSlug) : null;

  return (
    <Link
      href={`/brand/${brand.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 transition-all hover:border-red-300 hover:shadow-sm active:scale-[0.98] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-red-800"
    >
      <RatingCircle rating={brand.ethicalRating} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base">{brand.logo}</span>
          <h3 className="truncate text-sm font-bold text-stone-900 dark:text-stone-100">
            {brand.name}
          </h3>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-500">
          <span>{brand.category}</span>
          {parent && (
            <>
              <span className="text-stone-300 dark:text-stone-700">/</span>
              <span className="font-medium text-red-600 dark:text-red-400">
                {parent.name}
              </span>
            </>
          )}
        </div>
      </div>
      <div className={`rounded border px-1.5 py-0.5 text-[10px] font-black ${getRatingColor(brand.ethicalRating)}`}>
        {brand.ethicalRating}
      </div>
      <svg className="h-4 w-4 flex-shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 dark:text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
