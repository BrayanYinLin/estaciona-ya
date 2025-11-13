import { DayFilter, HourFilter, MonthFilter } from '@garages/garage'

export type DateFilters = {
  day: Date
  startHour: number
  endHour: number
  startDay: Date
  endDay: Date
  startMonth: string
  endMonth: string
}

type SeparatedFilters = HourFilter | DayFilter | MonthFilter

export const separateFilters = ({
  day,
  startHour,
  endHour,
  startDay,
  endDay,
  startMonth,
  endMonth
}: DateFilters): SeparatedFilters => {
  if (day && startHour && endHour) {
    return {
      type: 'hour',
      day: String(day),
      startHour: Number(startHour),
      endHour: Number(endHour)
    }
  }

  if (startDay && endDay) {
    return {
      type: 'day',
      startDay: String(startDay),
      endDay: String(endDay)
    }
  }

  return {
    type: 'month',
    startMonth: String(startMonth),
    endMonth: String(endMonth)
  }
}
