import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { BookingRequestService } from '@tenant/services/request.service'
import { useBookingRequestsStore } from '@tenant/contexts/booking_requests.store'
import type { RangeDate } from '@tenant/types'
import type { GarageDetail } from '@/types'

export function useGarageReservation(
  garage: GarageDetail | null,
  garageId: number
) {
  const navigate = useNavigate()
  const { getAllRequests } = useBookingRequestsStore()

  const [rangeDate, setRangeDate] = useState<RangeDate>({
    startDate: null,
    endDate: null
  })

  const rentMode = useMemo(() => {
    return garage?.rentMode.mode_name.toLowerCase() || 'dia'
  }, [garage])

  const { days: selectedDays, total: totalCost } = useMemo(() => {
    if (!rangeDate.startDate || !rangeDate.endDate) return { days: 0, total: 0 }

    const start = new Date(rangeDate.startDate)
    const end = new Date(rangeDate.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const days = diffDays + 1
    const total = days * (garage?.price ?? 0)

    return { days, total }
  }, [rangeDate, garage])

  const handleRequest = async () => {
    if (!rangeDate.startDate || !rangeDate.endDate) return

    await BookingRequestService.createBookingRequest({
      range: rangeDate,
      garageId: garageId
    })

    await getAllRequests()

    navigate('/tenant/requests')
  }

  return {
    rangeDate,
    setRangeDate,
    rentMode,
    selectedDays,
    totalCost,
    handleRequest
  }
}
