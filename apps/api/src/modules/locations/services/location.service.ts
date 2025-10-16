import { LocationService } from '@locations/location'
import {
  OpenStreetMapResponseSchema,
  ResponseThirdPartyLocationDto
} from '@locations/schemas/response_location.schema'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { OPEN_STREET_MAP_ENDPOINTS } from '@shared/constants/maps.endpoint'
import { DomainError } from '@shared/utils/error'
import z from 'zod'

export class LocationServiceImpl implements LocationService {
  async findLocationByName(
    name: string
  ): Promise<ResponseThirdPartyLocationDto> {
    const response = await fetch(OPEN_STREET_MAP_ENDPOINTS.concat(name))
    const result = await response.json()

    const { data, success, error } = z
      .array(OpenStreetMapResponseSchema)
      .safeParse(result)

    if (!success || error) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INTERNAL_ERROR.code,
        message: 'OpenStreetMap error'
      })
    }

    if (data.length === 0) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'Ubicacion no hallada'
      })
    }

    const [firstResult] = data

    return {
      address: firstResult.display_name,
      latitude: firstResult.lat,
      longitude: firstResult.lon
    }
  }
}
