import { RatingStars } from '@shared/components/RatingStars'

export function GarageRatingDetail({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-14 w-14 items-center justify-center text-2xl font-bold text-yellow-500">
        {rating}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-base-content">
          Calificación general
        </span>
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} className="!h-4 !w-4" />
          <span className="text-xs text-base-content/60">(0 reseñas)</span>
        </div>
      </div>
    </div>
  )
}
