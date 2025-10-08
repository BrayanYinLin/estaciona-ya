import { InputPassword } from '@shared/components/InputPassword'
import { LoginInputPassword } from '@shared/components/LoginInputPassword'
import { useState } from 'react'

export function PasswordSection() {
  const [showPasswords, setShowPasswords] = useState(false)
  const inputType = showPasswords ? 'text' : 'password'

  return (
    <fieldset className="flex flex-col gap-2">
      <LoginInputPassword showPassword={showPasswords} name="oldPassword" />

      <div className="flex flex-col gap-1">
        <InputPassword
          inputType={inputType}
          labelContent="Nueva contraseña"
          placeholder="Ingresa tu nueva contraseña"
          name="newPassword"
          required
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-base-content/80">
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={showPasswords}
          onChange={() => setShowPasswords((prev) => !prev)}
        />
        Mostrar contraseña
      </label>
    </fieldset>
  )
}
