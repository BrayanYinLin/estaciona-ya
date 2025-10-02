import { create } from 'zustand'
import { UserService } from '../services/user.service'

type UserProfile = {
  id: number
  name: string
  email: string
  dni: string
  state: boolean
  role: 'lessor' | 'tenant'
  photo: null | string
}

interface UserStore {
  user: UserProfile | null
  loading: boolean
  error: string | null
  recoverUser: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  recoverUser: async () => {
    set({ loading: true, error: null })
    try {
      const user = await UserService.getProfile()
      set({ user, loading: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ user: null, loading: false, error: err.message })
      } else {
        set({ user: null, loading: false, error: 'Error inesperado' })
      }
    }
  }
}))
