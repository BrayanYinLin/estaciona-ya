import { GarageController, GarageService } from '@garages/garage'
import { separateFilters } from '@garages/utils/separate_filters.utils'
import { Request, Response, NextFunction } from 'express'

export class GarageControllerImpl implements GarageController {
  constructor(private readonly service: GarageService) {}

  async disableGarage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params
      await this.service.disableGarage(Number(id), req.body.user.id)

      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const {
        page,
        size,
        covered,
        hasCameras,
        mode,
        district,
        minPrice,
        maxPrice,
        // Filtros por hora
        day,
        startHour,
        endHour,
        // Filtros por dia
        startDay,
        endDay,
        // Filtros por mes
        startMonth,
        endMonth
      } = req.query

      const filter = separateFilters({
        day: new Date(String(day)),
        startHour: Number(startHour),
        endHour: Number(endHour),
        startDay: new Date(String(startDay)),
        endDay: new Date(String(endDay)),
        startMonth: String(startMonth),
        endMonth: String(endMonth)
      })

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
        district: district !== undefined ? String(district) : undefined,
        minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
        maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
        filters: filter
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { page, size } = req.query
      const garages = await this.service.findAllByUserId(
        res.locals.id,
        Number(page === undefined ? 1 : page),
        Number(size === undefined ? 20 : size)
      )

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
  async findGarageById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params

      const garage = await this.service.findGarageById(Number(id))

      return res.json(garage)
    } catch (e) {
      next(e)
    }
  }
}
