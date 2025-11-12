import type { InputHTMLAttributes } from 'react'

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export type PriceInputProps = NativeInputProps & {
  labelContent?: string
  inputClassName?: string
  wrapperClassName?: string
  isRequired?: boolean
  footerText?: string
  name: InputHTMLAttributes<HTMLInputElement>['name']
  placeholder: InputHTMLAttributes<HTMLInputElement>['placeholder']
  defaultValue?: InputHTMLAttributes<HTMLInputElement>['value']
}

export function InputPrice({
  labelContent,
  inputClassName,
  isRequired,
  footerText = 'Máximo S/1000',
  name,
  placeholder,
  defaultValue
}: PriceInputProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{labelContent}</legend>
      <label className="input input-bordered flex items-center gap-2 w-full">
        <span className="text-gray-500">S/</span>
        <input
          type="text"
          inputMode="decimal"
          className={`grow outline-none bg-transparent ${inputClassName}`}
          placeholder={placeholder}
          name={name}
          required={isRequired}
          defaultValue={defaultValue}
          onInput={(e) => {
            let v = e.currentTarget.value

            // Solo números y punto
            v = v.replace(/[^\d.]/g, '')

            // Solo un punto decimal
            v = v.replace(/^(\d*\.\d{0,2})\d*$/, '$1')

            // Si empieza con ".", agrega 0 delante
            if (v.startsWith('.')) v = '0' + v

            // Máx 2 decimales
            if (v.includes('.')) {
              const [int, dec] = v.split('.')
              v = int + '.' + dec.slice(0, 2)
            }

            // Límite 1000
            if (parseFloat(v) > 1000) v = '1000'

            e.currentTarget.value = v
          }}
        />
      </label>
      {footerText && <p className="label">{footerText}</p>}
    </fieldset>
  )
}
