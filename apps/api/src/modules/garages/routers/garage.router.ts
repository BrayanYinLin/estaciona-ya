import { GarageControllerImpl } from '@garages/controllers/garage.controller'
import { CreateGarageSchema } from '@garages/schemas/create_garage.schema'
import { checkSchema } from '@shared/middlewares/check-schema.middleware'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { upload } from '@shared/middlewares/uploader.middleware'
import { Router } from 'express'

const garageRouter = Router()

const controller = new GarageControllerImpl()

garageRouter.post(
  '/',
  upload.array('photos', 10),
  inyectUserFromToken(),

  checkSchema(CreateGarageSchema),
  controller.saveGarage.bind(controller)
)
export { garageRouter }
