import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { Repository } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Garage } from '@garages/entities/garage.entity'
import { CreateBookingRequestDto } from '../schemas/create_booking_request.shcema'
import { BookingRequestRepositoryImpl } from '../repositories/booking-request.repository'
import { BookingRequestService } from '../booking-request'
import { BookingRequest } from '../entities/booking-requests.entity'
import { prettifyError } from 'node_modules/zod/v4/core/errors'
import {
  ResponseBookinRequest,
  ResponseBookingRequest
} from '@booking_requests/schemas/response.schema'

export class BookingRequestServiceImpl implements BookingRequestService {
  constructor(
    private bookingRequestRepository: BookingRequestRepositoryImpl,

    private readonly userRepository: Repository<User>,
    private readonly garageRepository: Repository<Garage>
  ) {}

  async findAllByUserId(userId: number): Promise<ResponseBookingRequest[]> {
    const data = await this.bookingRequestRepository.findAllByUserId(userId)

    return data.map((b) => {
      const { data, success, error } = ResponseBookinRequest.safeParse(b)

      if (!success || error) {
        throw new DomainError({
          code: 'VALIDATION_CODE_ERROR',
          message: prettifyError(error)
        })
      }

      return data
    })
  }

  async createBookingRequest(
    dto: CreateBookingRequestDto
  ): Promise<BookingRequest> {
    const { tenantId, garageId, startDate, endDate } = dto
    if (new Date(endDate) <= new Date(startDate)) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INVALID_DATES.code,
        message: 'La fecha de fin debe ser posterior a la fecha de inicio'
      })
    }
    const now = new Date()
    if (new Date(startDate) <= now) {
      throw new DomainError({
        code: DOMAIN_ERRORS.PASTED_DATE_BOOKING.code,
        message: 'No se pueden crear reservas con fechas pasadas'
      })
    }

    const user = await this.userRepository.findOneBy({ id: tenantId })
    if (!user) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: `El usuario con ID ${tenantId} no existe`
      })
    }

    const garage = await this.garageRepository.findOneBy({ id: garageId })
    if (!garage) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: `El garaje con ID ${garageId} no existe`
      })
    }

    const conflicts =
      await this.bookingRequestRepository.findConlictingBookingRequests(
        garageId,
        new Date(startDate),
        new Date(endDate)
      )

    if (conflicts.length > 0) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICTING_BOOKING.code,
        message: 'Ya existe una reserva aceptada o pendiente en ese horario'
      })
    }

    const newBookingRequest =
      await this.bookingRequestRepository.createBookingRequest(dto)

    return newBookingRequest
  }
}
