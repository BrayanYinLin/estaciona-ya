import { RentMode } from '@garages/entities/rent_modes.entity'
import { RentModeRepository } from '@garages/rent_mode'
import { RentModeDto } from '@garages/schemas/rent_mode.schema'
import { Repository } from 'typeorm'

export class RentModeRepositoryImpl implements RentModeRepository {
  constructor(private readonly repository: Repository<RentMode>) {}

  async findAll(): Promise<RentModeDto[]> {
    const rentModes = await this.repository.find()

    return rentModes
  }
}
