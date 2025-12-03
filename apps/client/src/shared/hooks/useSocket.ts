import { useEffect } from 'react'
import { useAuthStore } from '@auth/context/auth.context'
import { useSocketStore } from '../context/socket.store'

export function useSocket() {
  const { access_token } = useAuthStore()
  const socket = useSocketStore((s) => s.socket)
  const connect = useSocketStore((s) => s.connect)
  const disconnect = useSocketStore((s) => s.disconnect)

  useEffect(() => {
    if (!access_token) return

    connect(access_token)

    const handleBeforeUnload = () => {
      socket.disconnect()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      disconnect()
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [access_token])

  return socket
}
