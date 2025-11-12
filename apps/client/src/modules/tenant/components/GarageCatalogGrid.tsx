import { GarageCatalogCard } from './GarageCatalogCard'

type Garage = {
  id: number
  address: string
  price: number
  rating: number
  rentMode: string
  imageUrl: string
  covered: boolean
  hasCamera: boolean
}

export function GarageCatalogGrid({ garages }: { garages: Garage[] }) {
  return (
    <div className="px-4 pb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-items-center">
        {garages.map((garage) => (
          <GarageCatalogCard
            key={garage.id}
            address={garage.address}
            price={garage.price}
            rating={garage.rating}
            rentMode={garage.rentMode}
            imageUrl={garage.imageUrl}
            covered={garage.covered}
            hasCamera={garage.hasCamera}
          />
        ))}
      </div>
    </div>
  )
}
