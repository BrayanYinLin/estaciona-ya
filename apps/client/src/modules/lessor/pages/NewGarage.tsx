import { NewGarageInfo } from '@lessor/components/NewGarageInfo'
import { NewGarageLocation } from '@lessor/components/NewGarageLocation'
import { useState } from 'react'

export function NewGarage() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <main>
      <NewGarageLocation
        onNext={() => setShowInfo(true)}
        targetId="garageInfo"
      />
      {showInfo && (
        <section id="garageInfo">
          <NewGarageInfo />
        </section>
      )}
    </main>
  )
}
