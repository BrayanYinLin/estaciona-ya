import type { Garage } from '@tenant/services/garage.service'
import { GarageCatalogCard } from './GarageCatalogCard'

export function GarageCatalogGrid({ garages }: { garages: Garage[] }) {
  return (
    <div className="px-4 pb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-items-center">
        {garages.map((garage) => (
          <GarageCatalogCard
            key={garage.id}
            id={garage.id}
            address={garage.location.address}
            price={garage.price}
            rentMode={garage.rentMode.mode_name}
            imageUrl={garage.photos[0].url ?? 'https://placehold.co/600x400'}
            covered={garage.covered}
            hasCamera={garage.hasCameras}
          />
        ))}
      </div>
    </div>
  )
}
