type RentalSummaryProps = {
  label: string
  quantity: number
  totalCost: number
}

export function RentalSummary({
  label,
  quantity,
  totalCost
}: RentalSummaryProps) {
  return (
    <div className="flex flex-col gap-2 border-base-300">
      <div className="flex justify-between text-base-content/70">
        <span>{label}</span>
        <span className="font-bold text-base-content">{quantity}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-primary">
        <span>Total estimado:</span>
        <span>S/{totalCost.toFixed(2)}</span>
      </div>
    </div>
  )
}
