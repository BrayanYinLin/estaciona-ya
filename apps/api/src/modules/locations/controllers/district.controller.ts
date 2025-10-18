import { Request, Response, NextFunction } from 'express'
import { DistrictServiceImpl } from '@locations/services/district.service'
import { DistrictController } from '@locations/district'

export class DistrictControllerImpl implements DistrictController {
  constructor(private readonly service: DistrictServiceImpl) {}

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
