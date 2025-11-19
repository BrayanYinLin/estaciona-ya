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
  validatedAccount: boolean
}

export type Garage = {
  id: number
  address: string
  price: number
  rating?: number
  rentMode: string
  imageUrl: string
  covered: boolean
  hasCamera: boolean
}

export type GarageDetail = {
  id: number
  rentMode: {
    id: number
    mode_name: string
  }
  price: number
  description: string
  photos: {
    url: string
  }[]
  covered: boolean
  hasCameras: boolean
  restrictions: string
  user: {
    id: number
    name: string
    email: string
  }
  location: {
    id: number
    address: string
    latitude: string
    longitude: string
    district: {
      id: number
      name: string
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bookingRequests: any[]
  state: boolean
  createdAt: string
  updatedAt: string
}
