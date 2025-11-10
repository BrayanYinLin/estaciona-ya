import {
  Filters,
  GaragePhotoRepository,
  GarageRepository,
  GarageService
} from '@garages/garage'
import { CreateGarageFormDto } from '@garages/schemas/create_garage.schema'
import {
  ResponseGarageDto,
  ResponseGarageSchema
} from '@garages/schemas/response_garage.schema'
import { LocationRepository } from '@locations/location'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { FileStorageService } from '@shared/services/file-storage'
import { DomainError } from '@shared/utils/error'
import { randomUUID } from 'node:crypto'
import { prettifyError } from 'zod'

export class GarageServiceImpl implements GarageService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly locationRepository: LocationRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly garagePhotoRepository: GaragePhotoRepository
  ) {}

  async findAll({
    page,
    size,
    covered,
    hasCameras,
    mode
  }: Filters): Promise<ResponseGarageDto[]> {
    const garages = await this.garageRepository.findAll({
      page,
      size,
      covered,
      hasCameras,
      mode
    })

    return garages.map((garage) => {
      const { success, data, error } = ResponseGarageSchema.safeParse(garage)

      if (!success || error) {
        throw new DomainError({
          code: 'VALIDATION_ERROR',
          message: prettifyError(error)
        })
      }

      return data
    })
  }

  async findPhoto(id: string): Promise<string> {
    return await this.fileStorageService.sendPhotoPath(id)
  }

  async findAllByUserId(user: number): Promise<ResponseGarageDto[]> {
    const garages = await this.garageRepository.findAllByUserId(user)

    return garages.map((garage) => {
      const { success, data, error } = ResponseGarageSchema.safeParse(garage)

      if (!success || error) {
        throw new DomainError({
          code: 'VALIDATION_ERROR',
          message: prettifyError(error)
        })
      }

      return data
    })
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
