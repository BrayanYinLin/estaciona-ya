import type { User } from '@tenant/types'

export type BookingRequest = {
  id: number
  user: User
  garage: {
    location: {
      address: string
    }
  }
  startDate: string
  endDate: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
}

type TenantRequestCardProps = {
  request: BookingRequest
}

const statusClasses = {
  pending: 'bg-yellow-500',
  accepted: 'bg-green-500',
  rejected: 'bg-red-500'
}

export function TenantRequestCard({ request }: TenantRequestCardProps) {
  return (
    <div className="card">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">{request.garage.location.address}</h2>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-bold">Desde:</span>{' '}
            {new Date(request.startDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Hasta:</span>{' '}
            {new Date(request.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Estado:</p>
          <span
            className={`px-2 py-1 text-white rounded-full ${
              statusClasses[request.status]
            }`}
          >
            {request.status}
          </span>
        </div>
      </div>
    </div>
  )
}
