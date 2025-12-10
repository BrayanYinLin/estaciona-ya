import { BookingRepositoryImpl } from '@bookings/booking.repository'
import { Booking } from '@bookings/entities/booking.entity'
import { AppDataSource } from '@shared/database/data-source'
import { Router } from 'express'
import { PaymentServiceImpl } from './payment.service'
import { PaymentControllerImpl } from './payment.controller'

const bookingRepository = new BookingRepositoryImpl(
  AppDataSource.getRepository(Booking)
)
const paymentService = new PaymentServiceImpl(bookingRepository)
const controller = new PaymentControllerImpl(paymentService)
const paymentRouter = Router()

paymentRouter.post('/', controller.makePayment.bind(controller))

export { paymentRouter }
