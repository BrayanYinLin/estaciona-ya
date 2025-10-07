import type { InputHTMLAttributes, ReactNode } from 'react'
import { KeyIcon } from './KeyIcon'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type InputProps = NativeInputProps & {
  labelContent?: string
  inputType: InputHTMLAttributes<HTMLInputElement>['type']
  inputClassName?: string
  wrapperClassName?: string
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  disablePasswordValidator?: boolean
}

export function InputPassword({
  labelContent,
  inputType,
  className,
  inputClassName,
  wrapperClassName,
  // leftIcon,
  rightSlot,
  readOnly = false,
  required,
  disablePasswordValidator = false,
  ...rest
}: InputProps) {
  const appliedRequired = required ?? !readOnly
  const fieldsetClasses = [
    'fieldset',
    wrapperClassName,
    className,
    disablePasswordValidator ? '' : 'validator-enabled' // Clase condicional
  ]
    .filter(Boolean)
    .join(' ')
  const inputClasses = [
    'w-full',
    inputClassName,
    disablePasswordValidator ? '' : 'input-validator' // Clase condicional
  ]
    .filter(Boolean)
    .join(' ')
  // const showPasswordIcon = inputType === 'password' && !leftIcon

  return (
    <fieldset className={fieldsetClasses}>
      {labelContent ? (
        <legend className="fieldset-legend">{labelContent}</legend>
      ) : null}

      <label
        className={[
          'input w-full items-center gap-2',
          disablePasswordValidator ? '' : 'validator'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <KeyIcon />
        <input
          type={inputType}
          readOnly={readOnly}
          required={appliedRequired}
          className={inputClasses}
          {...(!disablePasswordValidator
            ? {
                minLength: 8,
                pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                title:
                  'Debe tener mínimo 8 caracteres e incluir número, letra minúscula y letra mayúscula'
              }
            : {})}
          {...rest}
        />
        {rightSlot}
      </label>
      {!disablePasswordValidator && (
        <p className="validator-hint hidden">
          La contraseña debe tener mínimo 8 caracteres incluyendo:
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
