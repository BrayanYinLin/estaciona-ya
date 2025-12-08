import { NextFunction, Request, Response } from 'express'
import { BookingController, BookingService } from './booking'

export class BookingControllerImpl implements BookingController {
  constructor(private readonly service: BookingService) {}

  async findAllByGarageOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { user, page, size } = req.body
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
