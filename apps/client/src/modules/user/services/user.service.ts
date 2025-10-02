import { type UserResponseProfile } from '@/types'
import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { AxiosError } from 'axios'

export class UserService {
  static async getProfile() {
    try {
      const { data } = await api.get<UserResponseProfile>(ENDPOINTS.USER)

      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || 'Error al obtener el perfil'
        )
      }
      throw new Error('Error desconocido al obtener el perfil')
    }
  }
}
