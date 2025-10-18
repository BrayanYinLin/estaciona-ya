import { GarageRepository } from '../garage'
import { CreateGarageDto } from '../schemas/create_garage.schema'

export class GarageRepositoryImpl implements GarageRepository {
  async saveGarage(garage: CreateGarageDto): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
