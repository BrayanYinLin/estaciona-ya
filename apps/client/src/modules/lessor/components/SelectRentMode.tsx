import type { RentMode } from '@lessor/hooks/useRentMode'
import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLSelectElement>, 'type'>

export type SelectProps = NativeInputProps & {
  labelContent: string
  name: string
  defaultValue: string
  options: RentMode[]
}

export function SelectRentMode({
  labelContent,
  name,
  defaultValue,
  options,
  onChange
}: SelectProps) {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{labelContent}</legend>
        <select
          defaultValue={defaultValue}
          name={name}
          className="select w-full"
          onChange={onChange}
        >
          <option disabled={true} value={defaultValue}>
            {defaultValue}
          </option>
          {options.map((rentMode) => {
            const modeName = String(rentMode.mode_name).split(',')[0].trim()
            return (
              <option value={rentMode.id} key={rentMode.id}>
                {modeName}
              </option>
            )
          })}
        </select>
      </fieldset>
    </>
  )
}
