export type User = {
  id: number
  name: string
  email: string
  photo: string | null
  role: string
}

export type BookingRequest = {
  id: number
  user: User
  garage: Garage
  startDate: string
  endDate: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
}

export type RangeDate = {
  startDate: string | null
  endDate: string | null
}
