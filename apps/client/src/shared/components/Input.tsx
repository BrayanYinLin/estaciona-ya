import type { InputHTMLAttributes } from 'react'

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
      <input
        type={inputType}
        name={name}
        className="input md:w-full"
        placeholder={placeholder}
      />
    </fieldset>
  )
}
