import { Request, Response, NextFunction } from 'express'

export const logPostBody = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (req.method === 'POST') {
      console.log('[HTTP]: ', req.body)
    }
    next()
  }
}
