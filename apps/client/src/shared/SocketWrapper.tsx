import { useAuthStore } from '@auth/context/auth.context'
import { io } from 'socket.io-client'

export function SocketWrapper({ children }: { children: React.ReactNode }) {
  const { access_token } = useAuthStore()

  const socket = io('http://localhost:3000', {
    auth: {
      token: access_token
    }
  })
  socket.on('welcome', (data) => {
    console.log(data)
  })

  return <>{children}</>
}
