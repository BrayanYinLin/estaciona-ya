import { useEffect, useRef, useState, type ChangeEvent } from 'react'

export function PhotoUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleSelectClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPreview(null)
      return
    }

    const nextPreview = URL.createObjectURL(file)
    setPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current)
      }
      return nextPreview
    })
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-stretch gap-3">
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={handleSelectClick}
        >
          Subir archivo
        </button>
        <div className="flex h-10 flex-1 items-center justify-start rounded border border-dashed border-base-content/40 px-3 text-sm text-base-content/60">
          {preview ? 'Archivo seleccionado' : ''}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex h-64 items-center justify-center rounded border border-base-content/40 bg-base-200/40 text-center">
        {preview ? (
          <img
            src={preview}
            alt="Vista previa de tu foto de perfil"
            className="h-full w-full max-w-sm object-contain"
          />
        ) : (
          <span className="text-base text-base-content/70">
            Visualiza tu foto de perfil
          </span>
        )}
      </div>
    </section>
  )
}
