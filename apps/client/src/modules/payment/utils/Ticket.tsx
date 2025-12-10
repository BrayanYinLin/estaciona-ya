import { api } from '@shared/api/api'

export type PaymentServiceResponse = {
  id: string
  initPoint: string
}

export const createPreference = async (bookingId: number) => {
  try {
    const response = await api.post<PaymentServiceResponse>(
      `/payment/${bookingId}`
    )

    window.location.href = response.data.initPoint
  } catch (error) {
    console.log(error)
    throw error
  }
}
