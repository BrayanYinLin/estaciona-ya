import { BookingRequestRepository } from '@booking_requests/booking-request'
import { BookingRepository } from '@bookings/booking'
import {
  Filters,
  GaragePhotoRepository,
  GarageRepository,
  GarageService
} from '@garages/garage'
import { CreateGarageFormDto } from '@garages/schemas/create_garage.schema'
import {
  ResponseGarageDto,
  ResponseGarageSchema,
  ResponseGarageByIdDto,
  ResponseGarageSchemaById
} from '@garages/schemas/response_garage.schema'
import { LocationRepository } from '@locations/location'
import { ENDPOINTS } from '@shared/constants/endpoints'
import { FileStorageService } from '@shared/services/file-storage'
import { notificationEmitter, UserTarget } from '@shared/sockets/notify_event'
import { DomainError } from '@shared/utils/error'
import { randomUUID } from 'node:crypto'
import { prettifyError } from 'zod'

export class GarageServiceImpl implements GarageService {
  constructor(
    private readonly garageRepository: GarageRepository,
    private readonly locationRepository: LocationRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly garagePhotoRepository: GaragePhotoRepository,
    private readonly bookingRepository: BookingRepository,
    private readonly bookingRequestRepository: BookingRequestRepository
  ) {}

  async findAll({
    page,
    size,
    covered,
    hasCameras,
    mode,
    district,
    minPrice,
    maxPrice
  }: Filters): Promise<ResponseGarageDto[]> {
    const garages = await this.garageRepository.findAll({
      page,
      size,
      covered,
      hasCameras,
      mode,
      district,
      minPrice,
      maxPrice
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

  async findAllByUserId(
    user: number,
    page: number = 1,
    size: number = 20
  ): Promise<ResponseGarageDto[]> {
    const garages = await this.garageRepository.findAllByUserId(
      user,
      page,
      size
    )

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
  async findGarageById(garageId: number): Promise<ResponseGarageByIdDto> {
    const garage = await this.garageRepository.findGarageById(garageId)

    if (!garage) {
      throw new DomainError({
        code: 'VALIDATION_ERROR',
        message: `Garage with id ${garageId} not found`
      })
    }

    const { success, data, error } = ResponseGarageSchemaById.safeParse(garage)

    if (!success || error) {
      throw new DomainError({
        code: 'VALIDATION_ERROR',
        message: prettifyError(error)
      })
    }

    return data
  }

  async disableGarage(garageId: number, userId: number): Promise<void> {
    const garage = await this.garageRepository.findGarageById(garageId)

    if (!garage) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'Estacionamiento no encontrado.'
      })
    }

    if (garage.user.id !== userId) {
      throw new DomainError({
        code: 'CONFLICT',
        message: 'Este estacionamiento no te pertenece.'
      })
    }

    const bookings = await this.bookingRepository.findAllByGarageIdAndMinDate(
      garageId,
      new Date(Date.now())
    )

    if (bookings.length > 0) {
      throw new DomainError({
        code: 'CONFLICT',
        message:
          'No puedes deshabilitar este estacionamiento. Tienes reservas pendientes.'
      })
    }

    const updated = await this.bookingRequestRepository.updateAllByEndDate(
      garageId,
      new Date(Date.now()),
      'rejected'
    )

    const reasonMapped: UserTarget[] = updated.map((request) => ({
      id: String(request.user.id),
      message:
        'Solicitud rechazada. El arrendador ha deshabilitado su estacionamiento.'
    }))

    notificationEmitter.emit('notify', reasonMapped)

    await this.garageRepository.disableGarage(garageId)
  }
}
