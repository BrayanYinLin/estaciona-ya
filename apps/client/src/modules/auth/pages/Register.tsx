import { useState, type FormEvent } from 'react'
import { InputPassword } from '@shared/components/InputPassword'
import { Select } from '@shared/components/Select'
import { useAuthStore } from '@auth/context/auth.context'
import { ROLES } from '@shared/constants/roles'
import { Link, useNavigate } from 'react-router'
import { AuthService } from '@auth/services/auth.service'
import { DniInput } from '@shared/components/DniInput'
import { EmailInput } from '@shared/components/EmailInput'
import { ErrorAlert } from '@shared/components/ErrorAlert'

export function Register() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPassword ? 'text' : 'password'
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const { token, route, status, message } = await AuthService.signup({
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

    if (status && message) {
      setErrorMessage(message)
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

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Ingresa tu nombre"
              name="name"
            />
          </fieldset>

          <EmailInput
            labelContent="Correo"
            name="email"
            placeholder="Ingresa tu correo"
          />

          <InputPassword
            labelContent="Contraseña"
            inputType={inputType}
            name="password"
            placeholder="Ingresa tu contraseña"
            minLength={8} // Validación explícita
            required
          />

          <label className="flex items-center gap-2 text-sm text-base-content/80">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            Mostrar contraseña
          </label>

          {/* <Input
            labelContent="Documento de identificación"
            inputType="text"
            name="dni"
            placeholder="Ingresa tu documento de identificación"
          /> */}
          <DniInput
            labelContent="Documento de identificación"
            name="dni"
            placeholder="Ingresa tu documento de identificación"
          />

          <Select
            labelContent="Rol"
            name="role"
            defaultValue="Escoge tu rol"
            options={ROLES}
          />
          {errorMessage && <ErrorAlert message={errorMessage} />}
          <button type="submit" className="btn btn-info">
            Registrar
          </button>
        </form>
      </main>
    </>
  )
}
