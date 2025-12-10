interface BookingTenantCardProps {
  id: number
  garageImage?: string
  address?: string
  lessorName?: string
  covered: boolean
  hasCameras: boolean
  startDate: string
  endDate: string
  totalPrice: number
  status: string
  onPay: () => void
}

export function BookingTenantCard({
  id,
  garageImage,
  address,
  lessorName,
  covered,
  hasCameras,
  startDate,
  endDate,
  totalPrice,
  status,
  onPay
}: BookingTenantCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = () => {
    // Just to usage id and avoid linter error until we used it properly in actions
    if (!id) console.log('Booking ID missing')

    const styles: Record<string, string> = {
      pending_payment: 'badge-warning',
      paid: 'badge-success text-white',
      cancelled: 'badge-error text-white',
      completed: 'badge-success text-white'
    }

    const labels: Record<string, string> = {
      pending_payment: 'Pendiente de Pago',
      paid: 'Pagado',
      cancelled: 'Cancelado',
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
            alt="Garage"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-200 text-base-content/50">
            <span className="text-sm">Sin foto</span>
          </div>
        )}
      </figure>

      <div className="card-body p-6 w-full">
        <div className="flex flex-col md:flex-row justify-between gap-4 h-full">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="card-title text-xl mb-1">
                  {address ?? 'Dirección no disponible'}
                </h2>
                {lessorName && (
                  <p className="text-sm text-base-content/70">
                    Arrendador:{' '}
                    <span className="font-semibold">{lessorName}</span>
                  </p>
                )}
              </div>
              <div className="md:hidden">{getStatusBadge()}</div>
            </div>

            <div className="flex gap-2 mt-2">
              {covered && <div className="badge badge-outline">Techado</div>}
              {hasCameras && <div className="badge badge-outline">Cámaras</div>}
            </div>

            <div className="flex flex-col gap-1 mt-4 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold w-16">Inicio:</span>
                <span>
                  {formatDate(startDate)} - {formatTime(startDate)}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-16">Fin:</span>
                <span>
                  {formatDate(endDate)} - {formatTime(endDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end gap-4 min-w-[140px]">
            <div className="hidden md:block">{getStatusBadge()}</div>

            <div className="flex flex-col items-end gap-2 w-full">
              <div className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </div>

              {status === 'pending_payment' && (
                <button
                  className="btn btn-primary w-full md:w-auto"
                  onClick={onPay}
                >
                  Pagar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
