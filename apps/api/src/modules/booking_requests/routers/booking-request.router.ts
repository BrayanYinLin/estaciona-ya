import { BookingRequestControllerImpl } from '../controller/booking_request.controller'
import { BookingRequestServiceImpl } from '../services/booking_request.service'
import { createBookingRequestRepository } from '../repositories/booking-request.repository'
import { AppDataSource } from '@shared/database/data-source'
import { User } from '@users/entities/user.entity'
import { Garage } from '@garages/entities/garage.entity'
import { BookingRequest } from '../entities/booking-requests.entity'
import { Router } from 'express'
import { injectTenant } from '@booking_requests/middleware/inject_tenant.middleware'
import { logPostBody } from '@shared/utils/log_body.utils'

const userRepo = AppDataSource.getRepository(User)
const garageRepo = AppDataSource.getRepository(Garage)
const bookingRequestTypeOrmRepo = AppDataSource.getRepository(BookingRequest)

const customBookingRepo = new createBookingRequestRepository(
  bookingRequestTypeOrmRepo
)
const bookingService = new BookingRequestServiceImpl(
  customBookingRepo,
  userRepo,
  garageRepo
)

export const bookingRequestController = new BookingRequestControllerImpl(
  bookingService
)

const BookingRequestrouter = Router()

BookingRequestrouter.post(
  '/',
  injectTenant(),
  logPostBody(),
  bookingRequestController.createBookingRequest.bind(bookingRequestController)
)

export default BookingRequestrouter
