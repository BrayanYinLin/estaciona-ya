import { useUserStore } from '@user/context/user.context'
import { ProfileForm } from '../components/ProfileForm'
import { ProfileHeader } from '../components/ProfileHeader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function UserProfile() {
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

  if (loading && !user) {
    return <p>Cargando</p>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
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
      </div>
    </div>
  )
}
