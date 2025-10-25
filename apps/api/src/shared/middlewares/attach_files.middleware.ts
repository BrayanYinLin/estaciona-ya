import { NextFunction, Request, Response } from 'express'

export const attachPhotos = () => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (Array.isArray(req.files)) {
      req.body.photos = req.files
    }
    next()
  }
}
