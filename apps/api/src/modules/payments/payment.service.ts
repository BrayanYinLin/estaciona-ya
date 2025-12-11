import { BookingRepository } from '@bookings/booking'
import { PaymentPayload, PaymentResponse, PaymentService } from './payment'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'
import { PaymentClient } from '@shared/config/payment_platform.config'
import { Preference, Payment } from 'mercadopago'
import { Items } from 'mercadopago/dist/clients/commonTypes'
import { Booking, BookingStatus } from '@bookings/entities/booking.entity'
import { env_api_base_url, env_web_client } from '@shared/config/env.config'
import { PaymentCreatedDto } from './schemas/payment_created.schema'

export class PaymentServiceImpl implements PaymentService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async verifyPayment(payload: PaymentCreatedDto): Promise<void> {
    const payment = new Payment(PaymentClient)

    const paymentDone = await payment.get({ id: payload.data.id })
    if (paymentDone.status === 'approved') {
      await this.bookingRepository.updateStatus(
        Number(paymentDone.external_reference),
        BookingStatus.PAID
      )
    }
  }

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

    console.log('[back_urls]', env_web_client)
    console.log('[notification_url]', env_api_base_url)

    const paymentInfo = await preference.create({
      body: {
        // 1. ITEMS
        items: [
          {
            title: bookingFound.garage.location.address,
            quantity: 1,
            unit_price: Number(bookingFound.total),
            currency_id: 'PEN'
          } as Items
        ],
        back_urls: {
          success: env_web_client.concat('/payment?state=success'),
          failure: env_web_client.concat('/payment?state=failure'),
          pending: env_web_client.concat('payment?state=info')
        },
        auto_return: 'approved',
        notification_url: env_api_base_url.concat('/api/payment/webhook'),
        external_reference: String(bookingFound.id)
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
