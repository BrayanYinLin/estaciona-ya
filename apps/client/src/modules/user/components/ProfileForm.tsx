import { Input } from '@shared/components/Input'
import { PasswordSection } from './PasswordSection'
import type { FormEvent } from 'react'
import { DangerZone } from './DangerZone'
import { PhotoUploader } from './PhotoUploader'
import type { UserProfile } from '@user/context/user.context'

export function ProfileForm({ name, email, dni, role, photo }: UserProfile) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          <Input
            labelContent="Nombre"
            inputType="text"
            name="name"
            placeholder="Tu nombre"
            defaultValue={name}
          />

          <Input
            labelContent="Correo"
            inputType="email"
            name="email"
            placeholder="juan.perez@email.com"
            defaultValue={email}
          />

          <Input
            labelContent="Documento de identificación"
            inputType="text"
            name="dni"
            placeholder="Ingresa tu documento"
            defaultValue={dni}
          />

          <Input
            labelContent="Rol"
            inputType="text"
            name="role"
            defaultValue={role === 'lessor' ? 'Arrendador' : 'Arrendatario'}
            readOnly
          />
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

      {/* Sección para cambiar la contraseña */}
      <h2 className="mt-5 text-2xl font-semibold">Cambiar contraseña</h2>
      <form
        className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-4 flex flex-col w-full"
        onSubmit={handlePasswordChange}
      >
        <div className="flex flex-col gap-5 mt-5 lg:mt-0 col-span-1">
          <PasswordSection />
          <button type="submit" className="btn btn-outline btn-primary w-fit">
            Guardar cambios
          </button>
        </div>
      </form>

      {/* Sección para desactivar la cuenta */}
      <h2 className="text-2xl font-semibold">Desactivar cuenta</h2>
      <DangerZone />
    </>
  )
}
