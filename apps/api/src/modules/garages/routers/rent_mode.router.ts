import { RentModeControllerImpl } from '@garages/controllers/rent_mode.controller'
import { RentMode } from '@garages/entities/rent_modes.entity'
import { RentModeRepositoryImpl } from '@garages/repositories/rent_mode.repository'
import { RentModeServiceImpl } from '@garages/services/rent_mode.service'
import { AppDataSource } from '@shared/database/data-source'
import { Router } from 'express'

const rentModeRouter = Router()

const repository = new RentModeRepositoryImpl(
  AppDataSource.getRepository(RentMode)
)
const service = new RentModeServiceImpl(repository)
const controller = new RentModeControllerImpl(service)

rentModeRouter.get('/', controller.findAll.bind(controller))

export { rentModeRouter }
