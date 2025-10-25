type GarageSpaceCardProps = {
  title: string
  photo: string
  rating: number
  disabled: boolean
  address: string
  //   Funciones se pasan como prop o la lógica se puede agregar en este mismo card?s
  onEdit: () => void
  onDisable: () => void
  onDelete: () => void
}

export function GarageSpaceCard({
  title,
  photo,
  rating = 0,
  disabled = false,
  address,
  onEdit,
  onDisable,
  onDelete
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
        <img
          src={photo}
          alt={`Foto del estacionamiento: ${title}`}
          className="h-48 w-full object-cover md:h-full"
        />
      </figure>

      <div className="card-body gap-3">
        <header className="flex items-start justify-between gap-3">
          <h1 className="card-title leading-tight">{title}</h1>

          {disabled && (
            <span className="badge badge-neutral">Deshabilitado</span>
          )}
        </header>

        <p className="text-sm text-base-content/70">{address}</p>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`mask mask-star-2 ${i < rating ? 'bg-yellow-400' : 'bg-gray-300'} w-5 h-5 inline-block`}
            />
          ))}
          <span className="text-sm text-base-content/70">
            <span className="sr-only">Calificación: </span>
            {clampedRating} / 5
          </span>
        </div>

        <div className="card-actions justify-end flex-nowrap pt-2">
          <button className="btn btn-primary" onClick={onEdit}>
            Editar
          </button>

          <button className="btn btn-warning btn-outline" onClick={onDisable}>
            {disabled ? 'Habilitar' : 'Deshabilitar'}
          </button>

          <button className="btn btn-error btn-outline" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </section>
  )
}
