import { createPreference } from '@modules/payment/utils/Ticket'
import { api } from '@shared/api/api'
import { ErrorAlert } from '@shared/components/ErrorAlert'
import { GhostIcon } from '@shared/components/GhostIcon'
import { PaginationButton } from '@shared/components/PaginationButton'
import { UserNavBar } from '@shared/components/UserNavBar'
import { BookingTenantCard } from '@tenant/components/BookingTenantCard'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface TenantBooking {
  id: number
  user: {
    id: number
    name: string
    // other fields omitted
  }
  garage: {
    id: number
    price: number
    description: string
    photos: { id: number; url: string }[]
    covered: boolean
    hasCameras: boolean
    restrictions: string
    state: boolean
    // location might be here based on other endpoints, but user JSON didn't show it.
    // We'll type it optionally to be safe, or assume it matches other parts of the system.
    location?: {
      address: string
      latitude: string
      longitude: string
    }
    // Owner/User of garage might be here?
    user?: {
      name: string
    }
  }
  startDate: string
  endDate: string
  status: string
  total: number // The user JSON showed "1983" (string) but typically cost is number. Typed as number | string for safety.
}

export function BookingsTenant() {
  const { user, loading, error, recoverUser } = useUserStore()
  const [bookings, setBookings] = useState<TenantBooking[]>([])
  const [page, setPage] = useState<number>(1)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchBookings = async (page: number) => {
    try {
      setFetchError(null)
      const res = await api.get<TenantBooking[]>(
        `/booking/tenant?page=${page}&size=10`
      )
      setBookings(res.data ?? [])
      console.log(res.data)
    } catch (e) {
      setFetchError('No se pudieron cargar tus reservas.')
      console.error(e)
    }
  }

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    fetchBookings(page)
  }, [page])

  useEffect(() => {
    if (loading === false && error) {
      navigate('/sign-in')
    }
  }, [loading, error, navigate])

  if (user === null) {
    return <main>Cargando...</main>
  }

  return (
    <main>
      <UserNavBar
        profilePic={user?.photo ?? null}
        role={user?.role}
        initial={user.name?.[0] ?? 'U'}
      />

      <section className="flex flex-col m-6 gap-6">
        <h1 className="text-2xl font-bold">Mis Reservas</h1>

        {fetchError && <ErrorAlert message={fetchError} />}

        {!fetchError && bookings.length === 0 && (
          <section className="flex flex-col items-center gap-4 text-gray-500">
            <p className="text-center text-2xl">
              No tienes reservas registradas.
            </p>
            <GhostIcon />
          </section>
        )}

        {bookings.map((booking) => (
          <BookingTenantCard
            key={booking.id}
            id={booking.id}
            garageImage={booking.garage.photos?.[0]?.url ?? ''}
            address={
              booking.garage.location?.address ?? 'Dirección no especificada'
            }
            lessorName={booking.garage.user?.name}
            covered={booking.garage.covered}
            hasCameras={booking.garage.hasCameras}
            startDate={booking.startDate}
            endDate={booking.endDate}
            totalPrice={Number(booking.total)}
            status={booking.status}
            onPay={async () => {
              await createPreference(booking.id)
            }}
          />
        ))}

        <PaginationButton
          page={page}
          prev={() => {
            if (page - 1 === 0) return
            setPage(page - 1)
          }}
          next={() => {
            if (bookings.length > 0) setPage(page + 1)
          }}
        />
      </section>
    </main>
  )
}
