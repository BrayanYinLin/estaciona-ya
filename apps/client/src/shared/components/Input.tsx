import type { InputHTMLAttributes } from 'react'
import { KeyIcon } from './KeyIcon'

export type InputProps = {
  labelContent: string
  name: string
  inputType: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder: string
}

export function Input({
  labelContent,
  name,
  inputType,
  placeholder
}: InputProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{labelContent}</legend>

      <label className="input validator w-full">
        {inputType === 'password' && <KeyIcon />}
        <input
          type={inputType}
          name={name}
          required
          placeholder={placeholder}
          className="w-full"
          {...(inputType === 'password'
            ? {
                minLength: 8,
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                title:
                  'Must be more than 8 characters, including number, lowercase letter, uppercase letter'
              }
            : {})}
        />
      </label>
      {inputType === 'password' && (
        <p className="validator-hint hidden">
          La contraseña debe tener más de 8 caracteres incluyendo:
          <br />
          Al menos un número
          <br />
          Al menos una letra minúscula <br />
          Al menos una letra mayúscula
        </p>
      )}
    </fieldset>
  )
}
