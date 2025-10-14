import { InputText } from '@shared/components/InputText'
import { Select } from '@shared/components/Select'
import { DISTRICTS } from '@shared/constants/districts'

export function NewGarageLocation() {
  return (
    <section className="flex flex-col lg:flex-row p-5 place-items-center justify-center mx-auto w-full lg:h-screen gap-50">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl">¿Dónde está tu estacionamiento?</h2>
        <Select
          labelContent="Distrito"
          name="district"
          defaultValue="Selecciona tu distrito"
          options={DISTRICTS}
        />
        <InputText
          labelContent="Ingresa la dirección detallada"
          name="address" // CAMBIAR
          placeholder="Calle / Avenida / Mz."
        />

        <button className="btn btn-primary w-25">Siguiente</button>
      </div>
      <img src="https://placehold.co/400x400" alt="Map" />
    </section>
  )
}
