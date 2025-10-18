import { RentModeRepository, RentModeService } from '@garages/rent_mode'
import { RentModeDto } from '@garages/schemas/rent_mode.schema'
import { DomainError } from '@shared/utils/error'

export class RentModeServiceImpl implements RentModeService {
  constructor(private readonly repository: RentModeRepository) {}

  async findById(id: number): Promise<RentModeDto> {
    const rentModes = await this.repository.findById(id)

    if (!rentModes) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'No se encontro la modalidad de renta'
      })
    }

    return rentModes
  }

  async findAll(): Promise<RentModeDto[]> {
    const rentModes = await this.repository.findAll()

    return rentModes
  }
}
