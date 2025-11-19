export function MonthFilterForm() {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
  const actualMonth = new Date().getMonth()
  const availableMonths = months.slice(actualMonth)
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Desde</legend>
        <select
          defaultValue="Pick a browser"
          className="select"
          name="startMonth"
        >
          <option disabled={true}>Selecciona un mes</option>
          {availableMonths.map((month, index) => (
            <option value={month} key={index}>
              {month}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Hasta</legend>
        <select
          defaultValue="Pick a browser"
          className="select"
          name="endMonth"
        >
          <option disabled={true}>Selecciona un mes</option>
          {availableMonths.map((month, index) => (
            <option value={month} key={index}>
              {month}
            </option>
          ))}
        </select>
      </fieldset>
    </>
  )
}
