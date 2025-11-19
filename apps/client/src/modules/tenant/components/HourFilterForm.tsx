export function HourFilterForm() {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Fecha</legend>
        <input type="date" className="input" />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hora de Inicio</legend>
        <input type="time" className="input" />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hora de Fin</legend>
        <input type="time" className="input" />
      </fieldset>
    </>
  )
}
