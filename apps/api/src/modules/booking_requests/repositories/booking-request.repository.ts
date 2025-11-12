import { BookingRequest } from '@booking_requests/entities/booking-requests.entity'
import { Repository, MoreThan, LessThan, In } from 'typeorm'
import { CreateBookingRequestDto } from '../schemas/create_booking_request.shcema'

export class createBookingRequestRepository {
  constructor(
    private readonly bookingRequestRepository: Repository<BookingRequest>
  ) {}

  async createBookingRequest(
    data: CreateBookingRequestDto
  ): Promise<BookingRequest> {
    const bookingRequest = this.bookingRequestRepository.create({
      garage: { id: data.garageId },
      user: { id: data.tenantId },
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'pending'
    })
    return await this.bookingRequestRepository.save(bookingRequest)
  }

  async findConlictingBookingRequests(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<BookingRequest[]> {
    return await this.bookingRequestRepository.find({
      where: {
        garage: { id: garageId },
        status: In(['pending', 'accepted']),
        startDate: LessThan(endDate),
        endDate: MoreThan(startDate)
      }
    })
  }
}
