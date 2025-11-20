import { BookingRequest } from './entities/booking-requests.entity'
import { CreateBookingRequestDto } from './schemas/create_booking_request.schema'
import { Request, Response } from 'express'

export interface BookingRequestRepository {
  createBookingRequest(data: CreateBookingRequestDto): Promise<BookingRequest>
  findConlictingBookingRequests(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<BookingRequest[]>
  findAllByUserId(userId: number): Promise<BookingRequest[]>
}

export interface BookingRequestService {
  createBookingRequest(dto: CreateBookingRequestDto): Promise<BookingRequest>
  findAllByUserId(userId: number): Promise<ResponseBookingRequest[]>
}

export interface BookingRequestController {
  createBookingRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  findAllByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
