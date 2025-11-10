import { GarageSpaceCard } from '@lessor/components/GarageSpaceCard'
import { api } from '@shared/api/api'
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
  price: number
  description: string
  covered: boolean
  hasCameras: boolean
  restrictions: string
  state: boolean
  createdAt: Date
  updatedAt: Date
  photos: {
    url: string
  }[]
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
}

export function GaragesLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const [garages, setGarages] = useState<Garage[]>([])
  const navigate = useNavigate()
  const garagesData = async () => {
    const garage = await api.get<Garage[]>('garage/me')
    setGarages(garage.data)
  }

  // Función para traer GarageStore y validar si el usuario tiene registros

  useEffect(() => {
    recoverUser()
    garagesData()
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
      <section className="flex flex-col m-6 gap-6">
        {garages.length > 0 &&
          garages.map((garage) => {
            return (
              <GarageSpaceCard
                address={garage.location.address}
                price={garage.price}
                photo={
                  garage.photos[0]
                    ? [{ url: garage.photos[0].url }]
                    : [{ url: 'https://placehold.co/300x200' }]
                }
                rating={3}
                rentMode={garage.rentMode.mode_name}
                isCovered={garage.covered}
                hasCameras={garage.hasCameras}
                onEdit={() => console.log('Editar')}
                onDisable={() => console.log('Deshabilitar')}
                disabled={!garage.state}
              />
            )
          })}
      </section>
    </main>
  )
}
