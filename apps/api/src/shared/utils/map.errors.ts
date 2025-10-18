import { HTTP_CODES } from '@shared/constants/http.codes'
import { AppError, DomainError } from './error'

export const mapDomainToHttp = (error: DomainError): AppError => {
  switch (error.code) {
    case 'ENTITY_NOT_FOUND':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.NOT_FOUND
      })
    case 'CONFLICT':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.CONFLICT
      })
    case 'DUPLICATE_ENTITY':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.BAD_REQUEST
      })
    case 'VALIDATION_ERROR':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.BAD_REQUEST
      })
    case 'UNAUTHORIZED':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.UNAUTHORIZED
      })
    case 'INTERNAL_ERROR':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.INTERNAL
      })
    case 'TOKEN_MISSING':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.UNAUTHORIZED
      })
    case 'TOKEN_ERROR':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.UNAUTHORIZED
      })
    case 'PHOTO_ERROR':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.NOT_FOUND
      })
    case 'INCORRECT_PASSWORD':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.BAD_REQUEST
      })
    case 'EMAIL_ERROR':
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.BAD_REQUEST
      })
    default:
      return new AppError({
        message: error.message,
        httpCode: HTTP_CODES.INTERNAL
      })
  }
}
