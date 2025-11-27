import { UserNavBar } from '@shared/components/UserNavBar'
import { HourFilterForm } from '@tenant/components/HourFilterForm'
import { DayFilterForm } from '@tenant/components/DayFilterForm'
import { MonthFilterForm } from '@tenant/components/MonthFilterForm'
import { useUserStore } from '@user/context/user.context'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { GarageImgCarousel } from '@shared/components/GarageImgCarousel'
import { GarageFeatures } from '@tenant/components/GarageFeatures'
import { GarageDescription } from '@tenant/components/GarageDescription'
import { GarageRestrictions } from '@tenant/components/GarageRestrictions'
import { GarageReservationHeader } from '@tenant/components/GarageReservationHeader'
import { useGarageDetail } from '@tenant/hooks/useGarageDetail'
import { GarageDetailHeader } from '@tenant/components/GarageDetailHeader'
import 'react-day-picker/style.css'
import { useGarageReservation } from '@tenant/hooks/useGarageReservation'
import { GarageRatingDetail } from '@tenant/components/GarageRatingDetail'

export function GarageDetail() {
  const { id } = useParams()
  const { user, loading, error, recoverUser } = useUserStore()
  const modalRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  const { garage, getGarageDetail } = useGarageDetail(Number(id))
  const {
    rangeDate,
    setRangeDate,
    rentMode,
    selectedDays,
    totalCost,
    handleRequest
  } = useGarageReservation(garage, Number(id))

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

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }
  return (
    <main className="min-h-screen w-full bg-base-200">
      <UserNavBar profilePic={user?.photo ?? null} role={user?.role} />
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:gap-10 lg:py-10">
        <GarageDetailHeader address={garage?.location.address} />
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
            <div className="rounded-2xl bg-base-100 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <GarageRatingDetail rating={4.5} />
                <button className="btn btn-outline btn-primary">
                  Escribe una opinión
                </button>
              </div>
            </div>
          </div>
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl bg-base-100 p-5 shadow-lg">
              <GarageReservationHeader
                price={garage?.price ?? 0}
                rentMode={garage?.rentMode.mode_name ?? 'Hora'}
              />
              <div className="space-y-4">
                {rentMode === 'hora' && (
                  <HourFilterForm
                    rangeDate={rangeDate}
                    setRangeDate={setRangeDate}
                  />
                )}
                {rentMode === 'dia' && (
                  <>
                    <DayFilterForm
                      rangeDate={rangeDate}
                      setRangeDate={setRangeDate}
                    />
                    <div className="mt-4 flex flex-col gap-2 border-t border-base-300 pt-4">
                      <div className="flex justify-between text-base-content/70">
                        <span>Días seleccionados:</span>
                        <span className="font-bold text-base-content">
                          {selectedDays}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Total estimado:</span>
                        <span>S/{totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
                {rentMode === 'mes' && (
                  <MonthFilterForm
                    rangeDate={rangeDate}
                    setRangeDate={setRangeDate}
                  />
                )}

                {/* <fieldset className="fieldset">
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
                </fieldset> */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  type="button"
                  className="btn btn-primary max-w-sm"
                  onClick={() => {
                    document.getElementById('my_modal_1')!.showModal()
                  }}
                >
                  Solicitar ahora
                </button>
                <dialog ref={modalRef} className="modal" id="my_modal_1">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirmar solicitud</h3>
                    <div className="modal-action">
                      <form method="dialog" className="flex gap-3">
                        <button className="btn">Close</button>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleRequest}
                        >
                          Aceptar
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
