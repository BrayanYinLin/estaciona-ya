export const DOMAIN_ERRORS = {
  ENTITY_NOT_FOUND: {
    code: 'ENTITY_NOT_FOUND',
    message: 'La entidad solicitada no fue encontrada'
  },
  DUPLICATE_ENTITY: {
    code: 'DUPLICATE_ENTITY',
    message: 'La entidad ya existe'
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Uno o más campos son inválidos'
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'No tienes autorización para realizar esta acción'
  },
  CONFLICT: {
    code: 'CONFLICT',
    message: 'La entidad se encuentra en un estado conflictivo'
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: 'Ocurrió un error inesperado en la lógica de dominio'
  },
  TOKEN_ERROR: {
    code: 'TOKEN_ERROR',
    message: 'No se pudo verificar la autenticación: token inválido o expirado'
  },
  TOKEN_MISSING: {
    code: 'TOKEN_MISSING',
    message: 'No se proporcionó token de autenticación'
  },
  PHOTO_ERROR: {
    code: 'PHOTO_ERROR',
    message: 'Foto no encontrada'
  },
  INCORRECT_PASSWORD: {
    code: 'INCORRECT_PASSWORD',
    message: 'La contraseña que ingresaste es incorrecta'
  }
} as const

export type DomainErrorCode = keyof typeof DOMAIN_ERRORS
