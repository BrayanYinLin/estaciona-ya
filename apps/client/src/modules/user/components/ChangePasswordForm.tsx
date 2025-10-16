import { useEffect, useState, type FormEvent } from 'react'
import { PasswordSection } from './PasswordSection'
import { AlertSuccess } from '@shared/components/AlertSuccess'
import { AlertError } from '@shared/components/AlertError'
import { useChangePassword } from '@user/hooks/useChangePasword'

export function ChangePasswordForm() {
  const { error, success, loading, changePassword } = useChangePassword()
  const [showAlert, setShowAlert] = useState(true)

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const oldPassword = data.get('oldPassword') as string
    const newPassword = data.get('newPassword') as string

    await changePassword({ oldPassword, newPassword })
    setShowAlert(true)
  }

  useEffect(() => {
    if ((success || error) && showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error, showAlert])

  return (
    <>
      <h2 className="mt-5 text-2xl font-semibold">Cambiar contraseña</h2>
      <form
        className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-4 flex flex-col w-full"
        onSubmit={handlePasswordChange}
      >
        <div className="flex flex-col gap-5 mt-5 lg:mt-0 col-span-1">
          <PasswordSection />
          {showAlert &&
            !loading &&
            (success ? (
              <AlertSuccess message="Se restableció la contraseña correctamente." />
            ) : error ? (
              <AlertError message={error} />
            ) : null)}
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </>
  )
}
