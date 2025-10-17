import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type TextInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  wrapperClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
}

export function InputText({
  labelContent,
  inputClassName,
  isRequired,
  name,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  readOnly
}: TextInputProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{labelContent}</legend>
      <input
        type="text"
        className={`input w-full ${inputClassName}`}
        placeholder={placeholder}
        name={name}
        required={isRequired}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </fieldset>
  )
}
