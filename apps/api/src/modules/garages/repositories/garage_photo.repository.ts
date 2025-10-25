import { GaragePhoto } from '@garages/entities/garage-photo.entity'
import { GaragePhotoRepository, ICreateGaragePhoto } from '@garages/garage'
import { Repository } from 'typeorm'

export class GaragePhotoRepositoryImpl implements GaragePhotoRepository {
  constructor(private readonly repository: Repository<GaragePhoto>) {}

  async saveGaragePhoto({ url, garage }: ICreateGaragePhoto): Promise<void> {
    await this.repository.save({
      url,
      garage
    })
  }
}
