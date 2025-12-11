import type { GarageDetail } from '@shared/types'
import { api } from '@shared/api/api'
import { useState } from 'react'

export function useGarageDetail(id: number) {
  const [garage, setGarage] = useState<GarageDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getGarageDetail = async () => {
    try {
      const res = await api.get<GarageDetail>(`/garage/${id}`)
      setGarage(res.data)
      console.log(res.data)
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return { garage, getGarageDetail, error }
}
