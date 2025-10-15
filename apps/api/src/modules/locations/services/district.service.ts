import { DistrictRepository } from '../repositories/district.repository'
import { District } from '../entities/district.entity'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'

export class DistrictService {
  private districtRepository: DistrictRepository

  constructor() {
    this.districtRepository = new DistrictRepository()
  }

  async getAll(): Promise<District[]> {
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
