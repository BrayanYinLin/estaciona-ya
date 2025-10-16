import { LocationController, LocationService } from '@locations/location'
import { Request, Response, NextFunction } from 'express'

export class LocationControllerImpl implements LocationController {
  constructor(private readonly service: LocationService) {}

  async findLocationByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const location = req.query.address as string
      const response = await this.service.findLocationByName(location)

      return res.status(200).json(response)
    } catch (e) {
      next(e)
    }
  }
}
