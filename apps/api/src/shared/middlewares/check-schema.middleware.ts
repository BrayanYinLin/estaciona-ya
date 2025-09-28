import { ZodType } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const checkSchema = <T>(schema: ZodType<T>) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body)

    if (!success || error) {
      return next(new Error('Validation error'))
    }

    req.body = data
    return next()
  }
}
