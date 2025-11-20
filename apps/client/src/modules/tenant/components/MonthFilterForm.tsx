import { MonthRangePicker } from '@shared/components/MonthRangePicker'
import { useState } from 'react'

export function MonthFilterForm() {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const handleRangeChange = (nextRange: {
    start: Date | null
    end: Date | null
  }) => {
    setRange(nextRange)
    console.log('Rango:', {
      from: nextRange.start?.toLocaleDateString('es-ES'),
      to: nextRange.end?.toLocaleDateString('es-ES')
    })
  }

  const [range, setRange] = useState({
    start: null as Date | null,
    end: null as Date | null
  })
  const actualMonth = new Date().getMonth()
  const availableMonths = months.slice(actualMonth)
  return (
    <>
      {/* <fieldset className="fieldset">
        <legend className="fieldset-legend">Desde</legend>
        <select
          defaultValue="Pick a browser"
          className="select"
          name="startMonth"
        >
          <option disabled={true}>Selecciona un mes</option>
          {availableMonths.map((month, index) => (
            <option value={month} key={index}>
              {month}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hasta</legend>
        <select
          defaultValue="Pick a browser"
          className="select"
          name="endMonth"
        >
          <option disabled={true}>Selecciona un mes</option>
          {availableMonths.map((month, index) => (
            <option value={month} key={index}>
              {month}
            </option>
          ))}
        </select>
      </fieldset> */}

      <MonthRangePicker
        label="Selecciona un rango de meses"
        value={range}
        onChange={handleRangeChange}
        minDate={new Date()} // bloquea meses anteriores al actual
      />
    </>
  )
}
