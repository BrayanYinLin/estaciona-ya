import { CameraIcon } from '@shared/components/CameraIcon'
import { CoveredIcon } from '@shared/components/CoveredIcon'
import { RatingStars } from '@shared/components/RatingStars'

type GarageCatalogCardProps = {
  address: string
  price: number
  rating: number
  imageUrl: string
  rentMode: string
  covered: boolean
  hasCamera: boolean
}

export function GarageCatalogCard({
  address: title,
  price,
  rating,
  imageUrl,
  rentMode,
  covered = false,
  hasCamera = false
}: GarageCatalogCardProps) {
  return (
    <article className="card bg-base-100 w-80 lg:w-65 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 ring-primary/30">
      {/* Card Title */}
      <figure className="relative">
        <div className="absolute left-3 top-3 z-10 flex gap-2">
          {covered && (
            <span className="badge badge-neutral badge-sm">Techado</span>
          )}
          {hasCamera && (
            <span className="badge badge-info badge-sm">Vigilado</span>
          )}
        </div>
        <img
          src={imageUrl}
          alt={`Foto de ${title}`}
          className="w-full aspect-[4/3] object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body gap-3">
        <header className="flex items-start justify-between">
          <h2 className="card-title text-base-content/90 leading-snug pr-2 line-clamp-2">
            {title}
          </h2>
          <div className="text-right">
            <div className="text-lg font-semibold">S/{price}</div>
            <div className="text-xs text-base-content/60">/{rentMode}</div>
          </div>
        </header>
        <div className="flex items-center gap-3 text-base-content/80">
          <div
            className="tooltip tooltip-bottom"
            data-tip={covered ? 'Espacio techado' : 'No techado'}
          >
            <CoveredIcon marked={covered} />
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip={hasCamera ? 'Cámara de seguridad' : 'Sin cámara'}
          >
            <CameraIcon marked={hasCamera} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <RatingStars rating={rating} />

          <div className="card-actions">
            <button
              className="btn btn-primary btn-sm"
              aria-label={`Reservar ${title}`}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
