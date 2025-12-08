import { useState, type ChangeEvent } from 'react'

type Preview = {
  id: string
  url: string
}

export function PhotosGarages() {
  const [previews, setPreviews] = useState<Preview[]>([])
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files === null) {
      return
    }

    setPreviews(
      Array.from(files).map((file) => {
        return {
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file)
        }
      })
    )
  }

  return (
    <main className="flex flex-col gap-5 w-85 lg:w-100 justify-start h-full">
      <input
        type="file"
        name="photos"
        multiple
        className="file-input"
        onChange={handleUpload}
        required
      />
      <div className="flex h-64 items-center justify-center rounded border border-base-content/40 bg-base-200/40 text-center">
        <div className="carousel w-full">
          {previews.map((preview) => {
            return (
              <img
                id={preview.id}
                src={preview.url}
                className="carousel-item h-64 w-full object-contain"
                alt="foto"
              />
            )
          })}
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {previews.map((preview, i) => {
          return (
            <a href={`#${preview.id}`} className="btn btn-xs">
              {i}
            </a>
          )
        })}
      </div>
    </main>
  )
}
