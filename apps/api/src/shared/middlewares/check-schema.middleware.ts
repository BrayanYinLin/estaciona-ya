import z, { ZodType } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@shared/utils/error'
import { HTTP_CODES } from '@shared/constants/http.codes'

export const checkSchema = <T>(schema: ZodType<T>) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body)

    if (!success || error) {
      return next(
        new AppError({
          httpCode: HTTP_CODES.BAD_REQUEST,
          message: z
            .prettifyError(error)
            .split('\n')
            .map((line) =>
              line
                .replace(/^✖\s*/, '')
                .replace(/→.*$/, '')
                .trim()
            )
            .filter((line) => line.length > 0)
            .join('\n')
        })
      )
    }

    req.body = data
    return next()
  }
}
