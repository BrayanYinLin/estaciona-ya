import type { FormEvent } from 'react'
import { Input } from '../../../shared/components/Input'

export function LogIn() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
            ¡Bienvenido, ingresate aquí!
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
