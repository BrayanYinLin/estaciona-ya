import { ZodType } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const softCheckSchema = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body)

    if (!success || error) {
      return res.json({ message: 'ok' })
    }

    req.body = data
    return next()
  }
}
