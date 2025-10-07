import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { ROLES } from '@shared/constants/roles'
import { FRONTEND_ROUTES } from '@shared/routes'
import axios, { AxiosError } from 'axios'
import z from 'zod'

export const signupSchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
  dni: z.string().length(8),
  role: z.enum([ROLES.TENANT, ROLES.LESSOR])
})
export type SignupType = z.infer<typeof signupSchema>

export type RegisterResponseDto = {
  access_token: string
  user: {
    id: number
    role: {
      name: string
    }
  }
}

const signup = async ({ name, email, password, dni, role }: SignupType) => {
  try {
    const endpoint = role === ROLES.TENANT ? ENDPOINTS.TENANT : ENDPOINTS.LESSOR

    const { data } = await api.post<RegisterResponseDto>(endpoint, {
      name,
      email,
      password,
      dni
    })

    return {
      token: data.access_token,
      route: '/'.concat(FRONTEND_ROUTES.USER_PROFILE)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response?.data)
      return {
        status: error.response?.data.status,
        message: error.response?.data.message
      }
    }
    return {
      status: 400,
      message: 'Unexpected error'
    }
  }
}

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})
export type SigninType = z.infer<typeof signinSchema>

const login = async ({ email, password }: SigninType) => {
  try {
    const response = await api.post<RegisterResponseDto>(ENDPOINTS.LOGIN, {
      email,
      password
    })

    return {
      token: response.data.access_token,
      route: '/'.concat(FRONTEND_ROUTES.USER_PROFILE)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0
      const message =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error.response?.data as any)?.message ??
        error.message ??
        'Unexpected error'
      return { status, message }
    }
    return {
      status: 0,
      message: (error as Error)?.message ?? 'Unexpected error'
    }
  }
}

export const AuthService = {
  signup,
  login
}
