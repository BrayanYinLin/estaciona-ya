import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type DniInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
  readonly?: InputHTMLAttributes<HTMLInputElement>['readOnly']
}
export function DniInput({
  labelContent,
  inputClassName,
  isRequired,
  name,
  placeholder,
  defaultValue,
  readOnly
}: DniInputProps) {
  return (
    <>
      <fieldset>
        <legend className="fieldset-legend text-xs">{labelContent}</legend>

        <label className="input w-full items-center gap-2">
          <input
            type="text"
            name={name}
            required={isRequired}
            className={inputClassName}
            placeholder={placeholder}
            maxLength={8}
            inputMode="numeric"
            pattern="\d*"
            defaultValue={defaultValue}
            readOnly={readOnly}
            // Asegura que solo se puedan ingresar números
            onInput={(e) => {
              // Filtra cualquier caracter no numérico
              e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, '')
            }}
          />
        </label>
      </fieldset>
    </>
  )
}
