import React, { useCallback, useEffect, useRef, useState } from 'react'

type RangeSliderProps = {
  min?: number
  max?: number
  step?: number
  initialMin?: number
  initialMax?: number
  onChange?: (values: { min: number; max: number }) => void
  setMin: (min: number) => void
  setMax: (max: number) => void
}

type DragType = 'min' | 'max' | 'range'

type DragState = {
  type: DragType
  startX: number
  startMin: number
  startMax: number
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 1000,
  step = 1,
  initialMin,
  initialMax,
  onChange,
  setMin,
  setMax
}) => {
  const safeInitialMin = initialMin ?? min
  const safeInitialMax = initialMax ?? max

  const [values, setValues] = useState({
    min: Math.max(min, Math.min(safeInitialMin, safeInitialMax)),
    max: Math.min(max, Math.max(safeInitialMax, safeInitialMin))
  })

  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<DragState | null>(null)

  const percentFromValue = (value: number) =>
    ((value - min) / (max - min)) * 100

  // Notifica cambios al padre
  useEffect(() => {
    onChange?.(values)
  }, [values, onChange])

  useEffect(() => {
    setMin(values.min)
    setMax(values.max)
  }, [values.min, values.max])

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !dragStateRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const ratio = (clientX - rect.left) / rect.width
      const raw = min + ratio * (max - min)
      const snapped = Math.round(raw / step) * step
      const value = Math.min(max, Math.max(min, snapped))
      // Capturar snapshot del estado de arrastre para evitar condiciones de
      // carrera donde `dragStateRef.current` pueda volverse `null` antes
      // de que el callback de `setValues` se ejecute.
      const dragSnapshot = dragStateRef.current
      if (!dragSnapshot) return

      setValues((prev) => {
        const state = dragSnapshot
        // Arrastrando solo un handle
        if (state.type === 'min') {
          const newMin = Math.min(value, prev.max - step)
          if (newMin === prev.min) return prev
          return { ...prev, min: newMin }
        }

        if (state.type === 'max') {
          const newMax = Math.max(value, prev.min + step)
          if (newMax === prev.max) return prev
          return { ...prev, max: newMax }
        }

        // Arrastrando la franja completa
        const deltaPx = clientX - state.startX
        const deltaValue = (deltaPx / rect.width) * (max - min)
        const span = state.startMax - state.startMin

        let newMin = state.startMin + deltaValue
        let newMax = state.startMax + deltaValue

        if (newMin < min) {
          newMin = min
          newMax = min + span
        }
        if (newMax > max) {
          newMax = max
          newMin = max - span
        }

        const snapMin = Math.round(newMin / step) * step
        const snapMax = Math.round(newMax / step) * step

        if (snapMin === prev.min && snapMax === prev.max) return prev
        return { min: snapMin, max: snapMax }
      })
    },
    [min, max, step]
  )

  // Listeners globales para mover / soltar
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragStateRef.current) return
      handlePointerMove(e.clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!dragStateRef.current) return
      const touch = e.touches[0]
      if (!touch) return
      handlePointerMove(touch.clientX)
    }

    const endDrag = () => {
      dragStateRef.current = null
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('mouseup', endDrag)
    window.addEventListener('touchend', endDrag)
    window.addEventListener('touchcancel', endDrag)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', endDrag)
      window.removeEventListener('touchend', endDrag)
      window.removeEventListener('touchcancel', endDrag)
    }
  }, [handlePointerMove])

  const startDrag = (type: DragType, clientX: number) => {
    dragStateRef.current = {
      type,
      startX: clientX,
      startMin: values.min,
      startMax: values.max
    }
  }

  const handleThumbMouseDown = (type: DragType) => (e: React.MouseEvent) => {
    e.preventDefault()
    startDrag(type, e.clientX)
  }

  const handleThumbTouchStart = (type: DragType) => (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    startDrag(type, touch.clientX)
  }

  const handleRangeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startDrag('range', e.clientX)
  }

  const handleRangeTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    startDrag('range', touch.clientX)
  }

  return (
    <div className="w-full py-6">
      <div
        ref={trackRef}
        className="relative h-2 w-full rounded-full bg-slate-700/70"
      >
        {/* Barra seleccionada */}
        <div
          className="absolute top-0 h-full rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.35)]
 cursor-grab active:cursor-grabbing"
          style={{
            left: `${percentFromValue(values.min)}%`,
            right: `${100 - percentFromValue(values.max)}%`
          }}
          onMouseDown={handleRangeMouseDown}
          onTouchStart={handleRangeTouchStart}
        />

        {/* Thumb mínimo */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/90 cursor-pointer"
          style={{ left: `${percentFromValue(values.min)}%` }}
          onMouseDown={handleThumbMouseDown('min')}
          onTouchStart={handleThumbTouchStart('min')}
          aria-label="Valor mínimo"
          aria-valuemin={min}
          aria-valuemax={values.max}
          aria-valuenow={values.min}
          role="slider"
        />

        {/* Thumb máximo */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/90 cursor-pointer"
          style={{ left: `${percentFromValue(values.max)}%` }}
          onMouseDown={handleThumbMouseDown('max')}
          onTouchStart={handleThumbTouchStart('max')}
          aria-label="Valor máximo"
          aria-valuemin={values.min}
          aria-valuemax={max}
          aria-valuenow={values.max}
          role="slider"
        />
      </div>

      {/* Valores actuales */}
      <div className="mt-3 flex items-center justify-between text-xs text-black">
        <span>
          Min:{' '}
          <span className="font-mono font-semibold text-black">
            S/{values.min}
          </span>
        </span>
        <span>
          Max:{' '}
          <span className="font-mono font-semibold text-black">
            S/{values.max}
          </span>
        </span>
      </div>
    </div>
  )
}

export { RangeSlider }
