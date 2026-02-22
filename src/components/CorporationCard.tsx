import Link from "next/link";
import { Corporation, getBrandsByCorporation, getRatingColor } from "@/data/brands";
import { RatingCircle } from "./RatingBadge";

export default function CorporationCard({ corp }: { corp: Corporation }) {
  const brandCount = getBrandsByCorporation(corp.slug).length;
  const topOwner = corp.owners.find((o) => o.ownershipPercent);

  return (
    <Link
      href={`/corporation/${corp.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 transition-all hover:border-red-300 hover:shadow-sm active:scale-[0.98]"
    >
      <RatingCircle rating={corp.ethicalRating} size="sm" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-stone-900">
          {corp.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-500">
          <span>{brandCount} brand{brandCount !== 1 ? "s" : ""}</span>
          {topOwner && (
            <>
              <span className="text-stone-300">/</span>
              <span className="truncate">{topOwner.name.split(" /")[0].split(" (")[0]}</span>
            </>
          )}
        </div>
      </div>
      <div className={`rounded border px-1.5 py-0.5 text-[10px] font-black ${getRatingColor(corp.ethicalRating)}`}>
        {corp.ethicalRating}
      </div>
      <svg className="h-4 w-4 flex-shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
