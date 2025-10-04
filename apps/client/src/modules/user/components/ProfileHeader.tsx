import { useAuthStore } from '@auth/context/auth.context'
import { api } from '@shared/api/api'
import { NavBarLinks } from '@shared/components/NavBarLinks'
import { useUserStore, type UserRole } from '@user/context/user.context'
import { useNavigate } from 'react-router'

export function ProfileHeader({
  name,
  role,
  profilePic
}: {
  name: string
  role: UserRole
  profilePic: string | null
}) {
  const { clearAuth } = useAuthStore()
  const { logOutUser } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await api.get('/auth/logout')
    clearAuth()
    logOutUser()
    navigate('/')
  }
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <section className="flex items-center gap-4">
        <img
          src={profilePic ?? 'https://placehold.co/150x150'}
          alt=""
          className="rounded-full h-16 w-16 object-cover"
        />
        <h1 className="text-lg lg:text2xl font-semibold">{name}</h1>
      </section>
      <section className="flex gap-2 items-center">
        <NavBarLinks role={role} />
        <button
          className="btn btn-sm btn-outline btn-error"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </section>
    </div>
  )
}
