import { Checkbox } from '@shared/components/Checkbox'

export function NewGarageCheckbox() {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Características</legend>
      <Checkbox labelContent="¿Esta techado?" name="covered" />
      <Checkbox labelContent="¿Tiene camaras?" name="hasCameras" />
    </fieldset>
  )
}
