import { CameraIcon } from '@shared/components/CameraIcon'
import { CoveredIcon } from '@shared/components/CoveredIcon'

type GarageSpaceCardProps = {
  address: string
  photo: string
  rating: number
  disabled: boolean
  price: number
  rentMode: string
  isCovered: boolean
  hasCameras: boolean
  //   Funciones se pasan como prop o la lógica se puede agregar en este mismo card?s
  onEdit: () => void
  onDisable: () => void
}

export function GarageSpaceCard({
  address,
  photo,
  rating = 0,
  disabled = false,
  price,
  rentMode,
  isCovered,
  hasCameras,
  onEdit,
  onDisable
}: GarageSpaceCardProps) {
  const clampedRating = Math.max(0, Math.min(5, Math.round(rating)))

  return (
    <section
      className={[
        'card bg-base-100 shadow-lg md:card-side',
        disabled ? 'opacity-80' : ''
      ].join(' ')}
    >
      <figure className="md:max-w-xs md:w-64">
        <img src={photo} className="h-48 w-full object-cover md:h-full" />
      </figure>

      <div className="card-body gap-3">
        <header className="flex items-center gap-3">
          <h1 className="card-title leading-tight md:text-xl">{address}</h1>
          <div className="badge badge-sm badge-outline badge-primary">
            <strong>Modalidad:</strong> {rentMode}
          </div>

          {disabled && (
            <span className="badge badge-neutral">Deshabilitado</span>
          )}
        </header>

        <span className="text-sm text-base-content/70">S/{price}</span>

        <div className="flex gap-3">
          <CoveredIcon marked={isCovered} />
          <CameraIcon marked={hasCameras} />
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`mask mask-star-2 ${i < clampedRating ? 'bg-yellow-400' : 'bg-gray-300'} w-3 h-3 inline-block`}
            />
          ))}
        </div>

        <div className="card-actions justify-end flex-nowrap pt-2">
          <button className="btn btn-primary" onClick={onEdit}>
            Editar
          </button>

          <button className="btn btn-warning btn-outline" onClick={onDisable}>
            {disabled ? 'Habilitar' : 'Deshabilitar'}
          </button>
          <button
            className="btn btn-error btn-outline"
            onClick={() => document.getElementById('my_modal_3')!.showModal()}
          >
            Eliminar
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Eliminar garaje</h3>
              <p className="py-4">
                ¿Desea eliminar este garaje? Presione el botón debajo para
                confirmar
              </p>
              <div className="flex justify-end w-full">
                <button className="btn btn-error ml-auto">Eliminar</button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  )
}
