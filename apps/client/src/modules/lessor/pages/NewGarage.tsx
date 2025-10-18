import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { useState, type FormEvent } from 'react'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)

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

  return (
    <main>
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
