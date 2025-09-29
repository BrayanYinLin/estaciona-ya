export type SelectProps = {
  labelContent: string
  name: string
  defaultValue: string
  options: Record<string, string>
}

export function Select({
  labelContent,
  name,
  defaultValue,
  options
}: SelectProps) {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{labelContent}</legend>
        <select
          defaultValue={defaultValue}
          name={name}
          className="select md:w-full"
        >
          <option disabled={true} value={defaultValue}>
            {defaultValue}
          </option>
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {Object.entries(options).map(([_key, val], index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
      </fieldset>
    </>
  )
}
