import { BookingRequest, Status } from './entities/booking-requests.entity'
import { CreateBookingRequestDto } from './schemas/create_booking_request.schema'
import { Request, Response } from 'express'

export type StatusPayload = 'rejected' | 'accepted'

export interface BookingRequestRepository {
  createBookingRequest(data: Partial<BookingRequest>): Promise<BookingRequest>
  findConlictingBookingRequests(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<BookingRequest[]>
  findAllByUserId(userId: number): Promise<BookingRequest[]>
  findAllByOwner(userId: number): Promise<BookingRequest[]>
  findById(bookingRequestId: number): Promise<BookingRequest | null>
  updateAllByEndDate(
    garageId: number,
    endDate: Date,
    status: Status
  ): Promise<BookingRequest[]>
  update(bookingRequestId: number, status: StatusPayload): Promise<void>
  updatePendingRequests(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<BookingRequest[]>
}

export interface BookingRequestService {
  createBookingRequest(dto: CreateBookingRequestDto): Promise<BookingRequest>
  findAllByUserId(userId: number): Promise<ResponseBookingRequest[]>
  findAllByOwner(userId: number): Promise<BookingRequest[]>
  update(
    bookingRequestId: number,
    userId: number,
    status: StatusPayload
  ): Promise<void>
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
  updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
