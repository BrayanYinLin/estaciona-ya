// MonthRangePicker.tsx
import { useState, useEffect, useMemo, useCallback } from 'react'

type MonthRange = {
  start: Date | null
  end: Date | null
}

type MonthRangePickerProps = {
  value: MonthRange
  onChange: (range: MonthRange) => void
  minDate?: Date // bloquea meses anteriores
  maxDate?: Date
  label?: string
  className?: string
  placeholder?: string
}

const MONTH_LABELS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

type Month = { year: number; month: number }

const toMonth = (d: Date): Month => ({
  year: d.getFullYear(),
  month: d.getMonth()
})

const monthToDate = (m: Month): Date => new Date(m.year, m.month, 1, 0, 0, 0, 0)

const startOfMonth = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)

const compareMonth = (a: Month, b: Month): number => {
  if (a.year !== b.year) return a.year - b.year
  return a.month - b.month
}

const isBeforeMonth = (a: Month, b: Month) => compareMonth(a, b) < 0
const isAfterMonth = (a: Month, b: Month) => compareMonth(a, b) > 0
const isSameMonth = (a: Month, b: Month) => compareMonth(a, b) === 0
const inRange = (m: Month, start: Month, end: Month) =>
  compareMonth(m, start) >= 0 && compareMonth(m, end) <= 0

export const MonthRangePicker: React.FC<MonthRangePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  label,
  className = '',
  placeholder = 'Selecciona un rango de meses'
}) => {
  const today = useMemo(() => new Date(), [])
  const effectiveMin = useMemo(
    () => toMonth(startOfMonth(minDate ?? today)),
    [minDate, today]
  )
  const effectiveMax = useMemo(
    () =>
      maxDate
        ? toMonth(startOfMonth(maxDate))
        : ({ year: 9999, month: 11 } as Month),
    [maxDate]
  )

  const [open, setOpen] = useState(false)

  const [draftStart, setDraftStart] = useState<Month | null>(
    value.start ? toMonth(startOfMonth(value.start)) : null
  )
  const [draftEnd, setDraftEnd] = useState<Month | null>(
    value.end ? toMonth(startOfMonth(value.end)) : null
  )

  const [fromYear, setFromYear] = useState(
    value.start?.getFullYear() ?? today.getFullYear()
  )
  const [toYear, setToYear] = useState(
    value.end?.getFullYear() ?? today.getFullYear()
  )

  useEffect(() => {
    if (open) {
      setDraftStart(value.start ? toMonth(startOfMonth(value.start)) : null)
      setDraftEnd(value.end ? toMonth(startOfMonth(value.end)) : null)
      setFromYear(value.start?.getFullYear() ?? today.getFullYear())
      setToYear(value.end?.getFullYear() ?? today.getFullYear())
    }
  }, [open, value.start, value.end, today])

  const handleSelectFrom = useCallback(
    (year: number, monthIndex: number) => {
      const m: Month = { year, month: monthIndex }
      if (
        isBeforeMonth(m, effectiveMin) ||
        isAfterMonth(m, effectiveMax) ||
        (draftEnd && isAfterMonth(m, draftEnd))
      ) {
        return
      }
      setDraftStart(m)
      if (!draftEnd || isBeforeMonth(draftEnd, m)) {
        setDraftEnd(m)
        setToYear(year)
      }
    },
    [draftEnd, effectiveMin, effectiveMax]
  )

  const handleSelectTo = useCallback(
    (year: number, monthIndex: number) => {
      const m: Month = { year, month: monthIndex }
      if (
        isBeforeMonth(m, effectiveMin) ||
        isAfterMonth(m, effectiveMax) ||
        (draftStart && isBeforeMonth(m, draftStart))
      ) {
        return
      }
      setDraftEnd(m)
      if (!draftStart) {
        setDraftStart(m)
        setFromYear(year)
      }
    },
    [draftStart, effectiveMin, effectiveMax]
  )

  const apply = () => {
    if (!draftStart || !draftEnd) {
      onChange({ start: null, end: null })
    } else {
      onChange({
        start: monthToDate(draftStart),
        end: monthToDate(draftEnd)
      })
    }
    setOpen(false)
  }

  const cancel = () => setOpen(false)

  const formattedValue = useMemo(() => {
    if (!value.start || !value.end) return placeholder

    const fmt = (d: Date) =>
      d.toLocaleString('es-ES', { month: 'short', year: 'numeric' })

    return `${fmt(value.start)} ~ ${fmt(value.end)}`
  }, [value.start, value.end, placeholder])

  const renderMonthButton = (
    ctx: 'from' | 'to',
    year: number,
    monthIndex: number
  ) => {
    const monthObj: Month = { year, month: monthIndex }
    const disabled =
      isBeforeMonth(monthObj, effectiveMin) ||
      isAfterMonth(monthObj, effectiveMax)

    const isStart = draftStart && isSameMonth(monthObj, draftStart)
    const isEnd = draftEnd && isSameMonth(monthObj, draftEnd)
    const isBetween =
      draftStart &&
      draftEnd &&
      inRange(monthObj, draftStart, draftEnd) &&
      !isStart &&
      !isEnd

    const baseClasses = ['btn', 'btn-sm', 'w-full']
    if (disabled) {
      baseClasses.push('btn-disabled', 'opacity-50')
    } else if (isStart || isEnd) {
      baseClasses.push('btn-primary')
    } else if (isBetween) {
      baseClasses.push('bg-primary/10', 'btn-ghost')
    } else {
      baseClasses.push('btn')
    }

    return (
      <button
        key={`${ctx}-${monthIndex}`}
        type="button"
        disabled={disabled}
        onClick={
          ctx === 'from'
            ? () => handleSelectFrom(year, monthIndex)
            : () => handleSelectTo(year, monthIndex)
        }
        className={baseClasses.join(' ')}
      >
        {MONTH_LABELS[monthIndex].slice(0, 3)}
      </button>
    )
  }

  return (
    <fieldset className={`fieldset w-full ${className}`}>
      {label && <legend className="fieldset-legend">{label}</legend>}

      <div className={`dropdown w-full ${open ? 'dropdown-open' : ''}`}>
        <button
          type="button"
          className="input input-bordered flex w-full items-center justify-between gap-2 text-left"
          onClick={() => setOpen(!open)}
        >
          <span
            className={!value.start || !value.end ? 'text-base-content/60' : ''}
          >
            {formattedValue}
          </span>
          <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {open && (
          <div className="dropdown-content mt-2 w-full rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl z-50">
            <div className="flex flex-col gap-4 md:flex-row">
              {/* FROM */}
              <div className="flex-1 border-r border-base-300 pr-4">
                <div className="flex justify-between items-center mb-3">
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => setFromYear((y) => y - 1)}
                  >
                    «
                  </button>
                  <span className="font-semibold">From {fromYear}</span>
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => setFromYear((y) => y + 1)}
                  >
                    »
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MONTH_LABELS.map((_, i) =>
                    renderMonthButton('from', fromYear, i)
                  )}
                </div>
              </div>

              {/* TO */}
              <div className="flex-1 pl-4">
                <div className="flex justify-between items-center mb-3">
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => setToYear((y) => y - 1)}
                  >
                    «
                  </button>
                  <span className="font-semibold">To {toYear}</span>
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => setToYear((y) => y + 1)}
                  >
                    »
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {MONTH_LABELS.map((_, i) =>
                    renderMonthButton('to', toYear, i)
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost btn-sm" onClick={cancel}>
                Cancelar
              </button>
              <button className="btn btn-primary btn-sm" onClick={apply}>
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </fieldset>
  )
}
