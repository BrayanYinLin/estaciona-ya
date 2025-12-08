import { NextFunction, Request, Response } from 'express'
import { BookingController, BookingService } from './booking'

export class BookingControllerImpl implements BookingController {
  constructor(private readonly service: BookingService) {}

  async findAllByTenant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { page, size } = req.query
      const { user } = req.body
      const bookings = await this.service.findAllByTenant(
        Number(user.id),
        Number(page),
        Number(size)
      )

      return res.json(bookings)
    } catch (e) {
      next(e)
    }
  }

  async findAllByGarageOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { page, size } = req.query
      const { user } = req.body
      const bookings = await this.service.findAllByGarageOwner(
        Number(user.id),
        Number(page),
        Number(size)
      )

      return res.json(bookings)
    } catch (e) {
      next(e)
    }
  }
}
