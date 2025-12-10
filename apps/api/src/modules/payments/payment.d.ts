import { NextFunction, Request, Response } from 'express'
import { PaymentCreatedDto } from './schemas/payment_created.schema'

export type PaymentResponse = {
  id: string
  initPoint: string
}

export type PaymentPayload = {
  bookingId: number
}

export interface PaymentService {
  makePayment(payload: PaymentPayload): Promise<PaymentInfo>
  verifyPayment(payload: PaymentCreatedDto): Promise<void>
}

export interface PaymentController {
  makePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
  verifyPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
