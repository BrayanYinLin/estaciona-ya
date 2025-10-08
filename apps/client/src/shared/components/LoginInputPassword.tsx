import type { InputHTMLAttributes } from 'react'
import { KeyIcon } from './KeyIcon'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type LoginInputPasswordProps = NativeInputProps & {
  showPassword: boolean
}

export function LoginInputPassword({
  name,
  showPassword
}: LoginInputPasswordProps) {
  const inputType = showPassword ? 'text' : 'password'
  return (
    <>
      <fieldset>
        <legend className="fieldset-legend text-xs">Contraseña</legend>
        <label className="input w-full items-center gap-2">
          {<KeyIcon />}
          <input
            type={inputType}
            name={name}
            required
            className="w-full"
            placeholder="Ingresa tu contraseña"
          />
        </label>
      </fieldset>
    </>
  )
}
