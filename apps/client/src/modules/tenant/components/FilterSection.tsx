import { SelectRentMode } from '@lessor/components/SelectRentMode'
import { useRentMode } from '@lessor/hooks/useRentMode'
import { HourFilterForm } from './HourFilterForm'
import { DayFilterForm } from './DayFilterForm'
import { MonthFilterForm } from './MonthFilterForm'
import { FilterCheckboxes } from './FilterCheckboxes'
import { PriceRangeFilter } from '@shared/components/PriceRangeFilter'
import { useDistricts } from '@lessor/hooks/useDistricts'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import type { GarageFilters } from '../services/garage.service'
import 'react-day-picker/style.css'
import { SelectFilterDistrict } from './SelectFilterDistrict'

type ModeFilter = '' | 'hora' | 'dia' | 'mes'

type FilterSectionProps = {
  filters: GarageFilters
  onFiltersChange: Dispatch<SetStateAction<GarageFilters>>
}

export function FilterSection({
  filters,
  onFiltersChange
}: FilterSectionProps) {
  const { rentModes } = useRentMode()
  const { districts } = useDistricts()
  const selectedMode = (filters.mode as ModeFilter) ?? ''

  const updateFilters = (partial: Partial<GarageFilters>) => {
    onFiltersChange((current) => ({
      ...current,
      ...partial
    }))
  }

  const handleRentMode = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.options[event.target.selectedIndex]
    if (!option || option.disabled) {
      updateFilters({ mode: undefined })
      return
    }

    const selectedValue = option.text.toLowerCase() as ModeFilter
    updateFilters({ mode: selectedValue || undefined })
  }

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.options[event.target.selectedIndex]
    updateFilters({
      district: option?.disabled ? undefined : event.target.value
    })
  }

  const handleFeatureChange = (
    name: 'covered' | 'hasCameras',
    checked: boolean
  ) => {
    updateFilters({
      [name]: checked ? true : undefined
    } as Partial<GarageFilters>)
  }

  return (
    <form className="space-y-4">
      <SelectRentMode
        labelContent="Modalidad"
        name="rentMode"
        options={rentModes}
        defaultValue="Selecciona una modalidad"
        onChange={handleRentMode}
      />
      <SelectFilterDistrict
        labelContent="Distrito"
        name="district"
        defaultValue="Selecciona un distrito"
        options={districts}
        onChange={handleDistrictChange}
      />
      {selectedMode === 'hora' && <HourFilterForm />}
      {selectedMode === 'dia' && <DayFilterForm />}
      {selectedMode === 'mes' && <MonthFilterForm />}
      <PriceRangeFilter />
      <FilterCheckboxes
        value={{ covered: filters.covered, hasCameras: filters.hasCameras }}
        onChange={handleFeatureChange}
      />
    </form>
  )
}
