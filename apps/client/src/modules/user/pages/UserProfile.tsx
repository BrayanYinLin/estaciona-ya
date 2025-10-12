import { useUserStore } from '@user/context/user.context'
import { ProfileForm } from '../components/ProfileForm'
import { ProfileHeader } from '../components/ProfileHeader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChangePasswordForm } from '@user/components/ChangePasswordForm'
import { DangerZone } from '@user/components/DangerZone'
import { WarningIcon } from '@shared/components/WarningIcon'
import { LoadingScreen } from '@shared/components/LoadingScreen'

export function UserProfile() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    if (error) {
      navigate('/sign-in')
    }
  }, [error])

  if (loading && !user) {
    return <LoadingScreen />
  }

  if (!user) {
    return <p>Algo ha ocurrido</p>
  }

  return (
    <div className="flex flex-col gap-8 container py-8 px-4 items-center mx-auto">
      <div className="flex flex-wrap px-4 justify-start w-full lg:w-[1000px]">
        <ProfileHeader
          name={user.name}
          role={user.role}
          profilePic={user.photo}
        />
        {!user.state && (
          <div
            role="alert"
            className="alert alert-warning alert-outline mt-5 mb-[-25px] w-full"
          >
            <WarningIcon />
            <span>
              Tu cuenta está desactivada, no podrás acceder a las
              funcionalidades.
            </span>
          </div>
        )}
      </div>

      <div className="pb-8 px-4 justify-start w-full flex flex-col gap-2 lg:w-[1000px]">
        <ProfileForm
          id={user.id}
          name={user.name}
          email={user.email}
          dni={user.dni}
          role={user.role}
          state={user.state}
          photo={user.photo}
        />
        <ChangePasswordForm />
        <h2 className="text-2xl font-semibold">Desactivar cuenta</h2>
        <DangerZone />
      </div>
    </div>
  )
}
