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

    for (let index = 0; index < 400; index++) {
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

      const photos = [
        'https://fastly.picsum.photos/id/999/1920/1080.jpg?hmac=UVOnR6VRpGMfprI8-QKg-U5-bXE1E09oj0wz6D1CvFU',
        'https://fastly.picsum.photos/id/144/1920/1080.jpg?hmac=RZKNvvTTTWx2vXwkq-l5CwauwMp3AkcLptJ8IDoAUlM',
        'https://fastly.picsum.photos/id/82/1920/1080.jpg?hmac=ZAfXGM7sh8e1k6vz_P4yBAQ2tqluOjDfagtiEXVZIwo',
        'https://fastly.picsum.photos/id/1013/1920/1080.jpg?hmac=ZJf9HqrLLv2hOMaQYbxNrcEqzuHEhETtQ_OiQRL4N-U',
        'https://fastly.picsum.photos/id/376/1920/1080.jpg?hmac=yedc3mmYvOifg1_SB2GlPCHz0MCYFnGuizz4meRn9bU'
      ]
      for (let index = 0; index < 5; index++) {
        await photosRepository.save({
          url: photos[index],
          garage: savedGarage
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
