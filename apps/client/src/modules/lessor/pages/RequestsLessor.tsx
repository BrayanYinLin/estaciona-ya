import { LessorNavbar } from '@lessor/components/LessorNavbar'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function RequestsLessor() {
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

  return (
    <main>
      <LessorNavbar profilePic={user?.photo ?? null} />
    </main>
  )
}
