import { MercadoPagoConfig } from 'mercadopago'
import { env_payment_api_token } from './env.config'

export const PaymentClient = new MercadoPagoConfig({
  accessToken: env_payment_api_token
})
