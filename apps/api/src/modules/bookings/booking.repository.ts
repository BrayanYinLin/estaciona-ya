import { LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm'
import { Booking } from './entities/booking.entity'
import { BookingRepository } from './booking'

export class BookingRepositoryImpl implements BookingRepository {
  constructor(private readonly repository: Repository<Booking>) {}

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
