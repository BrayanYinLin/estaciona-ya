import { forwardRef, type InputHTMLAttributes } from 'react'

type InputBaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string
  inputClassName?: string
}

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ id, inputClassName, ...rest }, ref) => {
    return (
      <input
        id={id}
        ref={ref}
        className={['w-full', inputClassName].filter(Boolean).join(' ')}
        {...rest}
      />
    )
  }
)
