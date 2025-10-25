import { Garage } from '@garages/entities/garage.entity'
import { GarageRepository } from '../garage'
import { CreateGarageFormDto } from '../schemas/create_garage.schema'
import { Repository } from 'typeorm'

export class GarageRepositoryImpl implements GarageRepository {
  constructor(private readonly repository: Repository<Garage>) {}

  async saveGarage(garage: CreateGarageFormDto): Promise<Garage> {
    const savedGarage = await this.repository.save({
      hasCameras: garage.hasCameras,
      covered: garage.covered,
      price: garage.price,
      description: garage.description,
      restrictions: garage.restrictions,
      rentMode: { id: garage.rentMode },
      user: {
        id: garage.user.id
      }
    })

    return savedGarage
  }
}
