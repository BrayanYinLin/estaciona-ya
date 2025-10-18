import express from 'express'
import { DistrictControllerImpl } from '@locations/controllers/district.controller'
import { DistrictServiceImpl } from '@locations/services/district.service'
import { DistrictRepositoryImpl } from '@locations/repositories/district.repository'
import { AppDataSource } from '@shared/database/data-source'
import { District } from '@locations/entities/district.entity'

const districtRouter = express.Router()

const repository = new DistrictRepositoryImpl(
  AppDataSource.getRepository(District)
)
const service = new DistrictServiceImpl(repository)
const controller = new DistrictControllerImpl(service)

districtRouter.get('/', controller.getAll.bind(controller))

export default districtRouter
