import { Request, Response } from 'express'
import { AppError, DomainError } from './error'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { HTTP_CODES } from '@shared/constants/http.codes'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'
import { mapDomainToHttp } from './map.errors'

export const ERROR_SOURCE = {
  HTTP: 'http',
  PROCESS: 'process'
} as const

export type ErrorSource = (typeof ERROR_SOURCE)[keyof typeof ERROR_SOURCE]

export type ErrorContext = {
  source: ErrorSource
}

export class ErrorHandler {
  public async handleError(
    e: unknown,
    context: ErrorContext,
    req?: Request,
    res?: Response
  ): Promise<void> {
    const error = this.normalize(e)

    if (context.source !== 'http') {
      this.handleProcessError(error)
      return
    }

    await this.sendHttpResponse(error, req!, res!)
  }

  private async sendHttpResponse(err: Error, _: Request, res: Response) {
    if (err instanceof AppError) {
      return res.status(Number(err.httpCode)).json({
        status: err.httpCode,
        message: err.message
      })
    }

    return res.status(HTTP_CODES.INTERNAL).json({
      status: HTTP_CODES.INTERNAL,
      message: 'Error inesperado'
    })
  }

  private isTrustedError(e: Error) {
    return e instanceof AppError && e.isOperational
  }

  private handleProcessError(e: Error) {
    const trusted = this.isTrustedError(e)
    if (trusted) {
      return
    }
    process.exit(1)
  }

  private normalize(err: unknown): Error {
    if (err instanceof DomainError) {
      return mapDomainToHttp(err)
    }

    if (err instanceof AppError) {
      return err
    }

    if (err instanceof TokenExpiredError) {
      return new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'Token expirado'
      })
    }

    if (err instanceof JsonWebTokenError) {
      return new AppError({
        httpCode: HTTP_CODES.UNAUTHORIZED,
        message: 'JWT presenta errores'
      })
    }

    if (err instanceof EntityNotFoundError) {
      return new AppError({
        httpCode: HTTP_CODES.NOT_FOUND,
        message: 'Recurso no encontrado'
      })
    }

    if (err instanceof QueryFailedError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const code = (err as any).driverError?.code
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errno = (err as any).driverError?.errno
      if (code === 'ER_DUP_ENTRY' || errno === 1062) {
        return new AppError({
          httpCode: HTTP_CODES.CONFLICT,
          message: 'Registro duplicado'
        })
      }
    }

    return new Error(
      typeof err === 'string'
        ? err
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((err as any)?.message ?? 'Unexpected error')
    )
  }
}

export const handler = new ErrorHandler()
