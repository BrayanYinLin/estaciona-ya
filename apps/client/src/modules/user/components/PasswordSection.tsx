import { useState } from 'react'
import { Input } from '@shared/components/Input'

export function PasswordSection() {
  const [showPasswords, setShowPasswords] = useState(false)
  const inputType = showPasswords ? 'text' : 'password'

  return (
    <fieldset className="flex flex-col gap-2">
      <Input
        labelContent="Contraseña actual"
        inputType={inputType}
        name="currentPassword"
        placeholder="Ingresa tu contraseña actual"
        disablePasswordValidator={true}
      />

      <div className="flex flex-col gap-1">
        <Input
          labelContent="Nueva contraseña"
          inputType={inputType}
          name="newPassword"
          placeholder="Ingresa tu nueva contraseña"
          required={false}
        />
        <span className="text-xs text-base-content/60">
          Este campo debe estar vacío si no deseas actualizarla.
        </span>
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
