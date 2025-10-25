import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { api } from '@shared/api/api'
import { ReturnButton } from '@shared/components/ReturnButton'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)
  const [latitude, setLatitude] = useState<string | null>(null)
  const [longitude, setLongitude] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const hasCameras = formData.get('hasCameras') as string
    const covered = formData.get('covered') as string

    formData.set('hasCameras', hasCameras === 'on' ? 'true' : 'false')
    formData.set('covered', covered === 'on' ? 'true' : 'false')

    if (latitude === null || longitude === null) {
      return
    }

    formData.append('latitude', latitude)
    formData.append('longitude', longitude)

    api.post('/garage', formData).then(() => navigate('/lessor/garages'))
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
            <NewGarageInfo />
          </section>
        )}
      </form>
    </main>
  )
}
