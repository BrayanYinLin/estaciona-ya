import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { api } from '@shared/api/api'
import { ReturnButton } from '@shared/components/ReturnButton'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { ErrorAlert } from '@shared/components/ErrorAlert'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)
  const [latitude, setLatitude] = useState<string | null>(null)
  const [longitude, setLongitude] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    const formData = new FormData(e.currentTarget)
    const price = formData.get('price') as string
    const description = formData.get('description') as string
    const rentMode = formData.get('rentMode') as string
    const photos = formData.getAll('photos')

    if (!price || !description || !rentMode) {
      setSubmitError('Por favor completa los campos obligatorios.')
      return
    }

    if (rentMode === 'Selecciona una modalidad') {
      setSubmitError('Debes seleccionar una modalidad de alquiler.')
      return
    }

    const validPhotos = photos.filter(
      (p: FormDataEntryValue) => p instanceof File && p.size > 0
    )
    if (validPhotos.length === 0) {
      setSubmitError('Debes subir al menos una foto del garaje.')
      return
    }

    const hasCameras = formData.get('hasCameras') as string
    const covered = formData.get('covered') as string

    formData.set('hasCameras', hasCameras === 'on' ? 'true' : 'false')
    formData.set('covered', covered === 'on' ? 'true' : 'false')

    if (latitude === null || longitude === null) {
      setSubmitError('Debes seleccionar una ubicación en el mapa.')
      return
    }

    formData.append('latitude', latitude)
    formData.append('longitude', longitude)

    try {
      await api.post('/garage', formData)
      navigate('/lessor/garages')
    } catch (e) {
      setSubmitError('Ocurrió un error al crear el garage. Inténtalo de nuevo.')
      console.error(e)
    }
  }

  const handleBack = () => {
    navigate('/lessor/garages')
  }

  return (
    <main>
      <ReturnButton
        className="relative left-5 top-3 lg:absolute"
        onClick={handleBack}
      />
      <form onSubmit={handleSubmit}>
        <NewGarageLocation
          onNext={() => setShowInfo(true)}
          targetId="garageInfo"
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        {showInfo && (
          <section id="garageInfo">
            {submitError && (
              <div className="container mx-auto px-5 pt-5 max-w-lg">
                <ErrorAlert message={submitError} />
              </div>
            )}
            <NewGarageInfo />
          </section>
        )}
      </form>
    </main>
  )
}
