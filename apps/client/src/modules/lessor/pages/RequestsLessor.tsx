import { RequestGarageCard } from '@lessor/components/RequestGarageCard'
import { api } from '@shared/api/api'
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

    api.get('/booking-requests/owner').then(({ data }) => console.log(data))
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
      <section className="flex flex-col gap-5 mx-4 lg:mx-6">
        <RequestGarageCard
          tenantName="Juan Perez"
          rentalType="day"
          startDate={new Date('2025-12-02T21:00:00')}
          endDate={new Date('2025-12-04T21:00:00')}
          totalPrice={45.0}
          status="pending"
          garageName="Cochera en Miraflores"
          garageImage="https://placehold.co/600x400"
        />
        <RequestGarageCard
          tenantName="Juan Perez"
          rentalType="hour"
          startDate={new Date('2025-12-02T21:18:00')}
          endDate={new Date('2025-12-02T21:20:00')}
          totalPrice={12.5}
          status="pending"
          garageName="Cochera en Miraflores"
          garageImage="https://placehold.co/600x400"
        />
        <RequestGarageCard
          tenantName="Juan Perez"
          rentalType="month"
          startDate={new Date('2025-12-02T21:00:00')}
          endDate={new Date('2026-05-02T21:00:00')}
          totalPrice={350.0}
          status="pending"
          garageName="Cochera en Miraflores"
          garageImage="https://placehold.co/600x400"
        />
      </section>
    </main>
  )
}
