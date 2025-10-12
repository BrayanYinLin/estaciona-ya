import type { FormEvent } from 'react'
import { PasswordSection } from './PasswordSection'
import { AlertSuccess } from '@shared/components/AlertSuccess'
import { AlertError } from '@shared/components/AlertError'
import { useChangePassword } from '@user/hooks/useChangePasword'

export function ChangePasswordForm() {
  const { error, success, loading, changePassword } = useChangePassword()

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const oldPassword = data.get('oldPassword') as string
    const newPassword = data.get('newPassword') as string

    await changePassword({
      oldPassword,
      newPassword
    })
  }

  return (
    <>
      <h2 className="mt-5 text-2xl font-semibold">Cambiar contraseña</h2>
      <form
        className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-4 flex flex-col w-full"
        onSubmit={handlePasswordChange}
      >
        <div className="flex flex-col gap-5 mt-5 lg:mt-0 col-span-1">
          <PasswordSection />
          {success && !loading && (
            <AlertSuccess message="Se restableció la contraseña correctamente." />
          )}
          {error && <AlertError message={error} />}
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </>
  )
}
