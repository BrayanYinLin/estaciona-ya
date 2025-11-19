import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type CheckboxInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
}

export function Checkbox({
  labelContent,
  inputClassName,
  name,
  ...rest
}: CheckboxInputProps) {
  return (
    <label className="label">
      <input
        type="checkbox"
        className={`checkbox ${inputClassName ?? ''}`.trim()}
        name={name}
        {...rest}
      />
      {labelContent}
    </label>
  )
}
