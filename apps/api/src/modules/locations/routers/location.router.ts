import { LocationControllerImpl } from '@locations/controllers/location.controller'
import { LocationServiceImpl } from '@locations/services/location.service'
import { Router } from 'express'

const locationRouter = Router()

const locationService = new LocationServiceImpl()
const locationController = new LocationControllerImpl(locationService)

locationRouter.get(
  '/',
  locationController.findLocationByName.bind(locationController)
)

export { locationRouter }
