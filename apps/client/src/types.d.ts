export type UserResponseProfile = {
  id: number
  name: string
  email: string
  dni: string
  state: boolean
  role: 'lessor' | 'tenant'
  photo: null | string
}
