import { GarageController, GarageService } from '@garages/garage'
import { Request, Response, NextFunction } from 'express'

export class GarageControllerImpl implements GarageController {
  constructor(private readonly service: GarageService) {}
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { page, size, covered, hasCameras, mode, price, district } =
        req.query

      const garages = await this.service.findAll({
        page: Number(page) || 1,
        size: Number(size) || 10,
        covered:
          covered !== undefined
            ? String(covered).toLowerCase() === 'true'
            : undefined,
        hasCameras:
          hasCameras !== undefined
            ? String(hasCameras).toLowerCase() === 'true'
            : undefined,
        mode: mode ? String(mode) : undefined,
        price: price !== undefined ? Number(price) : undefined,
        district: district !== undefined ? String(district) : undefined
      })

      return res.json(garages)
    } catch (e) {
      next(e)
    }
  }

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
