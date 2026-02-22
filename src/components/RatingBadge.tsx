import { EthicalRating, getRatingBgSolid, getRatingLabel } from "@/data/brands";

export function RatingCircle({
  rating,
  size = "md",
}: {
  rating: EthicalRating;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-lg",
    lg: "h-20 w-20 text-3xl",
  };

  return (
    <div
      className={`rating-circle flex items-center justify-center rounded-full font-bold text-white ${getRatingBgSolid(rating)} ${sizeClasses[size]}`}
    >
      {rating}
    </div>
  );
}

export function RatingBar({ rating }: { rating: EthicalRating }) {
  const ratingValues: Record<EthicalRating, number> = {
    A: 100,
    B: 75,
    C: 50,
    D: 25,
    E: 10,
  };

  const barColors: Record<EthicalRating, string> = {
    A: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    B: "bg-gradient-to-r from-green-400 to-green-500",
    C: "bg-gradient-to-r from-amber-400 to-amber-500",
    D: "bg-gradient-to-r from-orange-400 to-orange-500",
    E: "bg-gradient-to-r from-red-400 to-red-500",
  };

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Ethical Score
        </span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {getRatingLabel(rating)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColors[rating]}`}
          style={{ width: `${ratingValues[rating]}%` }}
        />
      </div>
    </div>
  );
}
