import { BookingRequestService } from '@tenant/services/request.service'
import type { User } from '@tenant/types'
import { create } from 'zustand'

export type BookingRequest = {
  id: number
  user: User
  garage: {
    photos: { url: string }[]
    location: {
      address: string
    }
  }
  startDate: string
  endDate: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
}

interface BookingRequestsStore {
  requests: BookingRequest[]
  getAllRequests: () => Promise<void>
}

export const useBookingRequestsStore = create<BookingRequestsStore>()(
  (set) => ({
    requests: [],
    getAllRequests: async () => {
      const data = await BookingRequestService.getBookingRequestsByUser()

      set({ requests: data })
    }
  })
)
