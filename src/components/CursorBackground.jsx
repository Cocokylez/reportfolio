import { useEffect, useRef } from 'react'

const GRID = 24
const MAX_MARKS = 220

export default function CursorBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (!canvas || !context || reducedMotion || coarsePointer) return undefined

    const marks = []
    let animationFrame
    let dragging = false
    let lastCell = ''
    let lastX = -100
    let lastY = -100
    let deviceScale = 1

    const resize = () => {
      deviceScale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * deviceScale)
      canvas.height = Math.round(window.innerHeight * deviceScale)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
    }

    const addMark = (x, y, strong, offsetX = 0, offsetY = 0) => {
      const cellX = Math.round(x / GRID) * GRID + offsetX * GRID
      const cellY = Math.round(y / GRID) * GRID + offsetY * GRID
      const cellKey = `${cellX}:${cellY}:${strong ? 1 : 0}`

      if (strong && cellKey === lastCell) return
      if (strong) lastCell = cellKey

      marks.push({
        x: cellX,
        y: cellY,
        born: performance.now(),
        life: strong ? 1500 : 650,
        size: strong ? 15 : 8,
        strong,
        blue: (Math.abs(cellX / GRID) + Math.abs(cellY / GRID)) % 2 === 0,
      })

      if (marks.length > MAX_MARKS) marks.splice(0, marks.length - MAX_MARKS)
    }

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return

      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY)
      if (distance < (dragging ? 7 : 20)) return

      lastX = event.clientX
      lastY = event.clientY
      addMark(lastX, lastY, dragging)

      if (dragging && marks.length % 4 === 0) {
        const direction = marks.length % 8 === 0 ? 1 : -1
        addMark(lastX, lastY, true, direction, 0)
        addMark(lastX, lastY, true, 0, -direction)
      }
    }

    const onPointerDown = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      dragging = true
      lastCell = ''
      addMark(event.clientX, event.clientY, true)
    }

    const stopDragging = () => {
      dragging = false
      lastCell = ''
    }

    const draw = (now) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let index = marks.length - 1; index >= 0; index -= 1) {
        const mark = marks[index]
        const progress = (now - mark.born) / mark.life

        if (progress >= 1) {
          marks.splice(index, 1)
          continue
        }

        const opacity = Math.pow(1 - progress, 1.8)
        const size = mark.size * (0.72 + progress * 0.28)
        const color = mark.blue ? '96, 165, 250' : '230, 230, 230'

        context.lineWidth = mark.strong ? 1.2 : 0.8
        context.strokeStyle = `rgba(${color}, ${opacity * (mark.strong ? 0.52 : 0.2)})`
        context.strokeRect(mark.x - size / 2, mark.y - size / 2, size, size)

        if (mark.strong && progress < 0.45) {
          context.fillStyle = `rgba(${color}, ${opacity * 0.09})`
          context.fillRect(mark.x - size / 2, mark.y - size / 2, size, size)
        }
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', stopDragging, { passive: true })
    window.addEventListener('pointercancel', stopDragging, { passive: true })
    window.addEventListener('blur', stopDragging)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', stopDragging)
      window.removeEventListener('pointercancel', stopDragging)
      window.removeEventListener('blur', stopDragging)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  )
}
