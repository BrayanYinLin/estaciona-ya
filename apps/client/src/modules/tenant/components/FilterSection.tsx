import { SelectRentMode } from '@lessor/components/SelectRentMode'
import { useRentMode } from '@lessor/hooks/useRentMode'
import { useState } from 'react'
import { HourFilterForm } from './HourFilterForm'
import 'react-day-picker/style.css'
import { DayFilterForm } from './DayFilterForm'
import { MonthFilterForm } from './MonthFilterForm'

export function FilterSection() {
  const { rentModes } = useRentMode()
  const [mode, setMode] = useState<'hora' | 'dia' | 'mes' | ''>('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue =
      e.target.options[e.target.selectedIndex].text.toLowerCase()
    setMode(selectedValue as 'hora' | 'dia' | 'mes' | '')
  }
  return (
    <section>
      <SelectRentMode
        labelContent="Modalidad"
        name="rentMode"
        options={rentModes}
        defaultValue="Selecciona una modalidad"
        onChange={handleChange}
      />
      <div>
        {mode === 'hora' && <HourFilterForm />}
        {mode === 'dia' && <DayFilterForm />}
        {mode === 'mes' && <MonthFilterForm />}
      </div>
    </section>
  )
}
