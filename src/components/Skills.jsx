import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const SKILLS = [
  {
    name: 'HTML',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/></svg>`,
  },
  {
    name: 'Java',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747 1.002c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.56 1.553 17.418-.7 14.977-1.831M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.545.123 5.743-.062 1.798-.153 3.604-.454 3.604-.454s-.634.272-1.092.587c-4.408 1.158-12.927.618-10.478-.568 2.082-.995 3.767-.915 3.767-.915M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-.998 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.54 1.644-2.469 6.197-3.665 5.19-7.626M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#007396"/></svg>`,
  },
  {
    name: 'Python',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.858 0c-.978.005-1.913.088-2.736.234C6.7.662 6.26 1.558 6.26 3.21v2.182h5.725v.727H4.111c-1.664 0-3.121 1-3.577 2.903-.526 2.181-.549 3.542 0 5.82.407 1.694 1.379 2.902 3.043 2.902h1.969v-2.616c0-1.89 1.635-3.557 3.576-3.557h5.72c1.591 0 2.862-1.31 2.862-2.91v-5.45c0-1.553-1.309-2.718-2.863-2.977A18 18 0 0 0 11.858 0M8.762 1.755c.591 0 1.074.491 1.074 1.095 0 .601-.483 1.087-1.074 1.087A1.08 1.08 0 0 1 7.688 2.85c0-.604.48-1.095 1.074-1.095m9.656 4.364v2.543c0 1.971-1.671 3.63-3.577 3.63H9.122c-1.566 0-2.862 1.34-2.862 2.91v5.452c0 1.551 1.349 2.464 2.862 2.91 1.813.532 3.55.628 5.72 0 1.44-.418 2.862-1.258 2.862-2.91V18.47h-5.719v-.727h8.582c1.664 0 2.284-1.16 2.862-2.903.598-1.793.573-3.518 0-5.819-.41-1.656-1.196-2.903-2.862-2.903zm-3.216 13.807a1.08 1.08 0 0 1 1.074 1.088c0 .604-.48 1.094-1.074 1.094-.592 0-1.075-.49-1.075-1.094 0-.601.483-1.088 1.075-1.088" fill="#3776AB"/></svg>`,
  },
  {
    name: 'Supabase',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.35 21.5c-.43.55-1.32.25-1.33-.45l-.15-7.42H4.73c-.75 0-1.17-.87-.7-1.45L10.65 3.9c.43-.54 1.3-.24 1.31.45l.16 7.43h7.16c.75 0 1.17.87.7 1.45l-6.63 8.27Z" fill="#3ECF8E"/><path d="m12.12 11.78-.1 9.27c0 .7.9 1 1.33.45l6.63-8.27c.47-.58.05-1.45-.7-1.45h-7.16Z" fill="#2AB47F"/></svg>`,
  },
  {
    name: 'Git',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z" fill="#F05032"/></svg>`,
  },
]

const TOOLS = [
  { name: 'VS Code', group: 'Development', kind: 'vscode' },
  { name: 'Cursor', group: 'AI editor', kind: 'cursor' },
  { name: 'Google Antigravity', group: 'Agentic IDE', kind: 'antigravity' },
  { name: 'ChatGPT', group: 'AI assistant', kind: 'chatgpt' },
  { name: 'Codex', group: 'AI coding', kind: 'codex' },
  { name: 'Claude Code', group: 'AI coding', kind: 'claude' },
  { name: 'Supabase', group: 'Backend platform', kind: 'supabase' },
  { name: 'Resend', group: 'Email API', kind: 'resend' },
  { name: 'Microsoft Word', group: 'Microsoft Office', kind: 'office', mark: 'W' },
  { name: 'Microsoft Excel', group: 'Microsoft Office', kind: 'office', mark: 'X' },
  { name: 'Microsoft PowerPoint', group: 'Microsoft Office', kind: 'office', mark: 'P' },
  { name: 'Microsoft Outlook', group: 'Microsoft Office', kind: 'office', mark: 'O' },
  { name: 'Microsoft OneNote', group: 'Microsoft Office', kind: 'office', mark: 'N' },
  { name: 'Microsoft Access', group: 'Microsoft Office', kind: 'office', mark: 'A' },
  { name: 'Microsoft Teams', group: 'Microsoft Office', kind: 'office', mark: 'T' },
  { name: 'Microsoft OneDrive', group: 'Microsoft Office', kind: 'onedrive' },
]

const TOOL_PREVIEW = ['VS Code', 'ChatGPT', 'Supabase', 'Microsoft Word']
  .map((name) => TOOLS.find((tool) => tool.name === name))

const TOOL_ICON_BY_KIND = {
  vscode: { file: 'visual-studio-code.svg' },
  cursor: { file: 'cursor.svg', inverted: true },
  antigravity: { file: 'antigravity.png' },
  chatgpt: { file: 'openai.svg', inverted: true },
  codex: { file: 'openai.svg', inverted: true },
  claude: { file: 'claude.svg' },
  supabase: { file: 'supabase.svg' },
  resend: { file: 'resend.svg', inverted: true },
  onedrive: { file: 'microsoft-onedrive.svg' },
}

const OFFICE_ICON_BY_MARK = {
  W: 'microsoft-word.svg',
  X: 'microsoft-excel.svg',
  P: 'microsoft-powerpoint.svg',
  O: 'microsoft-outlook.svg',
  N: 'microsoft-onenote.svg',
  A: 'microsoft-access.svg',
  T: 'microsoft-teams.svg',
}

function AccurateToolLogo({ tool }) {
  const icon = tool.kind === 'office'
    ? { file: OFFICE_ICON_BY_MARK[tool.mark] }
    : TOOL_ICON_BY_KIND[tool.kind]

  if (!icon?.file) return null

  return (
    <img
      src={`/brand-icons/${icon.file}`}
      className={icon.inverted ? 'tool-logo-image is-inverted' : 'tool-logo-image'}
      alt=""
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}

const fadeUp = (delay=0) => ({ initial:{opacity:0,y:32,scale:0.96}, whileInView:{opacity:1,y:0,scale:1}, viewport:{once:false,margin:'-30px'}, transition:{duration:0.65,delay,ease:[0.4,0,0.2,1]} })

export default function Skills() {
  const [showTools, setShowTools] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <section id="skills" className="relative z-10 py-[100px]">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.span {...fadeUp(0)} className="section-label block">Skills</motion.span>
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map(({ name, svg }, i) => (
            <motion.div
              key={name}
              {...fadeUp(0.1 + i * 0.08)}
              className="skill-pill"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <span
                style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
              <span className="text-[0.9rem] font-medium" style={{ color: '#aaa' }}>{name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.48)} className="tools-panel">
          <button
            type="button"
            className="tools-toggle"
            aria-expanded={showTools}
            aria-controls="current-tools"
            onClick={() => setShowTools((current) => !current)}
          >
            <span className="tools-toggle-copy">
              <span id="tools-heading" className="tools-heading">Tools I Use</span>
              <span className="tools-summary">Development stack, AI tools, and Microsoft Office</span>
            </span>

            <span className="tools-preview" aria-hidden="true">
              {TOOL_PREVIEW.map((tool) => (
                <span className="tools-preview-icon" key={tool.name}>
                  <AccurateToolLogo tool={tool} />
                </span>
              ))}
            </span>

            <span className="tools-toggle-action">
              {showTools ? 'HIDE' : 'VIEW ALL'}
              <svg className={showTools ? 'tools-chevron is-open' : 'tools-chevron'} viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {showTools && (
              <motion.div
                id="current-tools"
                className="tools-grid"
                role="region"
                aria-labelledby="tools-heading"
                initial={reduceMotion ? false : { opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="tools-grid-inner">
                  {TOOLS.map((tool) => (
                    <motion.div
                      className="tool-item"
                      key={tool.name}
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.28 }}
                    >
                      <span className="tool-logo"><AccurateToolLogo tool={tool} /></span>
                      <span className="tool-copy">
                        <span className="tool-name">{tool.name}</span>
                        <span className="tool-group">{tool.group}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .tools-panel {
          margin-top: 30px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: rgba(255,255,255,0.025);
          box-shadow: 0 16px 44px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025);
        }

        .tools-toggle {
          width: 100%;
          min-height: 84px;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 18px 20px;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .tools-toggle:focus-visible {
          outline: 2px solid rgba(96,165,250,0.75);
          outline-offset: -3px;
        }

        .tools-toggle-copy {
          min-width: 0;
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 5px;
        }

        .tools-heading {
          color: #c9c9c9;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .tools-summary {
          overflow: hidden;
          color: #737373;
          font-size: 0.76rem;
          font-weight: 300;
          line-height: 1.4;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tools-preview {
          display: flex;
          align-items: center;
          padding-left: 8px;
        }

        .tools-preview-icon {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          margin-left: -8px;
          padding: 5px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          background: #111;
        }

        .tools-preview-icon svg,
        .tools-preview-icon img,
        .tool-logo svg,
        .tool-logo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .tool-logo-image.is-inverted {
          filter: invert(1);
        }

        .tools-toggle-action {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #8b8b8b;
          font-size: 0.61rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          white-space: nowrap;
        }

        .tools-chevron {
          width: 14px;
          height: 14px;
          transition: transform 220ms ease;
        }

        .tools-chevron.is-open { transform: rotate(180deg); }

        .tools-grid { overflow: hidden; }

        .tools-grid-inner {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          padding: 0 20px 20px;
        }

        .tool-item {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px;
          border: 1px solid rgba(255,255,255,0.065);
          border-radius: 13px;
          background: rgba(255,255,255,0.025);
          transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
        }

        .tool-item:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.045);
        }

        .tool-logo {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
        }

        .tool-copy {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .tool-name {
          overflow: hidden;
          color: #b8b8b8;
          font-size: 0.78rem;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tool-group {
          overflow: hidden;
          color: #676767;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @media (max-width: 560px) {
          .tools-toggle { gap: 12px; padding: 17px 16px; }
          .tools-preview { display: none; }
          .tools-summary { display: none; }
          .tools-grid-inner { grid-template-columns: 1fr; padding: 0 16px 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tools-chevron,
          .tool-item { transition: none; }
        }
      `}</style>
    </section>
  )
}
