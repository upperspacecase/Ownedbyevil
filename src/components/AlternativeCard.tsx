import { EthicalAlternative, getRatingColor } from "@/data/brands";
import { RatingCircle } from "./RatingBadge";

export default function AlternativeCard({ alt }: { alt: EthicalAlternative }) {
  return (
    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
      <div className="flex items-start gap-3">
        <RatingCircle rating={alt.ethicalRating} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-base">{alt.logo}</span>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              {alt.name}
            </h3>
            <div className={`rounded border px-1.5 py-0.5 text-[10px] font-black ${getRatingColor(alt.ethicalRating)}`}>
              {alt.ethicalRating}
            </div>
          </div>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
            {alt.whyBetter}
          </p>
          {alt.certifications.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {alt.certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                >
                  {cert}
                </span>
              ))}
            </div>
          )}
          {alt.supermarkets.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {alt.supermarkets.map((store) => (
                <span
                  key={store}
                  className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                >
                  {store}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
