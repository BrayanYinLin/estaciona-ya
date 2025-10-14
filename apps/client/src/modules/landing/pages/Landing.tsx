import { Card } from '@shared/components/Card'
import { Navbar } from '../components/Navbar'
import { ShieldIcon } from '@shared/components/ShieldIcon'
import { RingIcon } from '@shared/components/RingIcon'
import { AdvancedSearchIcon } from '@shared/components/AdvancedSearchIcon'
import { Footer } from '@shared/components/Footer'
import { NewHero } from '@landing/components/NewHero'

const features = [
  {
    icon: <ShieldIcon color="stroke-cyan-400 fill-cyan-400 stroke-[1px]" />,
    title: 'Reservas seguras',
    description:
      'Protege tus datos y transacciones con un sistema de seguridad de nivel empresarial, diseñado para garantizar confianza en cada reserva.'
  },
  {
    icon: <RingIcon color="stroke-cyan-400" />,
    title: 'Notificaciones',
    description:
      'Mantente al tanto en todo momento con alertas instantáneas y recordatorios inteligentes que llegan directo a tu dispositivo.'
  },
  {
    icon: <AdvancedSearchIcon color="stroke-cyan-400" />,
    title: 'Busqueda avanzada',
    description:
      'Encuentra exactamente lo que necesitas con filtros inteligentes y resultados precisos que te ahorran tiempo y esfuerzo en cada búsqueda.'
  }
]
export function Landing() {
  return (
    <main>
      <Navbar />
      <NewHero />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12 px-5 pb-50">
        {features.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </section>
      <Footer />
    </main>
  )
}
