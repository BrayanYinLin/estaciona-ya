import { DrawerLayout } from '@shared/components/DrawerLayout'
import { UserNavBar } from '@shared/components/UserNavBar'
import { FilterSection } from '@tenant/components/FilterSection'
import { GarageCatalogGrid } from '@tenant/components/GarageCatalogGrid'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function CatalogTenant() {
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()
  const garages = [
    {
      id: 1,
      address: 'Calle San Rodolfo',
      price: 50,
      rating: 3.9,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: false
    },
    {
      id: 2,
      address: 'Calle Las Palmeras',
      price: 30,
      rating: 2.5,
      rentMode: 'Hora',
      imageUrl: 'https://placehold.co/600x400',
      covered: false,
      hasCamera: true
    },
    {
      id: 3,
      address: 'Calle 2 De Mayo',
      price: 45,
      rating: 3.0,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: true
    },
    {
      id: 4,
      address: 'Calle San Rodolfo',
      price: 50,
      rating: 3.9,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: false
    },
    {
      id: 5,
      address: 'Calle Las Palmeras',
      price: 30,
      rating: 2.5,
      rentMode: 'Hora',
      imageUrl: 'https://placehold.co/600x400',
      covered: false,
      hasCamera: true
    },
    {
      id: 6,
      address: 'Calle 2 De Mayo',
      price: 45,
      rating: 3.0,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: true
    },
    {
      id: 7,
      address: 'Calle San Rodolfo',
      price: 50,
      rating: 3.9,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: false
    },
    {
      id: 8,
      address: 'Calle San Rodolfo',
      price: 50,
      rating: 3.9,
      rentMode: 'Mes',
      imageUrl: 'https://placehold.co/600x400',
      covered: true,
      hasCamera: false
    }
  ]

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
    <main className="w-full min-h-screen bg-base-100">
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <DrawerLayout sidebar={<FilterSection />}>
        <GarageCatalogGrid garages={garages} />
      </DrawerLayout>
    </main>
  )
}
