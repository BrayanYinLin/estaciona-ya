import { InputPrice } from './InputPrice'

export function PriceRangeFilter() {
  return (
    <div className="flex gap-5">
      <InputPrice
        labelContent="Precio Min"
        name="minPrice"
        placeholder="0"
        footerText="Mínimo S/0"
      />
      <InputPrice
        labelContent="Precio Max"
        name="maxPrice"
        placeholder="1000"
      />
    </div>
  )
}
