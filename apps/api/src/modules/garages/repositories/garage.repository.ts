import { Garage } from '@garages/entities/garage.entity'
import { GarageRepository, IGarage } from '../garage'
import { CreateGarageFormDto } from '../schemas/create_garage.schema'
import { Repository } from 'typeorm'

export class GarageRepositoryImpl implements GarageRepository {
  constructor(private readonly repository: Repository<Garage>) {}

  async findAllByUserId(userId: number): Promise<IGarage[]> {
    const garages = await this.repository
      .createQueryBuilder('garage')
      .leftJoin('garage.user', 'user')
      .leftJoin('garage.rentMode', 'rentMode')
      .where('user.id = :userId', { userId })
      .select([
        'garage.id',
        'user.id',
        'rentMode.id',
        'garage.price',
        'garage.description',
        'garage.covered',
        'garage.hasCameras',
        'garage.restrictions',
        'garage.state',
        'garage.createdAt',
        'garage.updatedAt'
      ])
      .getMany()

    return garages.map(
      ({
        id,
        user,
        rentMode,
        price,
        description,
        covered,
        hasCameras,
        restrictions,
        state,
        createdAt,
        updatedAt
      }) => ({
        id,
        ownerId: user.id,
        rentModeId: rentMode.id,
        price,
        description,
        covered,
        hasCameras,
        restrictions,
        state,
        createdAt,
        updatedAt
      })
    )
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
