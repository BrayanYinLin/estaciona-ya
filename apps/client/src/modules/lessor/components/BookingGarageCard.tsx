interface BookingGarageCardProps {
  id: number
  garageName: string
  garageImage?: string
  startDate: string
  endDate: string
  totalPrice: number
  status: string
  userName?: string
  userRole?: string
}

export function BookingGarageCard({
  id,
  garageName,
  garageImage,
  startDate,
  endDate,
  totalPrice,
  status,
  userName,
  userRole
}: BookingGarageCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount)
  }

  const formatDate = () => {
    const start = new Date(startDate).toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short'
    })
    const end = new Date(endDate).toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short'
    })
    const startTime = new Date(startDate).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    })
    const endTime = new Date(endDate).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    // Logic to determine "rentalType" is not explicitly passed in Booking props,
    // but we can infer or simpler display.
    // For now, I'll show the generic date range nicely.

    return (
      <div className="flex flex-col items-center text-center gap-1">
        <div>
          <span className="font-bold text-base-content block">
            {start} - {end}
          </span>
          <span className="text-xs text-base-content/70 block">
            {startTime} - {endTime}
          </span>
        </div>
        <div className="badge badge-success font-mono mt-1">
          <strong>Total:</strong>
          {formatPrice(totalPrice)}
        </div>
      </div>
    )
  }

  const getStatusBadge = () => {
    const styles: Record<string, string> = {
      unpaid: 'badge-warning',
      paid: 'badge-success text-white',
      cancelled: 'badge-error text-white',
      active: 'badge-info text-white',
      completed: 'badge-success text-white'
    }

    const labels: Record<string, string> = {
      unpaid: 'Por pagar',
      paid: 'Pagado',
      cancelled: 'Cancelado',
      active: 'Activo',
      completed: 'Completado'
    }

    return (
      <div
        className={`badge ${styles[status] ?? 'badge-ghost'} gap-2 font-semibold`}
      >
        {labels[status] ?? status}
      </div>
    )
  }

  return (
    <div className="card md:card-side bg-base-100 shadow-lg border border-base-200 min-h-[200px]">
      <figure className="relative w-full md:w-72 h-64 md:h-auto">
        {garageImage ? (
          <img
            src={garageImage}
            alt={garageName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-200 text-base-content/50">
            <span className="text-sm">Sin foto</span>
          </div>
        )}
      </figure>

      <div className="card-body p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              {/* User Info Placeholder since we might not have photo/name */}
              <div className="avatar placeholder">
                <div className="bg-gray-700 text-neutral-content rounded-full w-12">
                  <p className="text-2xl uppercase flex items-center justify-center pt-1">
                    {userName ? userName.charAt(0) : 'U'}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <h2 className="card-title text-xl">{garageName}</h2>
                  <div className="md:hidden scale-90 origin-right">
                    {getStatusBadge()}
                  </div>
                </div>
                <p className="text-sm text-base-content/70">
                  Usuario:{' '}
                  <span className="font-medium text-base-content">
                    {userName ?? `ID: ${id}`}
                  </span>
                  {userRole && (
                    <span className="text-xs ml-2 badge badge-ghost badge-sm">
                      {userRole}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-2 p-3 bg-base-200 rounded-lg w-full md:w-fit md:min-w-[140px] flex justify-center md:block">
              {formatDate()}
            </div>
          </div>

          <div className="flex flex-col justify-between items-end gap-4">
            <div className="hidden md:block">{getStatusBadge()}</div>
            {/* No actions defined yet */}
          </div>
        </div>
      </div>
    </div>
  )
}
