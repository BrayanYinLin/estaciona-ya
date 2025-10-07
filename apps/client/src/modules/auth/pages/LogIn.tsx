import { useState, type FormEvent } from 'react'
import { Input } from '@shared/components/Input'
import { useAuthStore } from '@auth/context/auth.context'
import { Link, useNavigate } from 'react-router'
import { AuthService } from '@auth/services/auth.service'
import { LoginInputPassword } from '@shared/components/LoginInputPassword'

export function LogIn() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

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
          src="/img/login_pic.webp"
          alt=""
          className="hidden lg:block max-h-screen object-contain p-5"
        />

        <form
          className="h-full w-full flex flex-col justify-center gap-6 px-8"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <h1 className="text-md lg:text-3xl font-semibold">
              ¡Bienvenido de vuelta, inicia sesión!
            </h1>
            <Link to={'/'} className="btn btn-outline">
              Regresar
            </Link>
          </div>

          <Input
            labelContent="Correo"
            inputType="email"
            name="email"
            placeholder="Ingresa tu correo"
          />

          <LoginInputPassword showPassword={showPassword} />

          <label className="flex items-center gap-2 text-sm text-base-content/80">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            Mostrar contraseña
          </label>

          <button type="submit" className="btn btn-info">
            Ingresar
          </button>
        </form>
      </main>
    </>
  )
}
