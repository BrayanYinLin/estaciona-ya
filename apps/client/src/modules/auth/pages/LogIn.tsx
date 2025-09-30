import type { FormEvent } from 'react'
import { Input } from '@shared/components/Input'
import { useAuthStore } from '@auth/context/auth.context'
import { useNavigate } from 'react-router'
import { AuthService } from '@auth/services/auth.service'

export function LogIn() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { token, route } = await AuthService.login({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })

    if (token && route) {
      setAuth(token)
      navigate(route)
    }

    // TO-DO: feedback de usuario cuando escribe mal su contraseña
  }
  return (
    <>
      <main className="flex lg:grid lg:grid-cols-2">
        <img
          src="https://placehold.co/600x700"
          alt=""
          className="hidden lg:block max-h-screen object-none"
        />

        <form
          className="h-full w-full flex flex-col justify-center gap-6 px-8"
          onSubmit={handleSubmit}
        >
          <h1 className="text-md lg:text-3xl font-semibold">
            ¡Bienvenido de vuelta, inicia sesión!
          </h1>
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
            placeholder="Ingresa tu contraseña"
          />

          <button type="submit" className="btn btn-info">
            Ingresar
          </button>
        </form>
      </main>
    </>
  )
}
