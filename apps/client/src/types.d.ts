export type UserResponseProfile = {
  id: number
  name: string
  email: string
  dni: string
  state: boolean
  role: {
    name: 'lessor' | 'tenant'
  }
  photo: null | string
}
