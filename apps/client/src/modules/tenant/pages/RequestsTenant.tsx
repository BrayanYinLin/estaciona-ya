import { UserNavBar } from '@shared/components/UserNavBar'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { TenantRequestCard } from './TenantRequestCard'
import { useBookingRequestsStore } from '@tenant/contexts/booking_requests.store'

export function RequestsTenant() {
  const { user, loading, error, recoverUser } = useUserStore()
  const { requests, getAllRequests } = useBookingRequestsStore()
  const navigate = useNavigate()

  useEffect(() => {
    recoverUser()
    getAllRequests()
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
      <h1 className="text-xl px-5 font-bold mt-8">Mis Solicitudes</h1>
      <section className="flex flex-col gap-8 pt-12 px-5 pb-50">
        {requests.length > 0 ? (
          requests.map((request) => (
            <TenantRequestCard key={request.id} request={request} />
          ))
        ) : (
          <p className="text-center col-span-full">
            No tienes solicitudes de reserva.
          </p>
        )}
      </section>
    </main>
  )
}
