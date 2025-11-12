import { DayPicker, type DateRange } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import { FilterCheckboxes } from './FilterCheckboxes'
import { useState } from 'react'
import { PriceRangeFilter } from '@shared/components/PriceRangeFilter'

export function DayFilterForm() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
  return (
    <>
      <DayPicker
        locale={es}
        animate
        mode="range"
        selected={selected}
        onSelect={setSelected}
        footer={
          selected
            ? `\nSelected: ${selected.from} TO ${selected.to}`
            : 'Pick a day.'
        }
        disabled={{ before: new Date() }}
      />
      <PriceRangeFilter />
      <FilterCheckboxes />
    </>
  )
}
