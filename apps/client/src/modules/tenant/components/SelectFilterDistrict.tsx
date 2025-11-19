import type { District } from '@lessor/hooks/useDistricts'
import type { InputHTMLAttributes, RefObject } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLSelectElement>, 'type'>

export type SelectProps = NativeInputProps & {
  labelContent: string
  name: string
  defaultValue: string
  options: District[]
  ref?: RefObject<HTMLSelectElement | null>
}

export function SelectFilterDistrict({
  labelContent,
  name,
  defaultValue,
  options,
  ref,
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
          ref={ref}
          onChange={onChange}
        >
          <option disabled={true} value={defaultValue}>
            {defaultValue}
          </option>
          {options.map((district) => {
            const districtName = String(district.name).split(',')[0].trim()
            return (
              <option value={district.name} key={district.id}>
                {districtName}
              </option>
            )
          })}
        </select>
      </fieldset>
    </>
  )
}
