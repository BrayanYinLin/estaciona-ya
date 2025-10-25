import { GarageController, GarageService } from '@garages/garage'
import { Request, Response, NextFunction } from 'express'

export class GarageControllerImpl implements GarageController {
  constructor(private readonly service: GarageService) {}

  async saveGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      await this.service.saveGarage({
        ...req.body,
        photos: req.files
      })

      return res.status(201).end()
    } catch (e) {
      next(e)
    }
  }
}
