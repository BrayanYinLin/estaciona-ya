import type { FormEvent } from 'react'
import { Input } from '../../../shared/components/Input'
import { Select } from '../../../shared/components/Select'
import { api } from '../../../shared/api/api'
import { useAuthStore } from '../context/auth.context'
import { ROLES } from '../../../shared/constants/roles'

export function Register() {
  const { setAuth } = useAuthStore()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const endpoint =
      formData.get('role') === ROLES.TENANT ? '/auth/tenant' : '/auth/lessor'

    const { data } = await api.post(endpoint, {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      dni: formData.get('dni')
    })

    setAuth(data.access_token)
  }

  return (
    <>
      <main className="flex lg:grid lg:grid-cols-2">
        <img
          src="https://placehold.co/600x700"
          alt=""
          className="hidden lg:block"
        />

        <form
          className="h-full w-full flex flex-col justify-center gap-6 px-8"
          onSubmit={handleSubmit}
        >
          <h1 className="text-md lg:text-3xl font-semibold">
            ¡Bienvenido, registrate aquí!
          </h1>

          <Input
            labelContent="Nombre"
            inputType="text"
            name="name"
            placeholder="Ingresa tu nombre"
          />

          <Input
            labelContent="Correo"
            inputType="email"
            name="email"
            placeholder="Ingresa tu correo"
          />

          <Input
            labelContent="Contraseña"
            inputType="password"
            name="password"
            placeholder="Registra una contraseña"
          />

          <Input
            labelContent="Documento de identificación"
            inputType="text"
            name="dni"
            placeholder="Ingresa tu documento de identificación"
          />

          <Select
            labelContent="Rol"
            name="role"
            defaultValue="Escoge tu rol"
            options={ROLES}
          />
          <button type="submit" className="btn btn-info">
            Registrar
          </button>
        </form>
      </main>
    </>
  )
}
