import { DistrictRepositoryImpl } from '../repositories/district.repository'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { DistrictDto } from '@locations/schemas/district.schema'
import { DistrictService } from '@locations/district'

export class DistrictServiceImpl implements DistrictService {
  constructor(private districtRepository: DistrictRepositoryImpl) {}

  async findById(id: number): Promise<DistrictDto> {
    const rentMode = await this.districtRepository.findById(id)

    if (!rentMode) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'Distrito no encontrado'
      })
    }

    return rentMode
  }

  async getAll(): Promise<DistrictDto[]> {
    const districts = await this.districtRepository.findAll()

    if (districts.length === 0) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'No hay distritos registrados. Comuniquese con soporte.'
      })
    }

    return districts
  }
}
