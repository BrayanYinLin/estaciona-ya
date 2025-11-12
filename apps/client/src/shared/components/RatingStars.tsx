type RatingStarsProps = {
  rating: number
  className?: string
}

export function RatingStars({ rating, className = '' }: RatingStarsProps) {
  const clampedRating = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`mask mask-star-2 ${i < clampedRating ? 'bg-yellow-400' : 'bg-gray-300'} inline-block w-3 h-3 ${className}`}
        />
      ))}
    </div>
  )
}
