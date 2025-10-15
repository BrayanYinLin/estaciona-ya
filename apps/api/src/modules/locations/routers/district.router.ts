import express from 'express'
import { DistrictController } from '@locations/controllers/district.controller'

const districtRouter = express.Router()

districtRouter.get('/', new DistrictController().getAll)

export default districtRouter
