import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { useState } from 'react'

export function useValidateAccount() {
  const [finished, setFinished] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const validateAccount = async (code: string) => {
    try {
      setLoading(true)
      await api.post(ENDPOINTS.VERIFY, {
        code: code.trim()
      })
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(true)
      setFinished(true)
    }
  }

  return { finished, loading, error, validateAccount }
}
