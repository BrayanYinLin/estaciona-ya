type GarageRestrictionsProps = {
  restrictions: string
}

export function GarageRestrictions({ restrictions }: GarageRestrictionsProps) {
  return (
    <fieldset className="fieldset mt-6">
      <legend className="fieldset-legend">Restricciones</legend>
      <div className="rounded-xl border border-dashed border-base-300 bg-base-200/60 p-4 text-sm leading-relaxed text-base-content/80">
        <p>{restrictions}</p>
      </div>
    </fieldset>
  )
}
