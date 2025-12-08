import { api } from '@shared/api/api'
import { create } from 'zustand'

export interface Request {
  id: number
  user: {
    id: number
    name: string
    photo?: string | null
  }
  garage: {
    id: number
    price: number
    description: string
    photos: {
      id: number
      url: string
    }[]
    covered: boolean
    hasCameras: boolean
    restrictions: string
    state: boolean
  }
  cost: number
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface RequestStore {
  requests: Request[]
  error: string | null
  loading: boolean
  getRequests: () => Promise<void>
}

export const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  error: null,
  loading: false,
  async getRequests() {
    const { data } = await api.get<Request[]>('/booking-requests/owner')
    set({ requests: data })
  }
}))
