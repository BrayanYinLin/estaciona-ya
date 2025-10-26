import { CreateLocationDto } from '@garages/schemas/create_garage.schema'
import { LocationRepository } from '@locations/location'
import { Repository } from 'typeorm'
import { Location } from '@locations/entities/locations.entity'

export class LocationRepositoryImpl implements LocationRepository {
  constructor(private readonly repository: Repository<Location>) {}

  async findLocationByGarageId(garage: number): Promise<Location | null> {
    const location = await this.repository.findOne({
      where: {
        garage: {
          id: garage
        }
      },
      relations: {
        district: true
      }
    })

    return location
  }

  async saveLocation(location: CreateLocationDto): Promise<Location> {
    const savedLocation = await this.repository.save({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
      garage: { id: location.garage },
      district: { id: location.district }
    })
    return savedLocation
  }
}
