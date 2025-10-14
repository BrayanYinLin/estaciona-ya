import { UserNavBar } from '@shared/components/UserNavBar'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

export function GaragesLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()

  // Función para traer GarageStore y validar si el usuario tiene registros

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
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <section className="flex justify-end px-6 py-2">
        <Link to={'/lessor/garages/new'} className="btn btn-primary">
          Nuevo espacio
        </Link>
      </section>
    </main>
  )
}
