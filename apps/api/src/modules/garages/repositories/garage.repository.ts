import { Garage } from '@garages/entities/garage.entity'
import { Filters, GarageRepository } from '../garage'
import { CreateGarageFormDto } from '../schemas/create_garage.schema'
import { FindOptionsWhere, Repository } from 'typeorm'

export class GarageRepositoryImpl implements GarageRepository {
  constructor(private readonly repository: Repository<Garage>) {}

  async findAll({
    page,
    size,
    covered,
    hasCameras,
    mode
  }: Filters): Promise<Garage[]> {
    const skip = (page - 1) * size

    const where: FindOptionsWhere<Garage> = {}
    if (covered !== undefined) {
      where.covered = covered
    }

    if (hasCameras !== undefined) {
      where.hasCameras = hasCameras
    }

    if (mode !== undefined) {
      where.rentMode = {
        mode_name: mode
      }
    }

    const garages = await this.repository.find({
      skip,
      take: size,
      order: {
        id: 'ASC'
      },
      where,
      relations: ['location', 'rentMode', 'photos', 'location.district']
    })

    return garages
  }

  async findAllByUserId(userId: number): Promise<Garage[]> {
    const garages = await this.repository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: [
        'user',
        'rentMode',
        'bookingRequests',
        'location',
        'photos',
        'location.district'
      ]
    })

    return garages
  }

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
