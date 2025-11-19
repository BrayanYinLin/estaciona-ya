import { Checkbox } from '@shared/components/Checkbox'
import type { GarageFilters } from '../services/garage.service'

type FilterCheckboxesProps = {
  value?: Pick<GarageFilters, 'covered' | 'hasCameras'>
  onChange: (name: 'covered' | 'hasCameras', checked: boolean) => void
}

export function FilterCheckboxes({ value, onChange }: FilterCheckboxesProps) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Características</legend>
      <Checkbox
        labelContent="Techado"
        name="covered"
        checked={Boolean(value?.covered)}
        onChange={(event) => onChange('covered', event.target.checked)}
      />
      <Checkbox
        labelContent="Cámaras"
        name="hasCameras"
        checked={Boolean(value?.hasCameras)}
        onChange={(event) => onChange('hasCameras', event.target.checked)}
      />
    </fieldset>
  )
}
