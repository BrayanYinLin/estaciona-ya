import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { useState, type FormEvent } from 'react'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
