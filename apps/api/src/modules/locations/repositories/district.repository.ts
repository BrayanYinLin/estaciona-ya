import { Repository } from 'typeorm'
import { District } from '../entities/district.entity'
import { AppDataSource } from '@shared/database/data-source'

export class DistrictRepository {
  private Districtrepository: Repository<District>

  constructor() {
    this.Districtrepository = AppDataSource.getRepository(District)
  }

  async findAll(): Promise<District[]> {
    const districts = await this.Districtrepository.find()

    return districts
  }
}
