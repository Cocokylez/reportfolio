import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const TEETH = Array.from({ length: 10 }, (_, index) => index * 36)

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let minimumFinished = false
    let pageReady = document.readyState === 'complete'
    let dismissed = false
    let releaseTimer

    const dismiss = () => {
      if (dismissed || !minimumFinished || !pageReady) return
      dismissed = true
      setVisible(false)
      releaseTimer = window.setTimeout(() => {
        document.body.style.overflow = previousOverflow
      }, 580)
    }

    const onLoad = () => {
      pageReady = true
      dismiss()
    }

    const minimumTimer = window.setTimeout(() => {
      minimumFinished = true
      dismiss()
    }, 700)

    const fallbackTimer = window.setTimeout(() => {
      minimumFinished = true
      pageReady = true
      dismiss()
    }, 2200)

    if (!pageReady) window.addEventListener('load', onLoad, { once: true })

    return () => {
      window.clearTimeout(minimumTimer)
      window.clearTimeout(fallbackTimer)
      window.clearTimeout(releaseTimer)
      window.removeEventListener('load', onLoad)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="cog-loader-screen"
            role="status"
            aria-label="Loading Adrian Kyle's portfolio"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="cog-loader-stage" aria-hidden="true">
              <svg viewBox="0 0 180 160" focusable="false">
                <ellipse className="cog-loader-shadow" cx="90" cy="137" rx="37" ry="7" />

                <g className="cog-loader-gear">
                  <defs>
                    <mask id="cog-cutout">
                      <rect width="180" height="160" fill="white" />
                      <circle cx="90" cy="78" r="15" fill="black" />
                    </mask>
                  </defs>

                  <g mask="url(#cog-cutout)" fill="#fff">
                    <circle cx="90" cy="78" r="39" />
                    {TEETH.map((angle) => (
                      <rect
                        key={angle}
                        x="83"
                        y="24"
                        width="14"
                        height="22"
                        rx="4"
                        transform={`rotate(${angle} 90 78)`}
                      />
                    ))}
                  </g>

                  <circle className="cog-loader-inner-ring" cx="90" cy="78" r="24" />
                </g>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .cog-loader-screen {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #63c7f1;
        }

        .cog-loader-stage {
          width: clamp(126px, 14vw, 174px);
          transform: translateY(-2vh);
          animation: cogLoaderFloat 1.25s ease-in-out infinite;
        }

        .cog-loader-stage svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .cog-loader-gear {
          transform-box: view-box;
          transform-origin: 90px 78px;
          animation: cogLoaderTurn 2.6s linear infinite;
        }

        .cog-loader-inner-ring {
          fill: none;
          stroke: rgba(99,199,241,0.42);
          stroke-width: 2;
        }

        .cog-loader-shadow {
          fill: rgba(9,90,126,0.16);
          transform-box: fill-box;
          transform-origin: center;
          animation: cogLoaderShadow 1.25s ease-in-out infinite;
        }

        @keyframes cogLoaderTurn {
          to { transform: rotate(360deg); }
        }

        @keyframes cogLoaderFloat {
          0%, 100% { transform: translateY(-2vh); }
          50% { transform: translateY(calc(-2vh - 7px)); }
        }

        @keyframes cogLoaderShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.72; }
          50% { transform: scaleX(0.82); opacity: 0.42; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cog-loader-stage,
          .cog-loader-gear,
          .cog-loader-shadow {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
