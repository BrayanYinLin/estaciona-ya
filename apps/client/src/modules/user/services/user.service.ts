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

  static async deactivateProfile() {
    try {
      await api.delete(ENDPOINTS.USER)
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || 'Error al obtener el perfil'
        )
      }
      throw new Error('Error desconocido al obtener el perfil')
    }
  }

  static async updateProfile(formData: FormData) {
    try {
      const { data } = await api.patch<UserResponseProfile>(
        ENDPOINTS.USER.concat('/me'),
        formData
      )

      return data
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        throw new Error(
          e.response?.data?.message || 'Error actualizando perfil'
        )
      }
      throw new Error('Error desconocido al actualizar el perfil')
    }
  }
}
