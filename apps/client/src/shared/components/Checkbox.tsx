import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type CheckboxInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
}

export function Checkbox({
  labelContent,
  inputClassName,
  name,
  defaultValue
}: CheckboxInputProps) {
  return (
    <label className="label">
      <input
        type="checkbox"
        className={`checkbox ${inputClassName}`}
        name={name}
        defaultValue={defaultValue}
      />
      {labelContent}
    </label>
  )
}
