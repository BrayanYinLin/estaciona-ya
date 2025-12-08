import { LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm'
import { Booking } from './entities/booking.entity'
import { BookingRepository } from './booking'

export class BookingRepositoryImpl implements BookingRepository {
  constructor(private readonly repository: Repository<Booking>) {}

  async findAllByGarageOwner(
    ownerId: number,
    page: number,
    size: number
  ): Promise<Booking[]> {
    const skip = (page - 1) * size

    const bookings = this.repository.find({
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

  async findAllByGarageIdAndMinDate(
    garageId: number,
    minDate: Date
  ): Promise<Booking[]> {
    return this.repository.find({
      where: {
        garage: {
          id: garageId
        },
        startDate: MoreThanOrEqual(minDate)
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
}
