import { KeyIcon } from './KeyIcon'

export function LoginInputPassword({
  showPassword
}: {
  showPassword: boolean
}) {
  const inputType = showPassword ? 'text' : 'password'
  return (
    <>
      <fieldset>
        <legend className="fieldset-legend text-xs">Contraseña</legend>
        <label className="input w-full items-center gap-2">
          {<KeyIcon />}
          <input
            type={inputType}
            name="password"
            required
            className="w-full"
            placeholder="Ingresa tu contraseña"
          />
        </label>
      </fieldset>
    </>
  )
}
