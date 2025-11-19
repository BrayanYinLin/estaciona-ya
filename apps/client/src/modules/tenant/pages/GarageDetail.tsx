import { UserNavBar } from '@shared/components/UserNavBar'
import { HourFilterForm } from '@tenant/components/HourFilterForm'
import { DayFilterForm } from '@tenant/components/DayFilterForm'
import { MonthFilterForm } from '@tenant/components/MonthFilterForm'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import 'react-day-picker/style.css'
import { GarageImgCarousel } from '@shared/components/GarageImgCarousel'
import { GarageFeatures } from '@tenant/components/GarageFeatures'
import { GarageDescription } from '@tenant/components/GarageDescription'
import { GarageRestrictions } from '@tenant/components/GarageRestrictions'
import { GarageReservationHeader } from '@tenant/components/GarageReservationHeader'
import { useGarageDetail } from '@tenant/hooks/useGarageDetail'

type RentMode = 'hora' | 'dia' | 'mes'

export function GarageDetail() {
  const { id } = useParams()
  const { user, loading, error, recoverUser } = useUserStore()
  const navigate = useNavigate()
  const [rentMode] = useState<RentMode>('hora')
  const {
    garage,
    getGarageDetail,
    error: garageError
  } = useGarageDetail(Number(id))

  useEffect(() => {
    recoverUser()
  }, [])

  useEffect(() => {
    if (!loading && error) {
      navigate('/sign-in')
    }
  }, [loading, error, navigate])

  useEffect(() => {
    getGarageDetail()
  }, [])

  useEffect(() => {
    console.log(garage)
  }, [garage, garageError])

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }
  return (
    <main className="min-h-screen w-full bg-base-200">
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:gap-10 lg:py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-base-content sm:text-3xl">
            {garage?.location.address ?? 'No encontrado'}
          </h1>
          <p className="text-sm text-base-content/60">
            Información general del garaje seleccionada por el arrendador.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <GarageImgCarousel
              photos={
                garage?.photos ?? [
                  { url: 'https://placehold.co/600x400?text=Garage+1' }
                ]
              }
            />
            <div className="rounded-2xl bg-base-100 p-6 shadow-lg">
              <GarageFeatures
                covered={garage?.covered ?? false}
                hasCameras={garage?.hasCameras ?? false}
                rating={0}
              />
              <GarageDescription description={garage?.description ?? ''} />
              <GarageRestrictions restrictions={garage?.restrictions ?? ''} />
            </div>
          </div>
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl bg-base-100 p-5 shadow-lg">
              <GarageReservationHeader
                price={garage?.price ?? 0}
                rentMode={garage?.rentMode.mode_name ?? 'Hora'}
              />
              <div className="space-y-4">
                {rentMode === 'hora' && <HourFilterForm />}
                {rentMode === 'dia' && <DayFilterForm />}
                {rentMode === 'mes' && <MonthFilterForm />}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Placa</legend>
                  <input
                    type="text"
                    className="input input-bordered max-w-sm"
                    placeholder="Ej. ABC-123"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Modelo de vehículo
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered max-w-sm"
                    placeholder="Ej. Toyota Corolla 2022"
                  />
                </fieldset>
                <input
                  type="button"
                  value="Reservar ahora"
                  className="btn btn-primary max-w-sm"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
