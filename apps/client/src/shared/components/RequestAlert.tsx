type RequestAlertProps = {
  status: 'accepted' | 'rejected'
  garageName?: string
  rejectionReason?: string
  onViewRequest?: () => void
  onClose?: () => void
}

export function RequestAlert({
  status,
  garageName = 'Calle...',
  rejectionReason = 'El sistema ha rechazado tu solicitud por conflicto con una nueva reserva',
  onViewRequest,
  onClose
}: RequestAlertProps) {
  const isAccepted = status === 'accepted'

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:left-auto md:right-6 md:bottom-6 z-50 w-full md:w-[450px]">
      <div
        className={`card bg-base-100 shadow-2xl border animate-in slide-in-from-bottom-2 fade-in duration-300 ${
          isAccepted
            ? 'border-success shadow-success/20'
            : 'border-error shadow-error/20'
        }`}
      >
        <div className="card-body p-6 gap-2">
          <div className="flex justify-between items-start gap-4">
            <h3
              className={`text-xl font-bold tracking-tight font-mono ${
                isAccepted ? 'text-success' : 'text-error'
              }`}
            >
              {isAccepted
                ? 'Tu solicitud fue aceptada'
                : 'Tu solicitud fue rechazada'}
            </h3>
            {onClose && (
              <button
                onClick={onClose}
                className={`btn btn-sm btn-circle btn-ghost hover:bg-base-content/10 ${
                  isAccepted ? 'text-success' : 'text-error'
                }`}
              >
                ✕
              </button>
            )}
          </div>

          <p className="text-base-content/80 font-medium font-mono text-sm">
            {isAccepted
              ? `Usuario ha aceptado tu solicitud al garage en ${garageName}`
              : rejectionReason}
          </p>

          {isAccepted && (
            <div className="card-actions justify-end mt-4">
              <button
                onClick={onViewRequest}
                className="btn btn-outline btn-success btn-sm gap-2 normal-case font-mono"
              >
                Ver solicitud
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
