import { District } from '@locations/entities/district.entity'
import { AppDataSource } from '../data-source'
import { DISTRICTS } from '@shared/constants/districts'

export async function seedDistricts() {
  const districts: District[] = []
  const districtRepository = AppDataSource.getRepository(District)

  for (const item of DISTRICTS) {
    const district = await districtRepository.findOneBy({ name: item })

    if (!district) {
      const newDistrict = await districtRepository.save({
        name: item
      })

      districts.push(newDistrict)
    }
  }

  return districts
}
