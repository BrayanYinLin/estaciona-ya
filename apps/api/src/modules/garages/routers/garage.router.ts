import { GarageControllerImpl } from '@garages/controllers/garage.controller'
import { GaragePhoto } from '@garages/entities/garage-photo.entity'
import { Garage } from '@garages/entities/garage.entity'
import { GarageRepositoryImpl } from '@garages/repositories/garage.repository'
import { GaragePhotoRepositoryImpl } from '@garages/repositories/garage_photo.repository'
import { CreateGarageFormSchema } from '@garages/schemas/create_garage.schema'
import { GarageServiceImpl } from '@garages/services/garage.service'
import { Location } from '@locations/entities/locations.entity'
import { LocationRepositoryImpl } from '@locations/repositories/location.repository'
import { AppDataSource } from '@shared/database/data-source'
import { attachPhotos } from '@shared/middlewares/attach_files.middleware'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
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

const service = new GarageServiceImpl(
  garageRepository,
  locationRepository,
  fileStorageService,
  garagePhotoRepository
)

const controller = new GarageControllerImpl(service)

garageRouter.post(
  '/',
  upload.array('photos', 10),
  inyectUserFromToken(),
  attachPhotos(),
  checkSchema(CreateGarageFormSchema),
  controller.saveGarage.bind(controller)
)
export { garageRouter }
