import { InputPassword } from '@shared/components/InputPassword'
import { PasswordSection } from './PasswordSection'
import { useState, type FormEvent } from 'react'
import { DangerZone } from './DangerZone'
import { PhotoUploader } from './PhotoUploader'
import { type UserProfile, useUserStore } from '@user/context/user.context'
import { DniInput } from '@shared/components/DniInput'
import { EmailInput } from '@shared/components/EmailInput'

export function ProfileForm({ name, email, dni, role, photo }: UserProfile) {
  const [formData, setFormData] = useState<FormData>(new FormData())
  const { updateProfile } = useUserStore()

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

  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      {/* Sección para editar el perfil */}
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
