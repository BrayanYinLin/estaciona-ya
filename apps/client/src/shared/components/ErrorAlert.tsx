import { ErrorIcon } from './ErrorIcon'

export function ErrorAlert({ message }: { message: string }) {
  return (
    <div role="alert" className="alert alert-error alert-soft">
      <ErrorIcon />
      <span>{message}</span>
    </div>
  )
}
