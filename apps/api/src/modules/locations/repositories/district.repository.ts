import { Repository } from 'typeorm'
import { District } from '../entities/district.entity'
import { DistrictDto } from '@locations/schemas/district.schema'
import { DistrictRepository } from '@locations/district'

export class DistrictRepositoryImpl implements DistrictRepository {
  constructor(private readonly repository: Repository<District>) {}

  async findById(id: number): Promise<DistrictDto | null> {
    const rentMode = await this.repository.findOneBy({ id })
    return rentMode
  }

  async findAll(): Promise<DistrictDto[]> {
    const districts = await this.repository.find()

    return districts
  }
}
