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
      <article className="flex rounded-xl bg-base-100 shadow-sm">
        <figure className="w-2/6">
          <img
            src={request.garage.photos[0].url}
            alt="Shoes"
            className="rounded-s-xl"
          />
        </figure>

        <section className="w-full p-6 flex flex-col justify-between">
          <h2 className="card-title">{request.garage.location.address}</h2>
          <div className="flex justify-between">
            <p>
              Desde{' '}
              <div className="badge badge-accent text-white font-semibold">
                {new Date(request.startDate).toLocaleDateString()}
              </div>{' '}
              hasta{' '}
              <div className="badge badge-accent text-white font-semibold">
                {new Date(request.endDate).toLocaleDateString()}
              </div>
            </p>

            {request.status === 'pending' && (
              <div className="badge badge-soft badge-warning">Pendiente</div>
            )}
          </div>
        </section>
      </article>
    </>
  )
}
