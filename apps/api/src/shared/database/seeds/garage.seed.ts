import { User } from '@users/entities/user.entity'
import { AppDataSource } from '../data-source'
import { Garage } from '@garages/entities/garage.entity'
import { RentMode } from '@garages/entities/rent_modes.entity'
import { faker, fakerES } from '@faker-js/faker'
import { Location } from '@locations/entities/locations.entity'
import { District } from '@locations/entities/district.entity'
import { GaragePhoto } from '@garages/entities/garage-photo.entity'

export async function seedGarage(
  user: User,
  modes: RentMode[],
  districts: District[]
) {
  try {
    const repository = AppDataSource.getRepository(Garage)
    const locationRepository = AppDataSource.getRepository(Location)
    const photosRepository = AppDataSource.getRepository(GaragePhoto)

    for (let index = 0; index < 40; index++) {
      const savedGarage = await repository.save({
        hasCameras: Boolean(fakerES.number.int({ min: 0, max: 1 })),
        covered: Boolean(fakerES.number.int({ min: 0, max: 1 })),
        price: faker.number.float({ max: 999 }),
        description: fakerES.commerce.productDescription(),
        restrictions: fakerES.commerce.productDescription(),
        rentMode: modes[faker.number.int({ min: 0, max: modes.length - 1 })],
        user: user
      })

      await locationRepository.save({
        address: fakerES.location.streetAddress({ useFullAddress: true }),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.latitude().toString(),
        district:
          districts[faker.number.int({ min: 0, max: districts.length - 1 })],
        garage: savedGarage
      })

      for (let index = 0; index < 5; index++) {
        await photosRepository.save({
          url: 'https://picsum.photos/1920/1080',
          garage: savedGarage
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
