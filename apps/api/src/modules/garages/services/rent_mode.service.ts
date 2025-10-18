import { RentModeRepository, RentModeService } from '@garages/rent_mode'
import { RentModeDto } from '@garages/schemas/rent_mode.schema'

export class RentModeServiceImpl implements RentModeService {
  constructor(private readonly repository: RentModeRepository) {}

  async findAll(): Promise<RentModeDto[]> {
    const rentModes = await this.repository.findAll()

    return rentModes
  }
}
