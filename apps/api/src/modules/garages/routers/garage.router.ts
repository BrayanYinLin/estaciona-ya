import { BookingRequest } from '@booking_requests/entities/booking-requests.entity'
import { BookingRequestRepositoryImpl } from '@booking_requests/repositories/booking-request.repository'
import { BookingRepositoryImpl } from '@bookings/booking.repository'
import { Booking } from '@bookings/entities/booking.entity'
import { GarageControllerImpl } from '@garages/controllers/garage.controller'
import { GaragePhoto } from '@garages/entities/garage-photo.entity'
import { Garage } from '@garages/entities/garage.entity'
import { injectUser } from '@garages/middlewares/inject_user.middleware'
import { GarageRepositoryImpl } from '@garages/repositories/garage.repository'
import { GaragePhotoRepositoryImpl } from '@garages/repositories/garage_photo.repository'
import { CreateGarageFormSchema } from '@garages/schemas/create_garage.schema'
import { GarageServiceImpl } from '@garages/services/garage.service'
import { Location } from '@locations/entities/locations.entity'
import { LocationRepositoryImpl } from '@locations/repositories/location.repository'
import { AppDataSource } from '@shared/database/data-source'
import { attachPhotos } from '@shared/middlewares/attach_files.middleware'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { checkStatus } from '@shared/middlewares/check_status.middleware'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { upload } from '@shared/middlewares/uploader.middleware'
import { LocalFileStorageService } from '@shared/services/local-file-storage.service'
import { Router } from 'express'

const garageRouter = Router()

const garageRepository = new GarageRepositoryImpl(
  AppDataSource.getRepository(Garage)
)
const locationRepository = new LocationRepositoryImpl(
  AppDataSource.getRepository(Location)
)
const fileStorageService = new LocalFileStorageService()
const garagePhotoRepository = new GaragePhotoRepositoryImpl(
  AppDataSource.getRepository(GaragePhoto)
)

const bookingRepository = new BookingRepositoryImpl(
  AppDataSource.getRepository(Booking)
)

const bookingRequestRepository = new BookingRequestRepositoryImpl(
  AppDataSource.getRepository(BookingRequest)
)

const service = new GarageServiceImpl(
  garageRepository,
  locationRepository,
  fileStorageService,
  garagePhotoRepository,
  bookingRepository,
  bookingRequestRepository
)

const controller = new GarageControllerImpl(service)

garageRouter.get(
  '/me',
  checkStatus(),
  injectUser(),
  controller.findAllByUserId.bind(controller)
)
garageRouter.get('/:id/photos/:photoId', controller.findPhoto.bind(controller))
garageRouter.get('/:id', controller.findGarageById.bind(controller))
garageRouter.post(
  '/',
  checkStatus(),
  upload.array('photos', 10),
  inyectUserFromToken(),
  attachPhotos(),
  checkSchema(CreateGarageFormSchema),
  controller.saveGarage.bind(controller)
)
garageRouter.get('/', controller.findAll.bind(controller))

garageRouter.delete(
  '/:id',
  inyectUserFromToken(),
  controller.disableGarage.bind(controller)
)

export { garageRouter }
