import { UserNavBar } from '@shared/components/UserNavBar'
import { useSocket } from '@shared/hooks/useSocket'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function RequestsLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()
  const socket = useSocket()

  useEffect(() => {
    recoverUser()
    socket?.on('welcome', (data) => {
      console.log(data)
    })

    socket?.on('notify-user', (data) => {
      console.log(data)
    })
  }, [])

  useEffect(() => {
    if (loading == false && error) {
      navigate('/sign-in')
    }
  }, [loading, error])

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }

  return (
    <main>
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
    </main>
  )
}
