import { type ReactNode } from 'react'

type FieldProps = {
  id: string
  label?: string
  hint?: ReactNode
  wrapperClassName?: string
  inputWrapperClassName?: string
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  children: ReactNode // aquí va el input concreto
}

export const Field = ({
  id,
  label,
  hint,
  wrapperClassName,
  inputWrapperClassName,
  leftIcon,
  rightSlot,
  children
}: FieldProps) => {
  return (
    <fieldset
      className={['fieldset', wrapperClassName].filter(Boolean).join(' ')}
    >
      {label ? <legend className="fieldset-legend">{label}</legend> : null}
      <label
        htmlFor={id}
        className={['input w-full items-center gap-2', inputWrapperClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {leftIcon}
        {children}
        {rightSlot}
      </label>
      {hint ? <p className="validator-hint">{hint}</p> : null}
    </fieldset>
  )
}
