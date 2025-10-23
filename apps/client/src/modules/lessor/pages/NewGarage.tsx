import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { ReturnButton } from '@shared/components/ReturnButton'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    console.log(
      `${formData.get('district')}\n${formData.get('address')}\n${formData.get('price')}\n
      ${formData.get('description')}\n${formData.get('restrictions')}\n${formData.get('rentMode')}\n
      ${formData.get('covered')}\n${formData.get('hasCameras') === 'on'}}`
    )
    console.log(formData.getAll('photos'))
  }

  const handleBack = () => (showInfo ? navigate(-2) : navigate(-1))

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
