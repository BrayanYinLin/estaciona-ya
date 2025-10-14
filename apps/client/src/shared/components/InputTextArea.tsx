import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type TextAreaInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  wrapperClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
}

export function InputTextArea({
  labelContent,
  inputClassName,
  isRequired,
  name,
  placeholder,
  defaultValue
}: TextAreaInputProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{labelContent}</legend>
      <textarea
        className={`textarea ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </fieldset>
  )
}
