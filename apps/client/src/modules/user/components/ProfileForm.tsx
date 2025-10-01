import { Input } from '@shared/components/Input'
import { PasswordSection } from './PasswordSection'
import type { FormEvent } from 'react'

export function ProfileForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        labelContent="Nombre"
        inputType="text"
        name="name"
        placeholder="Juan Pérez"
        defaultValue="Juan Pérez"
      />

      <Input
        labelContent="Correo"
        inputType="email"
        name="email"
        placeholder="juan.perez@email.com"
        defaultValue="juan.perez@email.com"
      />

      <PasswordSection />

      <Input
        labelContent="Documento de identificación"
        inputType="text"
        name="dni"
        placeholder="Ingresa tu documento"
      />

      <div className="flex flex-col gap-1">
        <Input
          labelContent="Rol"
          inputType="text"
          name="role"
          value="Arrendatario / Arrendador"
          readOnly
        />
      </div>

      <button type="submit" className="btn btn-outline btn-primary w-fit">
        Guardar cambios
      </button>
    </form>
  )
}
