import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAuthStore } from '@auth/context/auth.context'

const socket = io('http://localhost:3000', {
  autoConnect: false
})

export function useSocket() {
  const { access_token } = useAuthStore()

  useEffect(() => {
    if (!access_token) return

    socket.auth = { token: access_token }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [access_token])

  return socket
}
