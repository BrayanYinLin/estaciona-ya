import { CheckIcon } from '@shared/components/CheckIcon'

const features = [
  {
    icon: <CheckIcon className="stroke-info" />,
    message: 'Pago seguro'
  },
  {
    icon: <CheckIcon className="stroke-info" />,
    message: 'Servicio las 24 horas'
  },
  {
    icon: <CheckIcon className="stroke-info" />,
    message: 'Servicio confiable'
  }
]

export function NewHero() {
  return (
    <section className="min-h-screen flex bg-[url(/img/garage.jpg)] bg-left items-center p-8 lg:bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-white lg:text-black text-xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              Renta tu estacionamiento
              <br />
              <span className="text-info">fácil y rápido</span>
            </h1>

            <div className="my-8 space-y-2 lg:space-y-5">
              {features.map(({ icon, message }) => (
                <p className="flex text-xs md:text-lg lg:text-lg items-center -mx-2 text-white lg:text-black">
                  {icon}

                  <span className="mx-2">{message}</span>
                </p>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <button className="px-8 py-4 btn btn-lg text-white btn-info font-semibold hover:scale-105 transition-transform">
                Empezar
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative order-1 md:order-2">
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/img/garage.jpg"
                className="h-full w-full absolute object-cover -z-10 inset-0 rounded-3xl transform scale-105"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl transform scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
