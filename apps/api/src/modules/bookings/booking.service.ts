import { BookingRepository, BookingService } from './booking'
import { Booking } from './entities/booking.entity'

export class BookingServiceImpl implements BookingService {
  constructor(private readonly repository: BookingRepository) {}

  async findAllByGarageOwner(
    ownerId: number,
    page: number,
    size: number
  ): Promise<Booking[]> {
    return await this.repository.findAllByGarageOwner(ownerId, page, size)
  }
}
