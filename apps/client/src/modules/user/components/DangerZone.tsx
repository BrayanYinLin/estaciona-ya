import { useUserStore } from '@user/context/user.context'

export function DangerZone() {
  const { deactiveUser } = useUserStore()

  return (
    <section className="flex flex-col gap-3">
      <p className="text-sm text-base-content/70">
        Desactivar tu cuenta eliminará el acceso de inmediato.
      </p>
      <button
        type="button"
        className="btn btn-outline btn-error w-fit"
        onClick={() => document.getElementById('my_modal_2')!.showModal()}
      >
        Desactivar cuenta
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmación</h3>
          <p className="py-4">¿Deseas desactivar la cuenta?</p>
          <div className="flex gap-4"></div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error" onClick={deactiveUser}>
                Desactivar
              </button>
              <button className="btn">Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  )
}
