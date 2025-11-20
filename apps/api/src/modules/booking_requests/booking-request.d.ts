import { CreateBookingRequestDto } from './schemas/create_booking_request.schema'
import { Request, Response } from 'express'

export interface BookingRequestService {
  createBookingRequest(dto: CreateBookingRequestDto): Promise<BookingRequest>
}

export interface BookingRequestController {
  createBookingRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
