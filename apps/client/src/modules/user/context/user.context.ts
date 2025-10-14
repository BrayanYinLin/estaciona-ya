import { create } from 'zustand'
import { UserService } from '../services/user.service'

export type UserRole = {
  name: 'lessor' | 'tenant'
}

export type UserProfile = {
  id: number
  name: string
  email: string
  dni: string
  state: boolean
  role: UserRole
  photo: null | string
  validatedAccount: boolean
}

interface UserStore {
  user: UserProfile | null
  loading: boolean
  error: string | null
  recoverUser: () => Promise<void>
  deactiveUser: () => Promise<void>
  updateProfile: (formData: FormData) => Promise<void>
  logOutUser: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
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
    } finally {
      set({ loading: false })
    }
  },
  deactiveUser: async () => {
    try {
      await UserService.deactivateProfile()
      await get().recoverUser()
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message })
      } else {
        set({ error: 'Error inesperado' })
      }
    } finally {
      set({ loading: false })
    }
  },
  updateProfile: async (formData: FormData) => {
    set({ loading: true, error: null })
    try {
      const user = await UserService.updateProfile(formData)
      set({ user, loading: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ user: null, loading: false, error: err.message })
      } else {
        set({ user: null, loading: false, error: 'Error inesperado' })
      }
    } finally {
      set({ loading: false })
    }
  },
  logOutUser: () => set({ user: null })
}))
