import { NextFunction, Request, Response } from 'express'

export type PaymentResponse = {
  id: string
  initPoint: string
}

export type PaymentPayload = {
  bookingId: number
}

export interface PaymentService {
  makePayment(payload: PaymentPayload): Promise<PaymentInfo>
}

export interface PaymentController {
  makePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>
}
