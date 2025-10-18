import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { useEffect, useState } from 'react'

export type RentMode = {
  id: number
  mode_name: string
}

export function useRentMode() {
  const [rentModes, setRentModes] = useState<RentMode[]>([])

  const findAllRentModes = async () => {
    const { data } = await api.get<RentMode[]>(ENDPOINTS.RENT_MODE)

    return data
  }

  useEffect(() => {
    findAllRentModes().then(setRentModes)
  }, [])
  return { rentModes }
}
