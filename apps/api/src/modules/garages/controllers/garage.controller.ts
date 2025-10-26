import { GarageController, GarageService } from '@garages/garage'
import { Request, Response, NextFunction } from 'express'

export class GarageControllerImpl implements GarageController {
  constructor(private readonly service: GarageService) {}

  async findPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const url = await this.service.findPhoto(req.params.photoId)

      return res.sendFile(url)
    } catch (e) {
      next(e)
    }
  }

  async findAllByUserId(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      console.log('[Controller]')
      const garages = await this.service.findAllByUserId(res.locals.id)

      return res.json(garages)
    } catch (e) {
      next(e)
    }
  }

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
