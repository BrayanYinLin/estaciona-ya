import type { FormEvent } from 'react'
import { useUserStore } from '@user/context/user.context'

export type ValidationModalProps = {
  validateAccount: (code: string) => Promise<void>
}

export function ValidationModal({ validateAccount }: ValidationModalProps) {
  const { recoverUser } = useUserStore()

  const handleValidation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const code = data.get('code') as string

    await validateAccount(code)
    await recoverUser()
  }

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
        <form
          className="flex justify-between items-center gap-2"
          onSubmit={handleValidation}
        >
          <input
            type="text"
            placeholder="Type here"
            className="input w-full my-4"
            name="code"
            required
          />
          <button className="btn btn-accent">Validar</button>
        </form>
      </div>
    </dialog>
  )
}
