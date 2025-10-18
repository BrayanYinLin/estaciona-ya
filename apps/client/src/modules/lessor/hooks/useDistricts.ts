import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { useEffect, useState } from 'react'

export type District = {
  id: number
  name: string
}

export function useDistricts() {
  const [districts, setDistricts] = useState<District[]>([])

  const findAllDistricts = async () => {
    const { data } = await api.get<District[]>(ENDPOINTS.DISTRICTS)

    return data
  }

  useEffect(() => {
    findAllDistricts().then(setDistricts)
  }, [])
  return { districts }
}
