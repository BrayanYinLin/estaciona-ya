import { CameraIcon } from '@shared/components/CameraIcon'
import { CoveredIcon } from '@shared/components/CoveredIcon'
// import { RatingStars } from '@shared/components/RatingStars'

type GarageFeaturesProps = {
  covered: boolean
  hasCameras: boolean
  rating?: number
}

export function GarageFeatures({
  covered,
  hasCameras
  // rating = 0
}: GarageFeaturesProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-base-content/80">
        <CoveredIcon marked={covered} />
        <span>{covered ? 'Espacio cubierto' : 'Espacio sin techar'}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-base-content/80">
        <CameraIcon marked={hasCameras} />
        <span>{hasCameras ? 'Con cámaras' : 'Sin cámaras'}</span>
      </div>
      {/* <div className="flex items-center gap-2 text-sm text-base-content/80">
        <RatingStars rating={rating ?? 0} />
        <span>Calificación promedio</span>
      </div> */}
    </div>
  )
}
