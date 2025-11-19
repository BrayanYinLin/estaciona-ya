type GarageImgCarouselProps = {
  photos: { url: string }[]
}

export function GarageImgCarousel({ photos }: GarageImgCarouselProps) {
  if (photos.length === 0) {
    return null
  }

  const totalSlides = photos.length

  return (
    <div className="overflow-hidden rounded-2xl bg-base-100 shadow-lg">
      <div className="carousel w-full">
        {photos.map((photo, index) => {
          const slideNumber = index + 1
          // Navegación circular: anterior y siguiente
          const prevSlide = index === 0 ? totalSlides : index
          const nextSlide = index === totalSlides - 1 ? 1 : slideNumber + 1

          return (
            <div
              key={photo.url}
              id={`slide${slideNumber}`}
              className="carousel-item relative w-full"
            >
              <img
                src={photo.url}
                className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]"
                alt={`Foto ${slideNumber} del garaje`}
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${prevSlide}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${nextSlide}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
