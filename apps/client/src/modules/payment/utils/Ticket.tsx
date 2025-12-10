import { api } from '@shared/api/api'

export const createPreference = async (bookingId: number) => {
  try {
    const response = await api.post(`/payment/${bookingId}`)

    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
