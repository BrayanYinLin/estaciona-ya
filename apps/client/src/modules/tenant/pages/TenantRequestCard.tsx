import type { User } from '@tenant/types'

export type BookingRequest = {
  id: number
  user: User
  garage: {
    photos: { url: string }[]
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

export function TenantRequestCard({ request }: TenantRequestCardProps) {
  return (
    <>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img src={request.garage.photos[0].url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {request.garage.location.address}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p>
            Desde {new Date(request.startDate).toLocaleDateString()} hasta{' '}
            {new Date(request.endDate).toLocaleDateString()}
          </p>
          <div className="card-actions justify-end">
            {request.status === 'pending' && (
              <div className="badge badge-soft badge-warning">Pendiente</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
