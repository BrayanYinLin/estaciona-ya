import { GarageSpaceCard } from '@lessor/components/GarageSpaceCard'
import { api } from '@shared/api/api'
import { ErrorAlert } from '@shared/components/ErrorAlert'
import { GhostIcon } from '@shared/components/GhostIcon'
import { PaginationButton } from '@shared/components/PaginationButton'
import { UserNavBar } from '@shared/components/UserNavBar'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

type Garage = {
  id: number
  rentMode: {
    id: number
    mode_name: string
  }
  location: {
    id: number
    address: string
    latitude: string
    longitude: string
    district: {
      id: number
      name: string
    }
  }
  price: number
  description: string
  covered: boolean
  hasCameras: boolean
  restrictions: string
  state: boolean
  createdAt: Date
  updatedAt: Date
  photos: { url: string }[]
}

export function GaragesLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const [garages, setGarages] = useState<Garage[]>([])
  const [page, setPage] = useState<number>(1)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const navigate = useNavigate()

  const garagesData = async (page: number) => {
    try {
      setFetchError(null)
      const res = await api.get<Garage[]>(`garage/me?page=${page}&size=10`)
      setGarages(res.data ?? [])
    } catch (e) {
      setFetchError(
        'No se pudieron cargar tus garajes. Intenta de nuevo más tarde.'
      )
      console.error(e)
    }
  }

  const handleDisableGarage = async (id: number) => {
    try {
      await api.delete(`garage/${id}`)
      // Optimistic update
      setGarages((prev) =>
        prev.map((garage) =>
          garage.id === id ? { ...garage, state: false } : garage
        )
      )
    } catch (e) {
      console.error(e)
      alert('No se pudo deshabilitar el garaje')
    }
  }

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    garagesData(page)
  }, [page])

  useEffect(() => {
    if (loading === false && error) navigate('/sign-in')
  }, [loading, error, navigate])

  if (user === null) return <main>Ha ocurrido algo</main>

  return (
    <main>
      <UserNavBar
        profilePic={user?.photo ?? null}
        role={user?.role}
        initial={user.name?.[0] ?? 'U'}
      />

      <section className="flex justify-end px-6 py-2">
        <Link to="/lessor/garages/new" className="btn btn-primary">
          Nuevo espacio
        </Link>
      </section>

      <section className="flex flex-col m-6 gap-6">
        {fetchError && <ErrorAlert message={fetchError} />}

        {!fetchError && garages.length === 0 && (
          <section className="flex flex-col items-center gap-4 text-gray-500">
            <p className="text-center text-2xl">
              No tienes espacios de garage aún.
            </p>
            <GhostIcon />
          </section>
        )}

        {garages.map((garage) => (
          <GarageSpaceCard
            key={garage.id}
            address={garage.location.address}
            price={garage.price}
            id={garage.id}
            photo={garage.photos}
            // rating={3}
            rentMode={garage.rentMode.mode_name}
            isCovered={garage.covered}
            hasCameras={garage.hasCameras}
            onEdit={() => console.log('Editar')}
            onDisable={() => handleDisableGarage(garage.id)}
            disabled={!garage.state}
          />
        ))}
        <PaginationButton
          page={page}
          prev={() => {
            if (page - 1 == 0) return

            if (page > 0) setPage(page - 1)
          }}
          next={() => {
            if (garages.length > 0) setPage(page + 1)
          }}
        />
      </section>
    </main>
  )
}
