import { api } from '@shared/api/api'
import type { RangeDate } from '@tenant/pages/GarageDetail'

export type CreateBookingRequest = {
  range: RangeDate
  garageId: number
}

const createBookingRequest = async ({
  range,
  garageId
}: CreateBookingRequest) => {
  try {
    const { data } = await api.post('/booking-requests', {
      ...range,
      garageId
    })

    return data
  } catch (e) {
    console.error((e as Error).message)
  }
}

const getBookingRequestsByUser = async () => {
  try {
    const { data } = await api.get('/booking-requests/by-user')

    return data
  } catch (e) {
    console.error((e as Error).message)
  }
}

export const BookingRequestService = {
  createBookingRequest,
  getBookingRequestsByUser
}
