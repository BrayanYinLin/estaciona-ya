import { RentMode } from '@garages/entities/rent_modes.entity'
import { AppDataSource } from '../data-source'
import { RENT_MODES } from '@shared/constants/rent_modes'

export async function seedRentModes() {
  const rentModeRepository = AppDataSource.getRepository(RentMode)

  for (const item of Object.values(RENT_MODES)) {
    const role = await rentModeRepository.findOneBy({ mode_name: item })

    if (!role) {
      await rentModeRepository.save({
        mode_name: item
      })
    }
  }
}
