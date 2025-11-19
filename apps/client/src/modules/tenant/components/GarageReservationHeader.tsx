type GarageReservationHeaderProps = {
  price: number
  rentMode: string
}

export function GarageReservationHeader({
  price,
  rentMode
}: GarageReservationHeaderProps) {
  return (
    <>
      <p className="text-sm uppercase tracking-wide text-base-content/60">
        Reserva tu espacio
      </p>
      <h3 className="mt-1 text-2xl font-semibold text-base-content">
        S/ {price}{' '}
        <span className="text-sm font-normal text-base-content/60">
          /{rentMode}
        </span>
      </h3>
      <p className="mb-4 text-sm text-base-content/70">
        Selecciona horario y vehículo para continuar.
      </p>
    </>
  )
}
