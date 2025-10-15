import { District } from '@locations/entities/district.entity'
import { AppDataSource } from '../data-source'
import { DISTRICTS } from '@shared/constants/districts'

export async function seedDistricts() {
  const districtRepository = AppDataSource.getRepository(District)

  for (const item of DISTRICTS) {
    const district = await districtRepository.findOneBy({ name: item })

    if (!district) {
      await districtRepository.save({
        name: item
      })
    }
  }
}
