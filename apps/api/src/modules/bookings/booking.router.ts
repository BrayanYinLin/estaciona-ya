import { Router } from 'express'
import { BookingRepositoryImpl } from './booking.repository'
import { AppDataSource } from '@shared/database/data-source'
import { Booking } from './entities/booking.entity'
import { BookingServiceImpl } from './booking.service'
import { BookingControllerImpl } from './booking.controller'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'

const bookingRouter = Router()

const bookingRepository = new BookingRepositoryImpl(
  AppDataSource.getRepository(Booking)
)

const bookingService = new BookingServiceImpl(bookingRepository)

const controller = new BookingControllerImpl(bookingService)

bookingRouter.get(
  '/',
  inyectUserFromToken(),
  controller.findAllByGarageOwner.bind(controller)
)

export { bookingRouter }
