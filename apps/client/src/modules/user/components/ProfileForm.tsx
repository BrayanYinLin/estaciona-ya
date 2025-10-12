import { type FormEvent } from 'react'
import { PhotoUploader } from './PhotoUploader'
import { type UserProfile, useUserStore } from '@user/context/user.context'
import { DniInput } from '@shared/components/DniInput'
import { EmailInput } from '@shared/components/EmailInput'
import { AlertError } from '@shared/components/AlertError'

export function ProfileForm({ name, email, dni, role, photo }: UserProfile) {
  const { updateProfile, error } = useUserStore()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newForm = new FormData()
    if ((data.get('photo') as File) !== null) {
      newForm.append('photo', data.get('photo') as File)
    }
    newForm.append('name', data.get('name') as string)
    newForm.append('email', data.get('email') as string)
    newForm.append('dni', data.get('dni') as string)

    await updateProfile(newForm)
  }

  return (
    <>
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
              required
            />
          </fieldset>

          <EmailInput
            labelContent="Correo"
            name="email"
            placeholder="juan.perez@email.com"
            defaultValue={email}
            isRequired
          />

          <DniInput
            labelContent="Documento de identificación"
            name="dni"
            placeholder="Ingresa tu documento"
            defaultValue={dni}
            className="focus:outline-none"
            readOnly
            isRequired
            required
          />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Rol</legend>
            <input
              type="text"
              className="input w-full focus:outline-none"
              placeholder="Tu nombre"
              name="role"
              defaultValue={
                role.name === 'lessor' ? 'Arrendador' : 'Arrendatario'
              }
              required
              readOnly
            />
          </fieldset>

          {error && <AlertError message={error} className="my-4" />}
        </section>

        <div className="flex flex-col gap-8 mt-5 lg:mt-0 col-span-1">
          <PhotoUploader defaultPreview={photo} />
        </div>

        <div className="col-span-2 row-span-1 row-start-2 h-auto">
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  )
}
