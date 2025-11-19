import { DayPicker, type DateRange } from 'react-day-picker'

import { es } from 'react-day-picker/locale'
import { useState } from 'react'

export function DayFilterForm() {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined)
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
        onSelect={setSelected}
        footer={
          selected
            ? `\nSelected: ${selected.from} TO ${selected.to}`
            : 'Pick a day.'
        }
        disabled={{ before: new Date() }}
      />
    </div>
  )
}
