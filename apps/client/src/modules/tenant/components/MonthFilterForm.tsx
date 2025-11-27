import { MonthRangePicker } from '@shared/components/MonthRangePicker'
import type { RangeDate } from '@tenant/types'
import { useMemo, useState, type Dispatch } from 'react'

export type MonthFilterFormProps = {
  rangeDate: RangeDate
  setRangeDate: Dispatch<React.SetStateAction<RangeDate>>
}

export function MonthFilterForm({ setRangeDate }: MonthFilterFormProps) {
  const toCustomFormat = (dateInput: string) => {
    const d = new Date(dateInput)

    // const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()

    // const hh = String(d.getHours()).padStart(2, '0')
    // const min = String(d.getMinutes()).padStart(2, '0')

    return `${yyyy}-${mm}-01 00:00`
  }

  const minDate = useMemo(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 1, 1)
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [range, setRange] = useState({
    start: null as Date | null,
    end: null as Date | null
  })

  return (
    <>
      <MonthRangePicker
        label="Selecciona un rango de meses"
        value={range}
        onChange={(nextRange) => {
          setRange(nextRange)
          const normalizedRange: RangeDate = {
            startDate: nextRange.start
              ? toCustomFormat(nextRange.start.toString())
              : null,
            endDate: nextRange.end
              ? toCustomFormat(nextRange.end.toString())
              : null
          }
          setRangeDate(normalizedRange)
        }}
        minDate={minDate}
      />
    </>
  )
}
