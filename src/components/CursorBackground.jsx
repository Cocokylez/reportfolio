import { useEffect, useRef } from 'react'

export default function CursorBackground() {
  const blobRef = useRef(null)
  const posRef  = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const currRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const animRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

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

  // Detect dark mode via the .dark class on <html>
  // We use a CSS variable approach so it adapts automatically
  return (
    <>
      {/* Dark mode blob */}
      <div
        ref={blobRef}
        className="cursor-bg-blob"
      />
      <style>{`
        .cursor-bg-blob {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
          /* Dark mode: soft blue/purple glow */
          background: radial-gradient(circle, rgba(0,113,227,0.10) 0%, rgba(120,40,200,0.06) 50%, transparent 70%);
        }
        /* Light mode: warmer, subtler teal/indigo so it shows on white bg */
        :root:not(.dark) .cursor-bg-blob {
          background: radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(99,102,241,0.05) 50%, transparent 70%);
          filter: blur(50px);
        }
      `}</style>
    </>
  )
}
