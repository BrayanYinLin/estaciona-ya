import type { ButtonHTMLAttributes } from 'react'

export type ReturnButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function ReturnButton({ className, onClick }: ReturnButtonProps) {
  return (
    <button className={`btn btn-primary ${className ?? ''}`} onClick={onClick}>
      Regresar
    </button>
  )
}
