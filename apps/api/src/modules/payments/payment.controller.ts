import { NextFunction, Request, Response } from 'express'
import { PaymentController, PaymentService } from './payment'
import { DomainError } from '@shared/utils/error'
import { DOMAIN_ERRORS } from '@shared/constants/domain.code'

export class PaymentControllerImpl implements PaymentController {
  constructor(private readonly service: PaymentService) {}

  async makePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params

      if (!id) {
        throw new DomainError({
          code: DOMAIN_ERRORS.WRONG_DATA.code,
          message: 'No se envio el id de la reserva a pagar.'
        })
      }

      const info = await this.service.makePayment({ bookingId: Number(id) })

      return res.status(201).json(info)
    } catch (e) {
      next(e)
    }
  }
}
