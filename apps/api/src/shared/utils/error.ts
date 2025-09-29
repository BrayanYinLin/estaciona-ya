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
