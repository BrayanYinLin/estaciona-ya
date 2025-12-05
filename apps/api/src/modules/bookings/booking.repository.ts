import { MoreThanOrEqual, Repository } from 'typeorm'
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
}
