import type { FormEvent } from 'react'
import { Input } from '@shared/components/Input'
import { Select } from '@shared/components/Select'
import { useAuthStore } from '@auth/context/auth.context'
import { ROLES } from '@shared/constants/roles'
import { Link, useNavigate } from 'react-router'
import { AuthService } from '@auth/services/auth.service'

export function Register() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const { token, route } = await AuthService.signup({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      dni: formData.get('dni') as string,
      role: formData.get('role') as string
    })

    if (token && route) {
      setAuth(token)
      navigate(route)
    }

    // TO-DO: feedback de usuario cuando se registra con datos invalidos
  }

  return (
    <>
      <main className="flex lg:grid lg:grid-cols-2">
        <img
          src="/img/signup_pic.webp"
          alt=""
          className="hidden lg:block object-contain p-30"
        />

        <form
          className="h-full w-full flex flex-col justify-center gap-6 px-8"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <h1 className="text-md lg:text-3xl font-semibold">
              ¡Bienvenido, registrate aquí!
            </h1>
            <Link to={'/'} className="btn btn-outline">
              Regresar
            </Link>
          </div>

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
