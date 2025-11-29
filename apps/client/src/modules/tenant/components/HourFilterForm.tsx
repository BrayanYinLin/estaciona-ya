import type { RangeDate } from '@tenant/types'
import { useState, type ChangeEvent, type Dispatch } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'

export type HourFilterFormProps = {
  setRangeDate: Dispatch<React.SetStateAction<RangeDate>>
}

export function HourFilterForm({ setRangeDate }: HourFilterFormProps) {
  const [selected, setSelected] = useState<Date>()
  const [startHour, setStartHour] = useState('')
  const [endHour, setEndHour] = useState('')

  function toCustomFormat(dateInput: string) {
    const d = new Date(dateInput)

    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()

    const hh = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`
  }

  const combineDateTime = (date: Date | undefined, time: string) => {
    if (!date || !time) return null
    const [h, m] = time.split(':').map(Number)

    const d = new Date(date)
    d.setHours(h ?? 0, m ?? 0, 0, 0)
    return toCustomFormat(d.toString())
  }

  const handleSelect = (date?: Date) => {
    setSelected(date)
    setRangeDate({
      startDate: combineDateTime(date, startHour),
      endDate: combineDateTime(date, endHour)
    })
  }

  const normalizeToHour = (time: string) => {
    if (!time) return ''
    const [h] = time.split(':')
    const hour = h?.padStart(2, '0') ?? '00'
    return `${hour}:00`
  }

  const isEndAfterStart = (start: string, end: string) => {
    if (!start || !end) return true
    return end > start
  }

  const handleStartHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeToHour(e.target.value)
    setStartHour(value)
    // Reinicia hora fin si es menor/igual que inicio
    const nextEnd = isEndAfterStart(value, endHour) ? endHour : ''
    setEndHour(nextEnd)
    setRangeDate({
      startDate: combineDateTime(selected, value),
      endDate: combineDateTime(selected, nextEnd)
    })
  }

  const handleEndHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeToHour(e.target.value)
    if (!isEndAfterStart(startHour, value)) return
    setEndHour(value)
    setRangeDate({
      startDate: combineDateTime(selected, startHour),
      endDate: combineDateTime(selected, value)
    })
  }

  return (
    <>
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
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        disabled={{ before: new Date() }}
      />
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hora de Inicio</legend>
        <input
          type="time"
          className="input"
          value={startHour}
          step={3600}
          onChange={handleStartHourChange}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hora de Fin</legend>
        <input
          type="time"
          className="input"
          value={endHour}
          step={3600}
          min={startHour || undefined}
          onChange={handleEndHourChange}
        />
      </fieldset>
    </>
  )
}
