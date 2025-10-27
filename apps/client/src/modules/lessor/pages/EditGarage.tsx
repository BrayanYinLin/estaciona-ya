import { EditGarageInfo } from '@lessor/components/EditGarageInfo'
import { EditGarageLocation } from '@lessor/components/EditGarageLocation'
import { ReturnButton } from '@shared/components/ReturnButton'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function EditGarage() {
  const [latitude, setLatitude] = useState<string | null>(null)
  const [longitude, setLongitude] = useState<string | null>(null)

  const navigate = useNavigate()

  const handleUpdate = () => {
    return
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
      <form onSubmit={handleUpdate}>
        <EditGarageLocation
          targetId="editGarageInfo"
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <section id="editGarageInfo">
          <EditGarageInfo />
        </section>
      </form>
    </main>
  )
}
