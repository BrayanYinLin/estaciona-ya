import { Request, Response } from 'express'
import { Booking } from './entities/booking.entity'

export interface BookingRepository {
  findAllByGarageIdAndMinDate(
    garageId: number,
    minDate: Date
  ): Promise<Booking[]>
  findConlictingBooking(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]>
  findAllByGarageOwner(
    ownerId: number,
    page: number,
    size: number
  ): Promise<Booking[]>
}

export interface BookingService {
  findAllByGarageOwner(
    ownerId: number,
    page: number,
    size: number
  ): Promise<Booking[]>
}

export interface BookingController {
  findAllByGarageOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
