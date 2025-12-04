import { BookingRequest } from '@booking_requests/entities/booking-requests.entity'
import { Repository, MoreThan, LessThan, In } from 'typeorm'
import { CreateBookingRequestDto } from '../schemas/create_booking_request.shcema'
import { BookingRequestRepository } from '@booking_requests/booking-request'

export class BookingRequestRepositoryImpl implements BookingRequestRepository {
  constructor(
    private readonly bookingRequestRepository: Repository<BookingRequest>
  ) {}

  async findAllByOwner(userId: number): Promise<BookingRequest[]> {
    const requests = this.bookingRequestRepository.find({
      where: {
        garage: {
          user: {
            id: userId
          }
        }
      },
      relations: ['garage', 'user']
    })

    console.log('[Repository] ', requests)

    return requests
  }

  async findAllByUserId(userId: number): Promise<BookingRequest[]> {
    return this.bookingRequestRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['garage', 'user', 'garage.location', 'garage.photos']
    })
  }

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
