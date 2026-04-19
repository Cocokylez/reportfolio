export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-7 text-[0.8rem]"
      style={{ color: '#333', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      © {new Date().getFullYear()} Adrian Kyle Condeza · Built with care
    </footer>
  )
}
