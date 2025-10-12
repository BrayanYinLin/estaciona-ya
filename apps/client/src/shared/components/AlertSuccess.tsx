import type { HTMLAttributes } from 'react'

export type AlertSuccessProps = {
  message: string
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export function AlertSuccess({ message }: AlertSuccessProps) {
  return (
    <div role="alert" className="alert alert-info alert-soft">
      <span>{message}</span>
    </div>
  )
}
