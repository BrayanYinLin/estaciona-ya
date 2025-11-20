type GarageDetailHeaderProps = {
  address: string | undefined
}

export function GarageDetailHeader({ address }: GarageDetailHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-base-content sm:text-3xl">
        {address ?? 'No encontrado'}
      </h1>
      <p className="text-sm text-base-content/60">
        Información general del garaje seleccionada por el arrendador.
      </p>
    </header>
  )
}
