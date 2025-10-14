import { InputPrice } from '@shared/components/InputPrice'
import { InputTextArea } from '@shared/components/InputTextArea'
import { PhotosGarages } from './PhotosGarages'

export function NewGarageInfo() {
  return (
    <section className="flex flex-col lg:flex-row p-5 place-items-center justify-center mx-auto w-full lg:h-screen gap-50">
      <div className="flex flex-col">
        <h2 className="text-2xl">Información del Estacionamiento</h2>

        <InputPrice
          labelContent="Precio"
          name="price" // CAMBIAR
          placeholder="Ingresar el precio de alquiler"
        />

        <InputTextArea
          labelContent="Descripción"
          name="description" // CAMBIAR
          placeholder="Describe tu estacionamiento"
          inputClassName="w-full"
        />

        <InputTextArea
          labelContent="Restricciones"
          name="restrictions" // CAMBIAR
          placeholder="Ingresa todas las restricciones de tu estacionamiento"
          inputClassName="w-full"
        />
      </div>
      <PhotosGarages />
    </section>
  )
}
