import { GaragePhoto } from '@garages/entities/garage-photo.entity'
import {
  GaragePhotoRepository,
  ICreateGaragePhoto,
  IGaragePhoto
} from '@garages/garage'
import { Repository } from 'typeorm'

export class GaragePhotoRepositoryImpl implements GaragePhotoRepository {
  constructor(private readonly repository: Repository<GaragePhoto>) {}

  async findAllByGarageId(garage: number): Promise<IGaragePhoto[]> {
    const photos = await this.repository
      .createQueryBuilder('photo')
      .leftJoin('photo.garage', 'garage')
      .where('garage.id = :garageId', { garageId: garage })
      .select(['photo.id', 'photo.url', 'garage.id'])
      .getMany()

    return photos.map(({ id, garage, url }) => ({
      id,
      url,
      garageId: garage.id
    }))
  }

  async saveGaragePhoto({ url, garage }: ICreateGaragePhoto): Promise<void> {
    await this.repository.save({
      url,
      garage
    })
  }
}
