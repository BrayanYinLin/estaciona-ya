type GarageDetailHeaderProps = {
  address: string | undefined
  owner: string | undefined
}

export function GarageDetailHeader({
  address,
  owner
}: GarageDetailHeaderProps) {
  return (
    <header className="flex flex-col-reverse lg:flex-row lg:justify-between gap-3 items-center">
      <div>
        <h1 className="text-2xl font-semibold text-base-content sm:text-3xl">
          {address ?? 'No encontrado'}
        </h1>
        <p className="text-sm text-base-content/60">
          Información general del garaje seleccionada por el arrendador.
        </p>
      </div>
      <div className="flex flex-col">
        <p className="text-base-content/60 text-xs lg:text-md">
          Publicado por:
        </p>
        <p className="font-bold text-md lg:text-lg">
          {owner ?? 'No encontrado'}
        </p>
      </div>
    </header>
  )
}
