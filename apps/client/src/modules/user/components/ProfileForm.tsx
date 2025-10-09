import { InputPassword } from '@shared/components/InputPassword'
import { PasswordSection } from './PasswordSection'
import { useEffect, useState, type FormEvent } from 'react'
import { DangerZone } from './DangerZone'
import { PhotoUploader } from './PhotoUploader'
import { type UserProfile, useUserStore } from '@user/context/user.context'
import { DniInput } from '@shared/components/DniInput'
import { EmailInput } from '@shared/components/EmailInput'
import { UserService } from '@user/services/user.service'

export function ProfileForm({ name, email, dni, role, photo }: UserProfile) {
  const [formData, setFormData] = useState<FormData>(new FormData())
  const { updateProfile } = useUserStore()
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    }

    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }, [errorMessage])

  useEffect(() => {}, [errorMessage])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newForm = new FormData()
    if ((formData.get('photo') as File) !== null) {
      newForm.append('photo', formData.get('photo') as File)
    }
    newForm.append('name', data.get('name') as string)
    newForm.append('email', data.get('email') as string)
    newForm.append('dni', data.get('dni') as string)

    await updateProfile(newForm)
  }

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const oldPassword = data.get('oldPassword') as string
    const newPassword = data.get('newPassword') as string

    try {
      const result = await UserService.changePassword({
        oldPassword,
        newPassword
      })
      setSuccess(result)
    } catch (e: unknown) {
      setErrorMessage((e as Error).message)
    }
  }

  return (
    <>
      {/* Sección para editar el perfil */}
      <h2 className="mt-5 text-2xl font-semibold">Editar perfil</h2>

      <form
        className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-4 flex flex-col w-full"
        onSubmit={handleSubmit}
      >
        <section className="lg:col-span-1">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Tu nombre"
              name="name"
              defaultValue={name}
            />
          </fieldset>

          <EmailInput
            labelContent="Correo"
            name="email"
            placeholder="juan.perez@email.com"
            defaultValue={email}
          />

          <DniInput
            labelContent="Documento de identificación"
            name="dni"
            placeholder="Ingresa tu documento"
            defaultValue={dni}
            isRequired
          />

          <InputPassword
            labelContent="Rol"
            inputType="text"
            name="role"
            defaultValue={role === 'lessor' ? 'Arrendador' : 'Arrendatario'}
            readOnly
          />
        </section>

        <div className="flex flex-col gap-8 mt-5 lg:mt-0 col-span-1">
          <PhotoUploader
            defaultPreview={photo}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-span-2 row-span-1 row-start-2 h-auto">
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Guardar cambios
          </button>
        </div>
      </form>

      {/* Sección para cambiar la contraseña */}
      <h2 className="mt-5 text-2xl font-semibold">Cambiar contraseña</h2>
      <form
        className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-4 flex flex-col w-full"
        onSubmit={handlePasswordChange}
      >
        <div className="flex flex-col gap-5 mt-5 lg:mt-0 col-span-1">
          <PasswordSection />
          {success && (
            <div role="alert" className="alert alert-info alert-soft">
              <span>Se restableció la contraseña correctamente.</span>
            </div>
          )}
          {errorMessage && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{errorMessage}</span>
            </div>
          )}
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Cambiar contraseña
          </button>
        </div>
      </form>

      {/* Sección para desactivar la cuenta */}
      <h2 className="text-2xl font-semibold">Desactivar cuenta</h2>
      <DangerZone />
    </>
  )
}
