import { Router } from 'express'
import { BrayanRepository } from '../repositories/brayan.repository'
import { BrayanService } from '../services/brayan.service'
import { BrayanController } from '../controller/brayan.controller'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'

const brayanRepository = new BrayanRepository()
const brayanService = new BrayanService(brayanRepository)
const brayanController = new BrayanController(brayanService)

const brayanRouter = Router()

brayanRouter.get(
  '/by-user',
  inyectUserFromToken(),
  brayanController.findAllByUserId.bind(brayanController)
)

export default brayanRouter
