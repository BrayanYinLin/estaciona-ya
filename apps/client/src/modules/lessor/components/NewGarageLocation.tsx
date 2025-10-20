import { useDistricts } from '@lessor/hooks/useDistricts'
import { InputText } from '@shared/components/InputText'
import { SelectDistrict } from './SelectDistrict'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@lessor/hooks/useDebounce'
import {
  LocationService,
  type LocationResponse
} from '@lessor/services/location.service'

type NewGarageLocationInputProps = {
  onNext: () => void
  targetId: string
}

export function NewGarageLocation({
  onNext,
  targetId
}: NewGarageLocationInputProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 1500)
  const [location, setLocation] = useState<LocationResponse | null>(null)

  const select = useRef<HTMLSelectElement | null>(null)
  const { districts } = useDistricts()
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [disabledInfo, setDisabledInfo] = useState<boolean>(false)

  useEffect(() => {
    const district = select.current?.value?.trim()
    const address = debouncedQuery.trim()

    if (!address || !district) return

    const fetchLocation = async () => {
      try {
        const districtSelected = districts.find(
          (d) => d.id === Number(district)
        )
        const data = await LocationService.getLocationByAddress(
          address,
          districtSelected?.name ?? ''
        )
        setLocation(data)
        setError(null)
      } catch (error) {
        setLocation(null)
        setError((error as Error).message)
      }
    }
    fetchLocation()
  }, [debouncedQuery])

  const handleSelectChange = () => {
    setDisabled(true)
  }
  const handleInputChange = () => {
    setDisabledInfo(true)
  }

  return (
    <section className="flex flex-col lg:flex-row p-5 place-items-center justify-center mx-auto w-full lg:h-screen gap-5 lg:gap-50">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl">¿Dónde está tu estacionamiento?</h2>

        <SelectDistrict
          labelContent="Distrito"
          name="district"
          defaultValue="Selecciona tu distrito"
          options={districts}
          ref={select}
          onChange={handleSelectChange}
        />

        <InputText
          labelContent="Ingresa la dirección detallada"
          name="address"
          placeholder="Calle / Avenida / Mz."
          onChange={(e) => {
            handleInputChange()
            setQuery(e.target.value)
          }}
          disabled={!disabled}
        />

        <a
          className={`btn btn-primary w-25 ${disabledInfo ? 'btn-primary' : 'btn-disabled'}`}
          onClick={() => {
            onNext()
          }}
          href={`#${targetId}`}
        >
          Siguiente
        </a>
      </div>

      {location ? (
        <iframe
          width="400"
          height="400"
          style={{ border: '0px' }}
          loading="lazy"
          src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&hl=es&z=14&output=embed`}
          className="w-[340px] h-[340px] lg:w-[400px] lg:h-[400px]"
        ></iframe>
      ) : (
        <img
          src={`https://placehold.co/400x400/00bafe/FFF?text=${
            !location && !error
              ? 'Ingresa+tu+dirección'
              : 'Dirección+no+encontrada'
          }`}
          alt="Map"
        />
      )}
    </section>
  )
}
