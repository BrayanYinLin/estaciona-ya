import { api } from '@shared/api/api'
import { useEffect, useState } from 'react'

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

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([])

  const getRequests = async () => {
    const { data } = await api.get<Request[]>('/booking-requests/owner')

    setRequests(data)
  }

  useEffect(() => {
    getRequests()
  }, [])

  return { requests, getRequests }
}
