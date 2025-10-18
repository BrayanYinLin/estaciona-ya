import { RentModeController, RentModeService } from '@garages/rent_mode'
import { NextFunction, Request, Response } from 'express'

export class RentModeControllerImpl implements RentModeController {
  constructor(private readonly service: RentModeService) {}

  async findAll(
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const districts = await this.service.findAll()

      return res.json(districts)
    } catch (e) {
      next(e)
    }
  }
}
