import { UserNavBar } from '@shared/components/UserNavBar'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BookingRequestService } from '../services/request.service'
import { TenantRequestCard } from './TenantRequestCard'
import type { BookingRequest } from '../types'

export function RequestsTenant() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()
  const [requests, setRequests] = useState<BookingRequest[]>([])

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    if (loading == false && error) {
      navigate('/sign-in')
    }
  }, [loading, error])

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await BookingRequestService.getBookingRequestsByUser()
      if (data) {
        setRequests(data)
      }
    }
    fetchRequests()
  }, [])

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }

  return (
    <main>
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <h1 className="text-3xl font-bold text-center mt-8">Mis Solicitudes</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 px-5 pb-50">
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
