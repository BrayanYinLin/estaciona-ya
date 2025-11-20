import { AppDataSource } from '@shared/database/data-source'
import { BookingRequest } from '../entities/booking-requests.entity'
import { User } from '@users/entities/user.entity'

export class BrayanRepository {
  private readonly repository = AppDataSource.getRepository(BookingRequest)

  async findAllByUserId(userId: User['id']): Promise<BookingRequest[]> {
    return this.repository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['garage', 'user', 'garage.location']
    })
  }
}
