import { useUserStore } from '@user/context/user.context'
import { UserNavBar } from '@shared/components/UserNavBar'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export function BookingsLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    recoverUser()
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
      <UserNavBar
        profilePic={user?.photo ?? null}
        role={user?.role}
        initial={user.name![0]}
      />
    </main>
  )
}
