import { BookingRequest, Status } from './entities/booking-requests.entity'
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
  findAllByOwner(userId: number): Promise<BookingRequest[]>
  updateAllByEndDate(
    garageId: number,
    endDate: Date,
    status: Status
  ): Promise<BookingRequest[]>
}

export interface BookingRequestService {
  createBookingRequest(dto: CreateBookingRequestDto): Promise<BookingRequest>
  findAllByUserId(userId: number): Promise<ResponseBookingRequest[]>
  findAllByOwner(userId: number): Promise<BookingRequest[]>
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
  findAllByOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
