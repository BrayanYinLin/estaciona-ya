import { DayPicker, type DateRange } from 'react-day-picker'

import { es } from 'react-day-picker/locale'
import { useState, type Dispatch } from 'react'
import type { RangeDate } from '@tenant/pages/GarageDetail'

export type DayFilterFormProps = {
  rangeDate: RangeDate
  setRangeDate: Dispatch<React.SetStateAction<RangeDate>>
}

export function DayFilterForm({ setRangeDate }: DayFilterFormProps) {
  const [selected, setSelected] = useState<DateRange | undefined>()
  const [isoRange, setIsoRange] = useState<{
    from: string | null
    to: string | null
  }>({
    from: null,
    to: null
  })

  const toCustomFormat = (dateInput: string) => {
    const d = new Date(dateInput)

    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()

    // const hh = String(d.getHours()).padStart(2, '0')
    // const min = String(d.getMinutes()).padStart(2, '0')

    return `${yyyy}-${mm}-${dd} 00:00`
  }

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range)
    setRangeDate({
      startDate: toCustomFormat(range!.from!.toString()),
      endDate: toCustomFormat(range!.to!.toString())
    })

    if (!range?.from && !range?.to) {
      setIsoRange({ from: null, to: null })
      return
    }

    setIsoRange({
      from: range?.from ? toCustomFormat(range.from.toString()) : null,
      to: range?.to ? toCustomFormat(range.to.toString()) : null
    })
  }

  return (
    <div className="flex w-full justify-center overflow-x-auto">
      <DayPicker
        locale={es}
        className="react-day-picker no-scrollbar"
        style={
          {
            // Ajusta estos valores para cambiar el tamaño general sin deformar
            '--rdp-cell-size': '35px',
            '--rdp-caption-font-size': '1.2rem'
          } as React.CSSProperties
        }
        animate
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        footer={
          isoRange.from || isoRange.to
            ? `Seleccionado: ${isoRange.from ?? '—'}${isoRange.to ? ` a ${isoRange.to}` : ''}`
            : 'Pick a day.'
        }
        disabled={{ before: new Date() }}
      />
    </div>
  )
}
