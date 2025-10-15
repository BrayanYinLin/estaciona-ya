import { Request, Response, NextFunction } from 'express'
import { DistrictService } from '@locations/services/district.service'

export class DistrictController {
  constructor(private readonly service: DistrictService) {}

  async getAll(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const districts = await this.service.getAll()

      return res.status(200).json(districts)
    } catch (e: unknown) {
      next(e)
    }
  }
}
