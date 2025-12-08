import {
  BookingRequest,
  Status
} from '@booking_requests/entities/booking-requests.entity'
import {
  Repository,
  MoreThan,
  LessThan,
  In,
  MoreThanOrEqual,
  LessThanOrEqual
} from 'typeorm'
import {
  BookingRequestRepository,
  StatusPayload
} from '@booking_requests/booking-request'
import { DomainError } from '@shared/utils/error'

export class BookingRequestRepositoryImpl implements BookingRequestRepository {
  constructor(
    private readonly bookingRequestRepository: Repository<BookingRequest>
  ) {}

  async updatePendingRequests(
    garageId: number,
    startDate: Date,
    endDate: Date
  ) {
    const pendingRequests = await this.bookingRequestRepository.find({
      where: {
        garage: { id: garageId },
        status: 'pending',
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate)
      },
      relations: ['garage', 'user']
    })

    pendingRequests.forEach((req) => {
      req.status = 'rejected'
    })

    const updated = await this.bookingRequestRepository.save(pendingRequests)

    return updated
  }

  async findById(bookingRequestId: number): Promise<BookingRequest | null> {
    const bookingRequest = await this.bookingRequestRepository.findOne({
      where: {
        id: bookingRequestId
      },
      relations: ['garage', 'garage.user']
    })

    return bookingRequest
  }

  async update(bookingRequestId: number, status: StatusPayload): Promise<void> {
    const bookingRequest = await this.bookingRequestRepository.findOneBy({
      id: bookingRequestId
    })

    if (!bookingRequest) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'Booking request not found.'
      })
    }

    bookingRequest.status = status
    await this.bookingRequestRepository.save(bookingRequest)
  }

  async updateAllByEndDate(
    garageId: number,
    endDate: Date,
    status: Status
  ): Promise<BookingRequest[]> {
    const requests = await this.bookingRequestRepository.find({
      where: [
        { startDate: MoreThanOrEqual(endDate), garage: { id: garageId } },
        { endDate: MoreThanOrEqual(endDate), garage: { id: garageId } }
      ],
      relations: {
        user: true
      }
    })

    const rejected = requests.map((request) => ({
      ...request,
      status: status
    }))

    return await this.bookingRequestRepository.save(rejected)
  }

  async findAllByOwner(userId: number): Promise<BookingRequest[]> {
    const requests = await this.bookingRequestRepository.find({
      where: {
        garage: {
          user: {
            id: userId
          }
        }
      },
      relations: ['garage', 'user', 'garage.photos', 'garage.rentMode']
    })

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
    data: Partial<BookingRequest>
  ): Promise<BookingRequest> {
    const bookingRequest = this.bookingRequestRepository.create(data)
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
      },
      relations: ['garage', 'garage.user']
    })
  }
}
