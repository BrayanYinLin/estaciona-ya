import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type MailInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  wrapperClassName?: string
  isRequired?: boolean
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['name']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
}

export function EmailInput({
  labelContent,
  inputClassName,
  isRequired,
  name,
  placeholder,
  defaultValue
}: MailInputProps) {
  return (
    <fieldset>
      <legend className="fieldset-legend text-xs">{labelContent}</legend>

      <label className="input w-full items-center gap-2">
        <input
          type="email"
          name={name}
          required={isRequired}
          className={inputClassName}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </label>
    </fieldset>
  )
}
