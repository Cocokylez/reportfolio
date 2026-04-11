import { useEffect, useRef } from 'react'

export default function CursorBackground() {
  const blobRef = useRef(null)
  const posRef  = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const animRef = useRef(null)
  const currRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    // Smooth lerp animation — follows cursor with a slight lag
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      currRef.current.x = lerp(currRef.current.x, posRef.current.x, 0.07)
      currRef.current.y = lerp(currRef.current.y, posRef.current.y, 0.07)
      if (blobRef.current) {
        blobRef.current.style.left = currRef.current.x + 'px'
        blobRef.current.style.top  = currRef.current.y + 'px'
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div
      ref={blobRef}
      style={{
        position: 'fixed',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,113,227,0.07) 0%, rgba(120,40,200,0.04) 50%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(40px)',
        transition: 'opacity 0.3s ease',
      }}
    />
  )
}
