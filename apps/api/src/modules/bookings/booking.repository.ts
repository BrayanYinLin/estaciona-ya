import { In, LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm'
import { Booking, BookingStatus } from './entities/booking.entity'
import { BookingRepository } from './booking'
import { DomainError } from '@shared/utils/error'

export class BookingRepositoryImpl implements BookingRepository {
  constructor(private readonly repository: Repository<Booking>) {}

  async updateStatus(bookingId: number, status: BookingStatus): Promise<void> {
    const booking = await this.repository.findOne({
      where: {
        id: bookingId
      }
    })

    if (!booking) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'Booking not found.'
      })
    }

    booking.status = status
    await this.repository.save(booking)
  }

  async findAllByTenant(
    userId: number,
    page: number,
    size: number
  ): Promise<Booking[]> {
    const skip = (page - 1) * size

    const bookings = await this.repository.find({
      where: {
        user: {
          id: userId
        }
      },
      skip,
      take: size,
      relations: ['garage', 'user']
    })

    return bookings
  }

  async findAllByGarageOwner(
    ownerId: number,
    page: number,
    size: number
  ): Promise<Booking[]> {
    const skip = (page - 1) * size

    const bookings = await this.repository.find({
      where: {
        garage: {
          user: {
            id: ownerId
          }
        }
      },
      skip,
      take: size,
      relations: ['user', 'garage']
    })

    return bookings
  }

  async findAllByGarageIdAndMinDateAndStatus(
    garageId: number,
    minDate: Date,
    status: BookingStatus[]
  ): Promise<Booking[]> {
    return this.repository.find({
      where: {
        garage: {
          id: garageId
        },
        startDate: MoreThanOrEqual(minDate),
        status: In(status)
      }
    })
  }

  async findConlictingBooking(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]> {
    return await this.repository.find({
      where: {
        garage: { id: garageId },
        startDate: LessThan(endDate),
        endDate: MoreThan(startDate)
      }
    })
  }

  async create(booking: Partial<Booking>): Promise<void> {
    await this.repository.save({
      user: {
        id: booking.user!.id
      },
      garage: {
        id: booking.garage!.id
      },
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: BookingStatus.PENDING_PAYMENT,
      total: booking.total
    })
  }
}
