import { api } from '@shared/api/api'

export type LocationResponse = {
  latitude: string
  longitude: string
  address: string
}

const getLocationByAddress = async (address: string, district: string) => {
  const url = `/location?address=${address}, ${district}`
  const { data } = await api.get<LocationResponse>(url)
  return data
}

export const LocationService = { getLocationByAddress }
