import { GarageController } from '@garages/garage'
import { Request, Response, NextFunction } from 'express'

export class GarageControllerImpl implements GarageController {
  async saveGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      console.log({
        ...req.body,
        photos: req.files
      })

      return res.json(req.body)
    } catch (e) {
      next(e)
    }
  }
}
