// Classic macOS/iOS SVG arrow cursor
import { useEffect } from 'react'

const CURSOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M4 1 L4 20 L8.5 15.5 L12 22 L14 21 L10.5 14.5 L17 14.5 Z" fill="white" stroke="#1c1c1e" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`

const CURSOR_URL = `data:image/svg+xml,${encodeURIComponent(CURSOR_SVG)}`

export default function CustomCursor() {
  useEffect(() => {
    document.body.style.cursor = `url("${CURSOR_URL}") 4 2, auto`
    return () => { document.body.style.cursor = '' }
  }, [])

  return null
}
