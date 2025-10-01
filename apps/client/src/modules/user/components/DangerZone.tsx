export function DangerZone() {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm text-base-content/70">
        Desactivar tu cuenta eliminará el acceso de inmediato.
      </p>
      <button type="button" className="btn btn-outline btn-error w-fit">
        Desactivar cuenta
      </button>
    </section>
  )
}
