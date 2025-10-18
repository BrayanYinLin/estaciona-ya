import { InputPrice } from '@shared/components/InputPrice'
import { InputTextArea } from '@shared/components/InputTextArea'
import { PhotosGarages } from './PhotosGarages'
import { Select } from '@shared/components/Select'
import { NewGarageCheckbox } from './NewGarageCheckbox'

export function NewGarageInfo() {
  return (
    <section className="flex flex-col lg:flex-row p-5 place-items-center lg:place-items-start justify-center mx-auto w-full lg:h-screen gap-5 lg:gap-50">
      <div className="flex flex-col justify-start">
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

        <Select
          labelContent="Modalidad"
          name="modality" // CAMBIAR
          options={{ HOUR: 'Por Hora', DAY: 'Por dia', MONTH: 'Por mes' }}
          defaultValue="Renta por día"
        />
        <NewGarageCheckbox />
        <button className="btn btn-primary mt-4 hidden lg:block" type="submit">
          Registrar
        </button>
      </div>
      <PhotosGarages />
      <button className="btn btn-primary lg:hidden" type="submit">
        Registrar
      </button>
    </section>
  )
}
