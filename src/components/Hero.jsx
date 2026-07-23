import { motion } from 'framer-motion'
import TiltCard from './TiltCard'

const TOOLKIT = ['HTML', 'CSS', 'JavaScript', 'Java', 'Git', 'Tailwind CSS']
const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id)
    if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      <div className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="hero-status"
            >
              <span className="hero-status-dot" />
              OPEN TO OPPORTUNITIES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease }}
              className="hero-name"
            >
              <span>ADRIAN KYLE</span>
              <span>CONDEZA</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3, ease }}
              className="hero-role"
            >
              FIRST-YEAR IT STUDENT
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease }}
              className="hero-intro"
            >
              Learning by building practical web projects — currently working on FitSched.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.46, ease }}
              className="hero-actions"
            >
              <button className="hero-action-primary" onClick={() => scrollTo('#projects')}>
                VIEW PROJECTS
              </button>
              <button className="hero-action-secondary" onClick={() => scrollTo('#contact')}>
                CONTACT ME
              </button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.42, ease }}
            aria-label="Current project"
          >
            <TiltCard className="hero-project-note">
              <div className="hero-note-topline">
                <span>READY TO PUBLISH</span>
                <span>01</span>
              </div>
              <h2>FitSched</h2>
              <p>An AI-powered workout scheduler that fits training into your available time.</p>
              <p className="hero-release-note">
                Remaining steps: fund the custom domain and FitToken rollout, complete Google Play registration, and finish the final security audit.
              </p>
              <div className="hero-progress" aria-label="FitSched is 99 percent complete">
                <span />
              </div>
              <div className="hero-progress-meta">
                <span>FINAL CHECKS</span>
                <span>99%</span>
              </div>
              <button onClick={() => scrollTo('#projects')}>SEE THE PROJECT</button>
            </TiltCard>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="hero-toolkit"
        >
          <span className="hero-toolkit-label">TOOLS I’M USING</span>
          <ul aria-label="Current tools">
            {TOOLKIT.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: clamp(110px, 13vh, 160px) 28px 52px;
          position: relative;
          overflow: hidden;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          right: -12vw;
          top: -48vw;
          width: 58vw;
          height: 58vw;
          border: 1px solid rgba(255,255,255,0.035);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-shell {
          width: min(1180px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(260px, 0.55fr);
          gap: clamp(48px, 7vw, 96px);
          align-items: end;
        }

        .hero-copy { min-width: 0; }

        .hero-status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 34px;
          color: #9a9a9a;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
        }

        .hero-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #30d158;
          box-shadow: 0 0 0 4px rgba(48,209,88,0.08);
          animation: heroStatusPulse 2.4s ease-in-out infinite;
        }

        @keyframes heroStatusPulse {
          50% { box-shadow: 0 0 0 7px rgba(48,209,88,0.02); }
        }

        .hero-name {
          margin: 0;
          color: #f3f3f3;
          font-family: 'DM Serif Display', serif;
          font-size: clamp(4rem, 7.35vw, 7.15rem);
          font-weight: 400;
          letter-spacing: -0.045em;
          line-height: 0.84;
          text-align: left;
        }

        .hero-name span { display: block; }
        .hero-name span:last-child { color: #c8c8c8; }

        .hero-role {
          margin: 30px 0 0;
          color: #60a5fa;
          font-size: clamp(0.72rem, 1vw, 0.82rem);
          font-weight: 600;
          letter-spacing: 0.15em;
        }

        .hero-intro {
          max-width: 570px;
          margin: 18px 0 0;
          color: #888;
          font-size: clamp(0.98rem, 1.4vw, 1.08rem);
          font-weight: 300;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 34px;
        }

        .hero-actions button,
        .hero-project-note button {
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }

        .hero-action-primary,
        .hero-action-secondary {
          min-height: 46px;
          padding: 0 22px;
          border-radius: 10px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.11em;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
        }

        .hero-action-primary {
          border: 1px solid #e8e8e8;
          background: #e8e8e8;
          color: #0a0a0a;
        }

        .hero-action-primary:hover { transform: translateY(-2px); background: #fff; }

        .hero-action-secondary {
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: #aaa;
        }

        .hero-action-secondary:hover {
          transform: translateY(-2px);
          color: #f0f0f0;
          border-color: rgba(255,255,255,0.35);
        }

        .hero-project-note {
          position: relative;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 18px 54px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.04);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .hero-project-note::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .hero-note-topline,
        .hero-progress-meta {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          color: #565656;
          font-size: 0.61rem;
          font-weight: 600;
          letter-spacing: 0.14em;
        }

        .hero-project-note h2 {
          margin: 26px 0 12px;
          color: #e7e7e7;
          font-family: 'DM Serif Display', serif;
          font-size: 2.35rem;
          font-weight: 400;
        }

        .hero-project-note p {
          margin: 0;
          color: #717171;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.65;
        }

        .hero-project-note .hero-release-note {
          margin-top: 15px;
          color: #555;
          font-size: 0.76rem;
          line-height: 1.6;
        }

        .hero-progress {
          height: 2px;
          margin: 26px 0 10px;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
        }

        .hero-progress span {
          display: block;
          width: 99%;
          height: 100%;
          background: #60a5fa;
        }

        .hero-project-note button {
          margin-top: 25px;
          padding: 0 0 4px;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          background: transparent;
          color: #9a9a9a;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          transition: color 180ms ease, border-color 180ms ease;
        }

        .hero-project-note button:hover {
          color: #fff;
          border-color: #fff;
        }

        .hero-toolkit {
          display: flex;
          align-items: center;
          gap: 34px;
          margin-top: clamp(54px, 8vh, 82px);
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .hero-toolkit-label {
          flex: 0 0 auto;
          color: #555;
          font-size: 0.61rem;
          font-weight: 600;
          letter-spacing: 0.15em;
        }

        .hero-toolkit ul {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .hero-toolkit li {
          color: #777;
          font-size: 0.78rem;
          font-weight: 400;
        }

        @media (max-width: 820px) {
          .hero-section {
            align-items: flex-start;
            padding: 112px 22px 44px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }

          .hero-name {
            font-size: clamp(3.4rem, 15vw, 5.6rem);
            line-height: 0.88;
          }

          .hero-project-note {
            max-width: 520px;
            padding: 26px;
          }

          .hero-toolkit {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
            margin-top: 54px;
          }
        }

        @media (max-width: 480px) {
          .hero-name { font-size: clamp(3.1rem, 15.5vw, 4.4rem); }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .hero-actions button { width: 100%; }
          .hero-toolkit ul { gap: 10px 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-status-dot { animation: none; }
          .hero-actions button { transition: none; }
        }
      `}</style>
    </section>
  )
}
