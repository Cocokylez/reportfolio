import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const SKILLS = [
  {
    name: 'HTML',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/></svg>`,
  },
  {
    name: 'CSS',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" fill="#1572B6"/></svg>`,
  },
  {
    name: 'JavaScript',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#F7DF1E"/></svg>`,
  },
  {
    name: 'TypeScript',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2.5" fill="#3178C6"/><path d="M4.2 10.1h8.1v2.15H9.45V20H7.03v-7.75H4.2V10.1Zm9.05 9.42v-2.4c.46.38 1 .66 1.63.86.62.2 1.2.3 1.73.3.62 0 1.06-.1 1.31-.3.25-.2.38-.45.38-.76a.78.78 0 0 0-.22-.55 2.1 2.1 0 0 0-.6-.45 7.4 7.4 0 0 0-.91-.4c-.35-.13-.73-.27-1.14-.42-1.03-.38-1.8-.85-2.3-1.43a3.14 3.14 0 0 1-.76-2.12c0-.65.14-1.2.42-1.67.28-.47.66-.85 1.14-1.15.48-.3 1.04-.52 1.67-.66.63-.14 1.3-.21 2.01-.21.69 0 1.3.04 1.84.13.54.08 1.03.2 1.48.36v2.24a5.4 5.4 0 0 0-.67-.35 6.3 6.3 0 0 0-.75-.25 6.25 6.25 0 0 0-.77-.15 5.8 5.8 0 0 0-.72-.05c-.28 0-.54.03-.77.08-.23.05-.43.12-.59.22a1.14 1.14 0 0 0-.38.34.8.8 0 0 0-.14.47c0 .18.06.34.17.48.12.14.28.28.5.4.22.13.48.25.78.37.3.12.65.24 1.04.38.53.2 1 .42 1.42.66.41.24.77.51 1.07.81.3.3.53.65.69 1.04.16.4.24.86.24 1.39 0 .69-.14 1.28-.42 1.75-.28.47-.66.85-1.15 1.14-.48.29-1.04.5-1.69.62-.65.13-1.33.19-2.04.19-.72 0-1.42-.06-2.08-.18a6.3 6.3 0 0 1-1.71-.52Z" fill="#fff"/></svg>`,
  },
  {
    name: 'Java',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747 1.002c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.56 1.553 17.418-.7 14.977-1.831M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.545.123 5.743-.062 1.798-.153 3.604-.454 3.604-.454s-.634.272-1.092.587c-4.408 1.158-12.927.618-10.478-.568 2.082-.995 3.767-.915 3.767-.915M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-.998 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.54 1.644-2.469 6.197-3.665 5.19-7.626M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#007396"/></svg>`,
  },
  {
    name: 'Next.js',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#F5F5F5"/><path d="M8 7.2h2.25l5.9 8.15V7.2H18v9.6h-2.18l-5.97-8.13v8.13H8V7.2Zm9.93 9.55-6.55-8.9" fill="#111" stroke="#111" stroke-width=".45"/></svg>`,
  },
  {
    name: 'Tailwind CSS',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.89 2.28 1.62C13.65 11 15 12.4 18 12.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.89-2.28-1.62C16.35 6.6 15 5.2 12 5.2ZM6 12.4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.89 2.28 1.62C7.65 18.2 9 19.6 12 19.6c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.89-2.28-1.62C10.35 13.8 9 12.4 6 12.4Z" fill="#38BDF8"/></svg>`,
  },
  {
    name: 'Supabase',
    svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.35 21.5c-.43.55-1.32.25-1.33-.45l-.15-7.42H4.73c-.75 0-1.17-.87-.7-1.45L10.65 3.9c.43-.54 1.3-.24 1.31.45l.16 7.43h7.16c.75 0 1.17.87.7 1.45l-6.63 8.27Z" fill="#3ECF8E"/><path d="m12.12 11.78-.1 9.27c0 .7.9 1 1.33.45l6.63-8.27c.47-.58.05-1.45-.7-1.45h-7.16Z" fill="#2AB47F"/></svg>`,
  },
]

const ANTIGRAVITY_ICON_URL = 'https://antigravity.google/assets/image/brand/antigravity-icon__full-color.png'

const TOOLS = [
  { name: 'VS Code', group: 'Development', kind: 'vscode' },
  { name: 'Cursor', group: 'AI editor', kind: 'cursor' },
  { name: 'Google Antigravity', group: 'Agentic IDE', kind: 'antigravity' },
  { name: 'ChatGPT', group: 'AI assistant', kind: 'chatgpt' },
  { name: 'Codex', group: 'AI coding', kind: 'codex' },
  { name: 'Claude Code', group: 'AI coding', kind: 'claude' },
  { name: 'TypeScript', group: 'Language', kind: 'typescript' },
  { name: 'Next.js', group: 'Framework', kind: 'nextjs' },
  { name: 'Tailwind CSS', group: 'Styling', kind: 'tailwind' },
  { name: 'Supabase', group: 'Backend platform', kind: 'supabase' },
  { name: 'Resend', group: 'Email API', kind: 'resend' },
  { name: 'Microsoft Word', group: 'Microsoft Office', kind: 'office', mark: 'W', color: '#185ABD', panel: '#2B7CD3' },
  { name: 'Microsoft Excel', group: 'Microsoft Office', kind: 'office', mark: 'X', color: '#107C41', panel: '#21A366' },
  { name: 'Microsoft PowerPoint', group: 'Microsoft Office', kind: 'office', mark: 'P', color: '#B7472A', panel: '#D24726' },
  { name: 'Microsoft Outlook', group: 'Microsoft Office', kind: 'office', mark: 'O', color: '#0364B8', panel: '#0078D4' },
  { name: 'Microsoft OneNote', group: 'Microsoft Office', kind: 'office', mark: 'N', color: '#7719AA', panel: '#9B4F96' },
  { name: 'Microsoft Access', group: 'Microsoft Office', kind: 'office', mark: 'A', color: '#A4373A', panel: '#C0504D' },
  { name: 'Microsoft Teams', group: 'Microsoft Office', kind: 'office', mark: 'T', color: '#5059C9', panel: '#7B83EB' },
  { name: 'Microsoft OneDrive', group: 'Microsoft Office', kind: 'onedrive' },
]

const TOOL_PREVIEW = ['VS Code', 'ChatGPT', 'Supabase', 'Microsoft Word']
  .map((name) => TOOLS.find((tool) => tool.name === name))

function OfficeLogo({ mark, color, panel }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="7" y="2.5" width="15" height="19" rx="3" fill={panel} />
      <rect x="2" y="5" width="13" height="14" rx="2.5" fill={color} />
      <text x="8.5" y="15.1" textAnchor="middle" fill="#fff" fontSize="9.3" fontFamily="Arial, sans-serif" fontWeight="700">{mark}</text>
    </svg>
  )
}

function ToolLogo({ tool }) {
  if (tool.kind === 'office') {
    return <OfficeLogo mark={tool.mark} color={tool.color} panel={tool.panel} />
  }

  if (tool.kind === 'vscode') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#23A8F2" d="M20.1 2.7 9.1 11.5 4.2 7.8 1.8 10l4.6 4-4.6 4 2.4 2.2 4.9-3.7 11 4.8c1 .43 2.1-.3 2.1-1.4V4.1c0-1.1-1.1-1.83-2.1-1.4Z" />
        <path fill="#007ACC" d="m19 7.2-7.2 6.8 7.2 6.8V7.2Z" />
      </svg>
    )
  }

  if (tool.kind === 'cursor') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#111" stroke="#414141" />
        <path d="m6.4 5.4 11.35 7.04-5.04 1.05-2.15 5.06L6.4 5.4Z" fill="#F4F4F4" />
        <path d="m11.95 13.3 4.2 4.2" stroke="#F4F4F4" strokeWidth="1.55" strokeLinecap="round" />
      </svg>
    )
  }

  if (tool.kind === 'antigravity') {
    return <img src={ANTIGRAVITY_ICON_URL} alt="" loading="lazy" decoding="async" />
  }

  if (tool.kind === 'chatgpt') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="6.2" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
        <circle cx="17.05" cy="9.1" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
        <circle cx="17.05" cy="14.9" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
        <circle cx="12" cy="17.8" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
        <circle cx="6.95" cy="14.9" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
        <circle cx="6.95" cy="9.1" r="3.25" stroke="#E8E8E8" strokeWidth="1.55" />
      </svg>
    )
  }

  if (tool.kind === 'codex') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#101114" stroke="#34363D" />
        <path d="m8 7-4 5 4 5M16 7l4 5-4 5M14.5 5.5l-5 13" stroke="#60A5FA" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (tool.kind === 'claude') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#D97757" />
        <path d="M12 5v14M5 12h14M7.05 7.05l9.9 9.9M16.95 7.05l-9.9 9.9M8.35 4.9l7.3 14.2M19.1 8.35 4.9 15.65M15.65 4.9 8.35 19.1M4.9 8.35l14.2 7.3" stroke="#FFF7ED" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    )
  }

  if (tool.kind === 'typescript') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect width="24" height="24" rx="3.5" fill="#3178C6" />
        <path d="M4.2 9.2h8.3v2.1H9.55v8.1H7.16v-8.1H4.2V9.2Zm9.1 9.6v-2.35c.82.68 1.9 1.08 2.98 1.08 1.16 0 1.74-.38 1.74-1.12 0-.31-.13-.56-.4-.75-.26-.2-.85-.46-1.75-.79-1.02-.37-1.76-.82-2.2-1.34-.45-.52-.67-1.17-.67-1.94 0-.93.36-1.66 1.08-2.19.72-.53 1.67-.8 2.85-.8 1.04 0 1.9.14 2.58.4v2.2a4.64 4.64 0 0 0-2.45-.67c-1.03 0-1.55.35-1.55 1.04 0 .29.12.52.36.7.24.18.76.42 1.58.72 1.08.39 1.86.85 2.34 1.39.48.53.72 1.22.72 2.04 0 .98-.36 1.73-1.07 2.25-.71.52-1.7.78-2.97.78-1.24 0-2.3-.22-3.17-.66Z" fill="#fff" />
      </svg>
    )
  }

  if (tool.kind === 'nextjs') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="11" fill="#F5F5F5" />
        <path d="M7.4 6.8h2.3l6.48 8.95V6.8h1.95v10.4h-2.27L9.35 8.27v8.93H7.4V6.8Z" fill="#111" />
        <path d="m10.1 7.2 7.7 10.6" stroke="#111" strokeWidth=".55" />
      </svg>
    )
  }

  if (tool.kind === 'tailwind') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 5.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.89 2.28 1.62C13.65 11 15 12.4 18 12.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.89-2.28-1.62C16.35 6.6 15 5.2 12 5.2ZM6 12.4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.56.89 2.28 1.62C7.65 18.2 9 19.6 12 19.6c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.56-.89-2.28-1.62C10.35 13.8 9 12.4 6 12.4Z" fill="#38BDF8" />
      </svg>
    )
  }

  if (tool.kind === 'supabase') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.35 21.5c-.43.55-1.32.25-1.33-.45l-.15-7.42H4.73c-.75 0-1.17-.87-.7-1.45L10.65 3.9c.43-.54 1.3-.24 1.31.45l.16 7.43h7.16c.75 0 1.17.87.7 1.45l-6.63 8.27Z" fill="#3ECF8E" />
        <path d="m12.12 11.78-.1 9.27c0 .7.9 1 1.33.45l6.63-8.27c.47-.58.05-1.45-.7-1.45h-7.16Z" fill="#2AB47F" />
      </svg>
    )
  }

  if (tool.kind === 'resend') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="#0B0B0B" stroke="#414141" />
        <path d="M7 18V6h5.35c3.12 0 5.05 1.54 5.05 4.18 0 1.9-1.03 3.25-2.8 3.83L18 18h-3.25l-3.02-3.62H9.65V18H7Zm2.65-5.9h2.48c1.7 0 2.57-.59 2.57-1.78 0-1.2-.87-1.8-2.57-1.8H9.65v3.58Z" fill="#F5F5F5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#0078D4" d="M9.5 17.5h9.2a3.3 3.3 0 0 0 .6-6.55A5.6 5.6 0 0 0 8.8 8.8a4.4 4.4 0 0 0 .7 8.7Z" />
      <path fill="#36A9E1" d="M4.9 18h10.6a3.05 3.05 0 0 0 .25-6.1 4.8 4.8 0 0 0-8.95-1.75A4 4 0 0 0 4.9 18Z" />
    </svg>
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
                  <ToolLogo tool={tool} />
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
                      <span className="tool-logo"><ToolLogo tool={tool} /></span>
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
