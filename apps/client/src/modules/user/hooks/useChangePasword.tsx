import type { ChangePasswordDto } from '@user/schemas/change_password.schema'
import { UserService } from '@user/services/user.service'
import { useState } from 'react'

export function useChangePassword() {
  const [success, setSuccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const changePassword = async ({
    oldPassword,
    newPassword
  }: ChangePasswordDto) => {
    setLoading(true)

    try {
      const res = await UserService.changePassword({
        oldPassword,
        newPassword
      })

      setLoading(false)
      setSuccess(res)
    } catch (e: unknown) {
      setError((e as Error).message)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    success,
    changePassword
  }
}
