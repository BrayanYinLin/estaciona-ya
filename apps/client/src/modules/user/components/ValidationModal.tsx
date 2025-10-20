export function ValidationModal() {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Validar Cuenta</h3>
        <form className="flex justify-between items-center gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input w-full my-4"
          />
          <button className="btn btn-accent">Validar</button>
        </form>
      </div>
    </dialog>
  )
}
