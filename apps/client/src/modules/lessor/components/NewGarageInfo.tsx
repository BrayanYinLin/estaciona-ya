import { InputPrice } from '@shared/components/InputPrice'
import { InputTextArea } from '@shared/components/InputTextArea'
import { PhotosGarages } from './PhotosGarages'
import { NewGarageCheckbox } from './NewGarageCheckbox'
import { useRentMode } from '@lessor/hooks/useRentMode'
import { SelectRentMode } from './SelectRentMode'

export function NewGarageInfo() {
  const { rentModes } = useRentMode()
  return (
    <section className="flex flex-col lg:flex-row p-5 place-items-center lg:place-items-start justify-center mx-auto w-full lg:h-screen gap-5 lg:gap-50">
      <div className="flex flex-col justify-start">
        <h2 className="text-2xl">Información del Estacionamiento</h2>

        <InputPrice
          labelContent="Precio"
          name="price"
          placeholder="Ingresar el precio de alquiler"
          isRequired={true}
        />

        <InputTextArea
          labelContent="Descripción"
          name="description"
          placeholder="Describe tu estacionamiento"
          inputClassName="w-full"
          isRequired={true}
        />

        <InputTextArea
          labelContent="Restricciones"
          name="restrictions"
          placeholder="Ingresa todas las restricciones de tu estacionamiento"
          inputClassName="w-full"
          isRequired={true}
        />

        <SelectRentMode
          labelContent="Modalidad"
          name="rentMode"
          options={rentModes}
          defaultValue="Selecciona una modalidad"
          required={true}
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
