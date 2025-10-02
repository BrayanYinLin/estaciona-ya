import { useAuthStore } from '@auth/context/auth.context'
import axios, { type AxiosRequestConfig } from 'axios'
import { ENDPOINTS } from './endpoints'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

const apiRefresh = axios.create({
  baseURL: '/api',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().access_token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

type RefreshResponse = {
  access_token: string
}

export interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean
}

api.interceptors.response.use(
  (response) => response,
  async (e) => {
    const originalRequest = e.config as AxiosRequestConfigWithRetry

    if (e.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await apiRefresh.get<RefreshResponse>(
          ENDPOINTS.REFRESH
        )
        useAuthStore.getState().setAuth(data.access_token)

        console.log('Recovering token ' + data.access_token)
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${useAuthStore.getState().access_token}`
        }

        console.log('Resending request')
        return api(originalRequest)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
)

export { api }
