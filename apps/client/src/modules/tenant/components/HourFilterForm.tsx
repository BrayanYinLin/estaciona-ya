import { useState, type ChangeEvent } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'

export function HourFilterForm() {
  const [selected, setSelected] = useState<Date>()
  const [startHour, setStartHour] = useState('')
  const [endHour, setEndHour] = useState('')
  const [selectedRange, setSelectedRange] = useState<{
    startDate: string | null
    endDate: string | null
  }>({
    startDate: null,
    endDate: null
  })

  const combineDateTime = (date: Date | undefined, time: string) => {
    if (!date || !time) return null
    const [h, m] = time.split(':').map(Number)
    const d = new Date(date)
    d.setHours(h ?? 0, m ?? 0, 0, 0)
    return d.toISOString()
  }

  const handleSelect = (date?: Date) => {
    setSelected(date)
    setSelectedRange({
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
    setSelectedRange({
      startDate: combineDateTime(selected, value),
      endDate: combineDateTime(selected, nextEnd)
    })
  }

  const handleEndHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = normalizeToHour(e.target.value)
    if (!isEndAfterStart(startHour, value)) return
    setEndHour(value)
    setSelectedRange({
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

      <pre className="text-xs opacity-70">
        {JSON.stringify(selectedRange, null, 2)}
      </pre>
    </>
  )
}
