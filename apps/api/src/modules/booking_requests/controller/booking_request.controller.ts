import {
  BookingRequestService,
  BookingRequestController
} from '@booking_requests/booking-request'
import { Request, Response, NextFunction } from 'express'

export class BookingRequestControllerImpl implements BookingRequestController {
  constructor(private readonly service: BookingRequestService) {}

  async findAllByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id: userId } = req.body.user
      const bookingRequests = await this.service.findAllByUserId(userId)
      return res.status(200).json(bookingRequests)
    } catch (error) {
      next(error)
    }
  }

  async createBookingRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const bookingRequest = await this.service.createBookingRequest(req.body)
      return res.status(201).json(bookingRequest)
    } catch (e) {
      next(e)
    }
  }
}
