import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
            className="cat-loader-screen"
            role="status"
            aria-label="Loading Adrian Kyle's portfolio"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="cat-loader-stage" aria-hidden="true">
              <div className="cat-loader-figure">
                <svg viewBox="0 0 180 160" focusable="false">
                  <ellipse className="cat-loader-shadow" cx="90" cy="137" rx="41" ry="7" />

                  <path
                    className="cat-loader-tail"
                    d="M124 79 C150 65 163 79 151 96 C143 108 132 112 121 106"
                  />

                  <path
                    className="cat-loader-body"
                    d="M49 126 C43 120 43 108 45 93 L48 59 C49 48 54 39 64 34 L70 20 L83 30 C93 28 103 31 111 38 L124 31 L125 51 C129 60 129 74 129 89 L130 113 C130 124 122 130 113 128 C107 135 97 135 90 129 C83 136 71 136 65 129 C59 133 52 132 49 126 Z"
                  />

                  <path className="cat-loader-eye cat-loader-eye-left" d="M70 66 Q76 60 81 66" />
                  <path className="cat-loader-eye cat-loader-eye-right" d="M98 66 Q104 60 109 66" />
                  <path className="cat-loader-mouth" d="M87 76 Q90 80 93 76 M90 80 Q90 84 86 85 M90 80 Q90 84 94 85" />

                  <path className="cat-loader-whisker" d="M61 77 L39 72 M61 82 L37 84 M116 77 L139 72 M116 82 L141 84" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .cat-loader-screen {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #63c7f1;
        }

        .cat-loader-stage {
          width: clamp(130px, 15vw, 180px);
          transform: translateY(-2vh);
        }

        .cat-loader-figure {
          animation: catLoaderFloat 1.05s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .cat-loader-figure svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .cat-loader-body {
          fill: #fff;
        }

        .cat-loader-tail {
          fill: none;
          stroke: #fff;
          stroke-width: 12;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform-box: fill-box;
          transform-origin: left center;
          animation: catLoaderTail 0.9s ease-in-out infinite alternate;
        }

        .cat-loader-eye,
        .cat-loader-mouth {
          fill: none;
          stroke: #63c7f1;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .cat-loader-eye {
          transform-box: fill-box;
          transform-origin: center;
          animation: catLoaderBlink 2.6s ease-in-out infinite;
        }

        .cat-loader-mouth { stroke-width: 2.4; }

        .cat-loader-whisker {
          fill: none;
          stroke: rgba(255,255,255,0.92);
          stroke-width: 2;
          stroke-linecap: round;
        }

        .cat-loader-shadow {
          fill: rgba(9, 90, 126, 0.16);
          transform-box: fill-box;
          transform-origin: center;
          animation: catLoaderShadow 1.05s ease-in-out infinite;
        }

        @keyframes catLoaderFloat {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-9px) rotate(1deg); }
        }

        @keyframes catLoaderTail {
          from { transform: rotate(-7deg); }
          to { transform: rotate(8deg); }
        }

        @keyframes catLoaderBlink {
          0%, 42%, 48%, 100% { transform: scaleY(1); }
          45% { transform: scaleY(0.08); }
        }

        @keyframes catLoaderShadow {
          0%, 100% { transform: scaleX(1); opacity: 0.75; }
          50% { transform: scaleX(0.78); opacity: 0.45; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cat-loader-figure,
          .cat-loader-tail,
          .cat-loader-eye,
          .cat-loader-shadow {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
