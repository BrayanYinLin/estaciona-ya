import { api } from '@shared/api/api'
import { ENDPOINTS } from '@shared/api/endpoints'
import { API_ROLES, ROLES } from '@shared/constants/roles'
import { FRONTEND_ROUTES } from '@shared/routes'
import { AxiosError } from 'axios'
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
      route:
        data.user.role.name === API_ROLES.TENANT
          ? '/garages'
          : '/'.concat(
              FRONTEND_ROUTES.LESSOR,
              '/',
              FRONTEND_ROUTES.LESSOR_REQUEST
            )
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
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
    const { data } = await api.post<RegisterResponseDto>(ENDPOINTS.LOGIN, {
      email,
      password
    })

    return {
      token: data.access_token,
      route:
        data.user.role.name === API_ROLES.TENANT
          ? '/garages'
          : '/'.concat(
              FRONTEND_ROUTES.LESSOR,
              '/',
              FRONTEND_ROUTES.LESSOR_REQUEST
            )
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
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

export const AuthService = {
  signup,
  login
}
