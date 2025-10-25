import {
  GaragePhotoRepository,
  GarageRepository,
  GarageService
} from '@garages/garage'
import { CreateGarageFormDto } from '@garages/schemas/create_garage.schema'
import { LocationRepository } from '@locations/location'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { FileStorageService } from '@shared/services/file-storage'
import { randomUUID } from 'node:crypto'

export class GarageServiceImpl implements GarageService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly locationRepository: LocationRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly garagePhotoRepository: GaragePhotoRepository
  ) {}

  async saveGarage({
    price,
    description,
    restrictions,
    covered,
    hasCameras,
    user,
    rentMode,
    address,
    latitude,
    longitude,
    district,
    photos
  }: CreateGarageFormDto): Promise<void> {
    const garageCreated = await this.garageRepository.saveGarage({
      price,
      description,
      restrictions,
      covered,
      hasCameras,
      user: { id: user.id },
      rentMode
    })

    await this.locationRepository.saveLocation({
      address,
      latitude,
      longitude,
      district,
      garage: garageCreated.id
    })

    const urls = await Promise.all(
      photos.map((photo) => {
        const saveName = randomUUID()

        return this.fileStorageService.save({
          buffer: photo.buffer,
          originalname: photo.originalname,
          saveName,
          url: ENDPOINTS.GARAGES.concat(garageCreated.id.toString(), '/photos/')
        })
      })
    )

    await Promise.all(
      urls.map((url) => {
        return this.garagePhotoRepository.saveGaragePhoto({
          url,
          garage: {
            id: garageCreated.id
          }
        })
      })
    )
  }
}
