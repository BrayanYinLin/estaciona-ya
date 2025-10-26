import {
  GaragePhotoRepository,
  GarageRepository,
  GarageService
} from '@garages/garage'
import { RentModeRepository } from '@garages/rent_mode'
import { CreateGarageFormDto } from '@garages/schemas/create_garage.schema'
import { ResponseGarageDto } from '@garages/schemas/response_garage.schema'
import { LocationRepository } from '@locations/location'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { FileStorageService } from '@shared/services/file-storage'
import { DomainError } from '@shared/utils/error'
import { randomUUID } from 'node:crypto'

export class GarageServiceImpl implements GarageService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly locationRepository: LocationRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly garagePhotoRepository: GaragePhotoRepository,
    private readonly rentModeRepository: RentModeRepository
  ) {}

  async findPhoto(id: string): Promise<string> {
    return await this.fileStorageService.sendPhotoPath(id)
  }

  async findAllByUserId(user: number): Promise<ResponseGarageDto[]> {
    const response: ResponseGarageDto[] = []
    const garages = await this.garageRepository.findAllByUserId(user)

    for await (const garage of garages) {
      const rentMode = await this.rentModeRepository.findById(garage.rentModeId)
      const photos = await this.garagePhotoRepository.findAllByGarageId(
        garage.id
      )
      const location = await this.locationRepository.findLocationByGarageId(
        garage.id
      )

      if (!rentMode) {
        throw new DomainError({
          code: 'ENTITY_NOT_FOUND',
          message: 'Modalidad de renta no encontrada'
        })
      }

      if (!location) {
        throw new DomainError({
          code: 'ENTITY_NOT_FOUND',
          message: 'Ubicación no encontrada'
        })
      }

      response.push({
        ...garage,
        photos,
        rentMode,
        location
      })
    }

    return response
  }

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
