import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type DniInputProps = NativeInputProps & {
  labelContent?: string
  className?: InputHTMLAttributes<HTMLInputElement>['name']
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
  readonly?: InputHTMLAttributes<HTMLInputElement>['readOnly']
}
export function DniInput({
  labelContent,
  className,
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

        <input
          type="text"
          name={name}
          required={isRequired}
          className={`input w-full items-center focus:outline-0 focus:outline-none ${className}`}
          placeholder={placeholder}
          maxLength={8}
          inputMode="numeric"
          pattern="\d*"
          defaultValue={defaultValue}
          readOnly={readOnly}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D+/g, '')
          }}
        />
      </fieldset>
    </>
  )
}
