import { create } from 'zustand'

interface AuthState {
  access_token: string
  setAuth: (jwt: string) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  access_token: '',
  setAuth: (jwt: string) => {
    set(() => ({ access_token: jwt }))
  }
}))
