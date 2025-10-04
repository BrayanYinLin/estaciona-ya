import { DomainErrorCode } from '@shared/constants/domain.code'
import { HttpCode } from '@shared/constants/http.codes'

type ErrorParams = {
  // code: Code
  httpCode?: HttpCode
  message: string
  isOperational?: boolean
}

export class AppError extends Error {
  public readonly httpCode?: HttpCode
  public readonly isOperational: boolean = true

  constructor({ httpCode, message, isOperational = true }: ErrorParams) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.httpCode = httpCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export type DomainErrorParams = {
  message: string
  code: DomainErrorCode
  context?: unknown
  cause?: Error
}

export class DomainError extends Error {
  public readonly code: DomainErrorCode
  public readonly context?: unknown
  public readonly cause?: Error

  constructor({ message, code, context, cause }: DomainErrorParams) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.context = context
    this.cause = cause
    Error.captureStackTrace(this, this.constructor)
  }
}
