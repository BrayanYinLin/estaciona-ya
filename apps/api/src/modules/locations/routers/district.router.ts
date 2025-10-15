import express from 'express'
import { DistrictController } from '@locations/controllers/district.controller'
import { DistrictService } from '@locations/services/district.service'

const districtRouter = express.Router()

const service = new DistrictService()
const controller = new DistrictController(service)

districtRouter.get('/', controller.getAll.bind(controller))

export default districtRouter
