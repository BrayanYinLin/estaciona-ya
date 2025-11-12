import { Checkbox } from '@shared/components/Checkbox'

export function FilterCheckboxes() {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Características</legend>
      <Checkbox labelContent="Techado" name="covered" />
      <Checkbox labelContent="Cámaras" name="hasCameras" />
    </fieldset>
  )
}
