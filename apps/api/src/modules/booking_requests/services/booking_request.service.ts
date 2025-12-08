import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { Repository } from 'typeorm'
import { User } from '@users/entities/user.entity'
import { Garage } from '@garages/entities/garage.entity'
import { CreateBookingRequestDto } from '../schemas/create_booking_request.schema'
import {
  BookingRequestRepository,
  BookingRequestService,
  StatusPayload
} from '../booking-request'
import { BookingRequest, Status } from '../entities/booking-requests.entity'
import { prettifyError } from 'node_modules/zod/v4/core/errors'
import {
  ResponseBookinRequest,
  ResponseBookingRequest
} from '@booking_requests/schemas/response.schema'
import { notificationEmitter } from '@shared/sockets/notify_event'
import { getDiffTime } from '@shared/utils/get_diff_time'
import { RENT_MODES } from '@shared/constants/rent_modes'
import { BookingRepository } from '@bookings/booking'

export class BookingRequestServiceImpl implements BookingRequestService {
  constructor(
    private bookingRequestRepository: BookingRequestRepository,
    private readonly userRepository: Repository<User>,
    private readonly garageRepository: Repository<Garage>,
    private readonly bookingRepository: BookingRepository
  ) {}

  async update(
    bookingRequestId: number,
    userId: number,
    status: StatusPayload
  ): Promise<void> {
    const bookingRequest =
      await this.bookingRequestRepository.findById(bookingRequestId)

    if (!bookingRequest) {
      throw new DomainError({
        code: 'ENTITY_NOT_FOUND',
        message: 'Booking request not found.'
      })
    }

    if (bookingRequest.garage.user.id !== userId) {
      throw new DomainError({
        code: 'FORBIDDEN_ERROR',
        message: 'El usuario no es el propietario del estacionamiento.'
      })
    }

    if (bookingRequest.status === 'accepted') return

    if (bookingRequest.status === 'rejected') return

    await this.bookingRequestRepository.update(bookingRequestId, status)

    if (status === 'accepted') {
      const updated = await this.bookingRequestRepository.updatePendingRequests(
        bookingRequest.garage.id,
        bookingRequest.startDate,
        bookingRequest.endDate
      )

      notificationEmitter.emit(
        'notify',
        updated.map(({ user, garage }) => ({
          id: user.id,
          garage: {
            id: garage.id
          },
          message:
            'Tu solicitud fue rechazada por conflicto con una nueva reserva.'
        }))
      )

      console.log('[Service] ', bookingRequest)

      await this.bookingRepository.create({
        user: {
          id: bookingRequest.user.id
        } as User,
        garage: {
          id: bookingRequest.garage.id
        } as Garage,
        startDate: bookingRequest.startDate,
        endDate: bookingRequest.endDate,
        total: bookingRequest.cost
      })
    }
  }

  async findAllByOwner(userId: number): Promise<BookingRequest[]> {
    return this.bookingRequestRepository.findAllByOwner(userId)
  }

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

    const garage = await this.garageRepository.findOne({
      where: { id: garageId },
      relations: ['user', 'rentMode']
    })

    if (!garage) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: `El garaje con ID ${garageId} no existe`
      })
    }

    const conflicts = await this.bookingRepository.findConlictingBooking(
      garageId,
      new Date(startDate),
      new Date(endDate)
    )

    if (conflicts.length > 0) {
      throw new DomainError({
        code: DOMAIN_ERRORS.CONFLICT.code,
        message: 'Ya existe una reserva aceptada o pendiente en ese horario'
      })
    }

    const diff = getDiffTime(new Date(startDate), new Date(endDate))

    let cost = 0

    if (garage.rentMode.mode_name === RENT_MODES.DIARIO) {
      cost = diff.days * garage.price
    } else if (garage.rentMode.mode_name === RENT_MODES.HORA) {
      cost = diff.hours * garage.price
    } else {
      cost = diff.months * garage.price
    }

    const bookingRequest = {
      garage: { id: garage.id } as Garage,
      user: { id: user.id } as User,
      startDate,
      endDate,
      cost,
      status: 'pending' as Status
    }

    const newBookingRequest =
      await this.bookingRequestRepository.createBookingRequest(bookingRequest)

    notificationEmitter.emit('notify', [
      {
        id: garage.user.id,
        message: `${user.name} ha solicitado un estacionamiento.`,
        garage: {
          id: garage.id
        }
      }
    ])

    return newBookingRequest
  }
}
