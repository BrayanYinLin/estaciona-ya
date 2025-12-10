import { useRequestStore } from '@lessor/contexts/request.store'
import { api } from '@shared/api/api'

type RequestStatus = 'pending' | 'approved' | 'rejected'

export interface RequestGarageCardProps {
  id: number
  name: string
  photo?: string
  rentalType: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: RequestStatus
  description: string
  image?: string
}

export function RequestGarageCard({
  id,
  name,
  photo,
  rentalType,
  startDate,
  endDate,
  totalPrice,
  status,
  description,
  image
}: RequestGarageCardProps) {
  const { getRequests } = useRequestStore()

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount)
  }

  const formatDate = () => {
    const start = startDate.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short'
    })
    const end = endDate.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short'
    })
    const startTime = startDate.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    })
    const endTime = endDate.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    let dateContent

    if (rentalType === 'Hora') {
      dateContent = (
        <>
          <span className="text-xs font-bold text-primary uppercase mb-1 block">
            Estadía por hora
          </span>
          <span className="font-bold text-base-content block">{start}</span>
          <span className="text-xs text-base-content/70 block">
            {startTime} - {endTime}
          </span>
        </>
      )
    } else if (rentalType === 'Dia') {
      const isSameDay = start === end
      dateContent = (
        <>
          <span className="text-xs font-bold text-primary uppercase mb-1 block">
            Estadía completa
          </span>
          <span className="font-bold text-base-content block">
            {isSameDay ? start : `${start} - ${end}`}
          </span>
        </>
      )
    } else {
      dateContent = (
        <>
          <span className="text-xs font-bold text-primary uppercase mb-1 block">
            Estadía por mes
          </span>
          <span className="font-bold text-base-content block">
            {start} - {end}
          </span>
        </>
      )
    }

    return (
      <div className="flex flex-col items-center text-center gap-1">
        <div>{dateContent}</div>
        <div className="badge badge-success font-mono mt-1">
          <strong>Total:</strong>
          {formatPrice(totalPrice)}
        </div>
      </div>
    )
  }
  const getStatusBadge = () => {
    const styles: Record<string, string> = {
      pending: 'badge-warning',
      approved: 'badge-success text-white',
      accepted: 'badge-success text-white',
      rejected: 'badge-error text-white'
    }

    const labels: Record<string, string> = {
      pending: 'Pendiente',
      approved: 'Aceptado',
      accepted: 'Aceptado',
      rejected: 'Rechazado'
    }

    return (
      <div className={`badge ${styles[status]} gap-2 font-semibold`}>
        {labels[status]}
      </div>
    )
  }

  const onAccept = async () => {
    console.log(id)
    await api.patch(`/booking-requests/${id}`, {
      status: 'accepted'
    })
    await getRequests()
  }

  const onReject = async () => {
    console.log(id)
    await api.patch(`/booking-requests/${id}`, {
      status: 'rejected'
    })
    await getRequests()
  }

  return (
    <div className="card md:card-side bg-base-100 shadow-lg border border-base-200 min-h-[200px]">
      <figure className="relative w-full md:w-72 h-64 md:h-auto">
        {image ? (
          <img
            src={image}
            alt={description}
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
              <div className="avatar placeholder">
                <div className="bg-gray-700 text-neutral-content rounded-full w-12">
                  {photo ? (
                    <img src={photo} alt={name} />
                  ) : (
                    <p className="text-2xl uppercase flex items-center justify-center pt-1">
                      {name.charAt(0)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between md:justify-start gap-2">
                  <h2 className="card-title text-xl">{name}</h2>
                  <div className="md:hidden scale-90 origin-right">
                    {getStatusBadge()}
                  </div>
                </div>
                <p className="text-sm text-base-content/70">
                  Solicita:{' '}
                  <span className="font-medium text-base-content">
                    {description}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-2 p-3 bg-base-200 rounded-lg w-full md:w-fit md:min-w-[140px] flex justify-center md:block">
              {formatDate()}
            </div>
          </div>

          <div className="flex flex-col justify-between items-end gap-4">
            <div className="hidden md:block">{getStatusBadge()}</div>

            {status === 'pending' && (
              <div className="card-actions justify-end mt-auto">
                <button
                  className="btn btn-outline btn-error"
                  onClick={onReject}
                >
                  Rechazar
                </button>
                <button className="btn btn-primary" onClick={onAccept}>
                  Aceptar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
