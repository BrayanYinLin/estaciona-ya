import { DayPicker, type DateRange } from 'react-day-picker'

import { es } from 'react-day-picker/locale'
import { useState } from 'react'

export function DayFilterForm() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
  const [isoRange, setIsoRange] = useState<{
    from: string | null
    to: string | null
  }>({
    from: null,
    to: null
  })

  const handleSelect = (range: DateRange | undefined) => {
    setSelected(range)

    if (!range?.from && !range?.to) {
      setIsoRange({ from: null, to: null })
      return
    }

    console.log(isoRange)

    setIsoRange({
      from: range?.from ? range.from.toISOString() : null,
      to: range?.to ? range.to.toISOString() : null
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
