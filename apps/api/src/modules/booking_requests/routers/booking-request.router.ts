import { BookingRequestControllerImpl } from '../controller/booking_request.controller'
import { BookingRequestServiceImpl } from '../services/booking_request.service'
import { BookingRequestRepositoryImpl } from '../repositories/booking-request.repository'
import { AppDataSource } from '@shared/database/data-source'
import { User } from '@users/entities/user.entity'
import { Garage } from '@garages/entities/garage.entity'
import { BookingRequest } from '../entities/booking-requests.entity'
import { Router } from 'express'
import { injectTenant } from '@booking_requests/middleware/inject_tenant.middleware'
import { logPostBody } from '@shared/utils/log_body.utils'
import { inyectUserFromToken } from '@shared/middlewares/inyect-user-from-token.middleware'
import { BookingRepositoryImpl } from '@bookings/booking.repository'
import { Booking } from '@bookings/entities/booking.entity'

const userRepo = AppDataSource.getRepository(User)
const garageRepo = AppDataSource.getRepository(Garage)
const bookingRequestTypeOrmRepo = AppDataSource.getRepository(BookingRequest)

const bookingRequestRepo = new BookingRequestRepositoryImpl(
  bookingRequestTypeOrmRepo
)
const bookingRepo = new BookingRepositoryImpl(
  AppDataSource.getRepository(Booking)
)

const bookingService = new BookingRequestServiceImpl(
  bookingRequestRepo,
  userRepo,
  garageRepo,
  bookingRepo
)

export const controller = new BookingRequestControllerImpl(bookingService)

const BookingRequestrouter = Router()

BookingRequestrouter.post(
  '/',
  injectTenant(),
  logPostBody(),
  controller.createBookingRequest.bind(controller)
)

BookingRequestrouter.patch(
  '/:id',
  inyectUserFromToken(),
  logPostBody(),
  controller.updateStatus.bind(controller)
)

BookingRequestrouter.get(
  '/by-user',
  inyectUserFromToken(),
  controller.findAllByUserId.bind(controller)
)

BookingRequestrouter.get(
  '/owner',
  inyectUserFromToken(),
  controller.findAllByOwner.bind(controller)
)

export default BookingRequestrouter
