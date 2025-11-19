import { useEffect, useState } from 'react'
import {
  GarageService,
  type Garage,
  type GarageFilters
} from '../services/garage.service'

export function useGarages(
  page = 1,
  size = 40,
  min: number,
  max: number,
  filters?: GarageFilters
) {
  const [garages, setGarages] = useState<Garage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchGarages() {
      try {
        setLoading(true)
        if (min !== undefined && filters) {
          Object.assign(filters, { minPrice: min })
        }
        if (max !== undefined && filters) {
          Object.assign(filters, { maxPrice: max })
        }
        const data = await GarageService.getGarages(page, size, filters)
        if (isMounted) {
          setGarages(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchGarages()

    return () => {
      isMounted = false
    }
  }, [page, size, filters, min, max])

  return { garages, loading, error }
}
