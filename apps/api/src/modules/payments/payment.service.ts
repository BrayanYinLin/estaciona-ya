import { BookingRepository } from '@bookings/booking'
import { PaymentPayload, PaymentResponse, PaymentService } from './payment'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { PaymentClient } from '@shared/config/payment_platform.config'
import { Preference } from 'mercadopago'
import { Items } from 'mercadopago/dist/clients/commonTypes'
import { Booking } from '@bookings/entities/booking.entity'

export class PaymentServiceImpl implements PaymentService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async makePayment({ bookingId }: PaymentPayload): Promise<PaymentResponse> {
    const bookingFound = (await this.bookingRepository.findById(
      bookingId
    )) as Booking

    if (bookingFound === null) {
      throw new DomainError({
        code: DOMAIN_ERRORS.ENTITY_NOT_FOUND.code,
        message: 'No se halló la reserva'
      })
    }

    const preference = new Preference(PaymentClient)

    const paymentInfo = await preference.create({
      body: {
        // 1. ITEMS
        items: [
          {
            title: bookingFound.garage.location.address,
            quantity: 1,
            unit_price: bookingFound.total,
            currency_id: 'PEN'
          } as Items
        ],
        back_urls: {
          success: 'https://www.google.com',
          failure: 'https://www.youtube.com',
          pending: 'https://www.wikipedia.org'
        },
        auto_return: 'approved'
      }
    })

    if (!paymentInfo.id) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INTERNAL_ERROR.code,
        message: 'La informacion de pago no se pudo crear correctamente'
      })
    }

    if (!paymentInfo.init_point) {
      throw new DomainError({
        code: DOMAIN_ERRORS.INTERNAL_ERROR.code,
        message: 'La informacion de pago no se pudo crear correctamente'
      })
    }

    return {
      id: paymentInfo.id,
      initPoint: paymentInfo.init_point
    }
  }
}
