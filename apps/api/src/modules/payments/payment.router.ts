import { BookingRepositoryImpl } from '@bookings/booking.repository'
import { Booking } from '@bookings/entities/booking.entity'
import { AppDataSource } from '@shared/database/data-source'
import { Router } from 'express'
import { PaymentServiceImpl } from './payment.service'
import { PaymentControllerImpl } from './payment.controller'
import { logPostBody } from '@shared/utils/log_body.utils'
import { PaymentCreatedSchema } from './schemas/payment_created.schema'
import { softCheckSchema } from './middlewares/soft_check_schema.middleware'

const bookingRepository = new BookingRepositoryImpl(
  AppDataSource.getRepository(Booking)
)
const paymentService = new PaymentServiceImpl(bookingRepository)
const controller = new PaymentControllerImpl(paymentService)
const paymentRouter = Router()

paymentRouter.post('/', logPostBody(), controller.makePayment.bind(controller))
paymentRouter.post(
  '/webhook',
  softCheckSchema(PaymentCreatedSchema),
  logPostBody(),
  controller.verifyPayment.bind(controller)
)

export { paymentRouter }
