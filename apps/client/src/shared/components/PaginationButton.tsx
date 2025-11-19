type PaginationButtonProps = {
  page: number
  prev: () => void
  next: () => void
}

export function PaginationButton({ page, prev, next }: PaginationButtonProps) {
  return (
    <div className="w-full flex justify-center mb-4">
      <div className="join">
        <button className="join-item btn" onClick={prev}>
          «
        </button>
        <button className="join-item btn">Página {page}</button>
        <button className="join-item btn" onClick={next}>
          »
        </button>
      </div>
    </div>
  )
}
