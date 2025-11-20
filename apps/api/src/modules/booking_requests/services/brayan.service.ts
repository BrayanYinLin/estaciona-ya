import { User } from '@users/entities/user.entity'
import { BrayanRepository } from '../repositories/brayan.repository'
import {
  ReservationSchema,
  ResponseBookingRequest
} from '@booking_requests/schemas/response.schema'
import { DomainError } from '@shared/utils/error'
import { prettifyError } from 'zod'

export class BrayanService {
  constructor(private readonly brayanRepository: BrayanRepository) {}

  async findAllByUserId(userId: User['id']): Promise<ResponseBookingRequest[]> {
    const data = await this.brayanRepository.findAllByUserId(userId)

    return data.map((b) => {
      const { data, success, error } = ReservationSchema.safeParse(b)

      if (!success || error) {
        throw new DomainError({
          code: 'VALIDATION_CODE_ERROR',
          message: prettifyError(error)
        })
      }

      return data
    })
  }
}
