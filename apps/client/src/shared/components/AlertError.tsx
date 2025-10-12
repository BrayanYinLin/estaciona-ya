import type { HTMLAttributes } from 'react'

export type AlertErrorProps = {
  message: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export function AlertError({ message, className }: AlertErrorProps) {
  return (
    <div role="alert" className={`alert alert-error alert-soft ${className}`}>
      <span>{message}</span>
    </div>
  )
}
