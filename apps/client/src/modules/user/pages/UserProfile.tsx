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
    console.log(user)
  }, [user])

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
          role={user.role === 'lessor' ? 'Arrendador' : 'Arrendatario'}
          profilePic={user.photo}
        />
        {/* <SettingsButton /> */}
      </div>

      <div className="py-8 px-4 justify-start w-full flex flex-col gap-2 lg:w-[1000px]">
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
