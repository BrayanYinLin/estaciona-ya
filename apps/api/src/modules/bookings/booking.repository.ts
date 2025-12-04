import { Repository } from 'typeorm'
import { Booking } from './entities/booking.entity'

export interface BookingRepository {
  findAllByGarageId(garageId: number): Promise<Booking[]>
}

export class BookingRepositoryImpl implements BookingRepository {
  constructor(private readonly repository: Repository<Booking>) {}

  async findAllByGarageId(garageId: number): Promise<Booking[]> {
    return this.repository.find({
      where: {
        garage: {
          id: garageId
        }
      }
    })
  }
}
