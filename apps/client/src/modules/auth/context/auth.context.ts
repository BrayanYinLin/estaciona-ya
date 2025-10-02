import { create } from 'zustand'

interface AuthState {
  access_token: string | null
  setAuth: (jwt: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  access_token: null,
  setAuth: (jwt: string) => {
    set(() => ({ access_token: jwt }))
  },
  clearAuth: () => {
    set(() => ({ access_token: null }))
  }
}))
