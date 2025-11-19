type GarageDescriptionProps = {
  description: string
}

export function GarageDescription({ description }: GarageDescriptionProps) {
  return (
    <fieldset className="fieldset mt-6">
      <legend className="fieldset-legend">Descripción</legend>
      <div className="rounded-xl border border-dashed border-base-300 bg-base-200/60 p-4 text-sm leading-relaxed text-base-content/80">
        <p>{description}</p>
      </div>
    </fieldset>
  )
}
