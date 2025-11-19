import { DrawerLayout } from '@shared/components/DrawerLayout'
import { UserNavBar } from '@shared/components/UserNavBar'
import { FilterSection } from '@tenant/components/FilterSection'
import { GarageCatalogGrid } from '@tenant/components/GarageCatalogGrid'
import { useGarages } from '@tenant/hooks/useGarages'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import type { GarageFilters } from '@tenant/services/garage.service'

export function CatalogTenant() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()
  const [filters, setFilters] = useState<GarageFilters>({})
  const {
    garages,
    loading: garagesLoading,
    error: garagesError
  } = useGarages(1, 100, filters)

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    if (!loading && error) {
      navigate('/sign-in')
    }
  }, [loading, error, navigate])

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }

  if (garagesError) {
    return <main>Ocurrió un error cargando los garajes</main>
  }

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }
  const catalogGarages = garages.map((garage) => ({
    id: garage.id,
    address: garage.location.address,
    price: garage.price,
    rentMode: garage.rentMode.mode_name,
    imageUrl: garage.photos[0]?.url ?? 'https://placehold.co/600x400',
    covered: garage.covered,
    hasCamera: garage.hasCameras
  }))

  if (garagesLoading && catalogGarages.length === 0) {
    return <main>Cargando garajes...</main>
  }

  return (
    <main className="w-full min-h-screen bg-base-100">
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <DrawerLayout
        sidebar={
          <FilterSection filters={filters} onFiltersChange={setFilters} />
        }
      >
        <div className="relative">
          {garagesLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100/70">
              Actualizando garajes...
            </div>
          )}
          <GarageCatalogGrid garages={catalogGarages} />
        </div>
      </DrawerLayout>
    </main>
  )
}
