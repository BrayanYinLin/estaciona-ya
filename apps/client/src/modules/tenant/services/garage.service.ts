import { api } from '@shared/api/api'

export type Garage = {
  id: number
  rentMode: {
    id: number
    mode_name: string
  }
  location: {
    id: number
    address: string
    latitude: string
    longitude: string
    district: {
      id: number
      name: string
    }
  }
  price: number
  description: string
  covered: boolean
  hasCameras: boolean
  restrictions: string
  state: boolean
  createdAt: Date
  updatedAt: Date
  photos: { url: string }[]
}

export type GarageFilters = {
  covered?: boolean
  hasCameras?: boolean
  mode?: string
  district?: string
}

const getGarages = async (
  page = 1,
  size = 40,
  filters?: GarageFilters
): Promise<Garage[]> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString()
  })

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return
      }

      if (typeof value === 'string' && value.trim() === '') {
        return
      }

      searchParams.append(key, String(value))
    })
  }

  const { data } = await api.get<Garage[]>(`garage?${searchParams.toString()}`)
  return data ?? []
}

export const GarageService = { getGarages }
