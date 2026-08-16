import { useEffect, useState, type CSSProperties } from 'react'
import methodsAndToolsMarkdown from '../content/methods-and-tools.md?raw'
import { capabilities, proofPoints } from '../data/portfolio'

const stages = [
  { label: 'Think', detail: 'Find the opportunity' },
  { label: 'Make', detail: 'Build the system' },
  { label: 'Prove', detail: 'Create the evidence' },
  { label: 'Create', detail: 'Make ideas felt' },
  { label: 'Big picture', detail: 'Track what AI changes' },
]

type ToolkitTone = 'paper' | 'yellow' | 'blue' | 'red'

type ToolkitGroup = {
  category: string
  descriptor: string
  tools: string[]
  tone: ToolkitTone
}

type ToolkitContent = {
  title: string
  intro: string
  groups: ToolkitGroup[]
}

const toolkitTones: ToolkitTone[] = [
  'yellow',
  'blue',
  'paper',
  'red',
  'paper',
]

function parseToolkit(markdown: string): ToolkitContent {
  const content: ToolkitContent = {
    title: 'Methods & tools',
    intro: '',
    groups: [],
  }
  let currentGroup: ToolkitGroup | undefined

  for (const sourceLine of markdown.split('\n')) {
    const line = sourceLine.trim()
    if (!line) continue

    if (line.startsWith('# ')) {
      content.title = line.slice(2).trim()
      continue
    }

    if (line.startsWith('> ')) {
      content.intro = `${content.intro} ${line.slice(2)}`.trim()
      continue
    }

    if (line.startsWith('## ')) {
      currentGroup = {
        category: line.slice(3).trim(),
        descriptor: '',
        tools: [],
        tone: toolkitTones[content.groups.length % toolkitTones.length],
      }
      content.groups.push(currentGroup)
      continue
    }

    if (line.startsWith('- ') && currentGroup) {
      currentGroup.tools.push(line.slice(2).trim())
      continue
    }

    if (currentGroup) {
      currentGroup.descriptor =
        `${currentGroup.descriptor} ${line}`.trim()
    }
  }

  return content
}

const toolkit = parseToolkit(methodsAndToolsMarkdown)

type BlobStyle = CSSProperties & {
  '--blob-radius': string
  '--blob-rotation': string
}

const initialBlobs: BlobStyle[] = [
  {
    '--blob-radius': '48% 52% 45% 55% / 54% 43% 57% 46%',
    '--blob-rotation': '-2deg',
  },
  {
    '--blob-radius': '55% 45% 52% 48% / 42% 57% 43% 58%',
    '--blob-rotation': '3deg',
  },
  {
    '--blob-radius': '44% 56% 58% 42% / 51% 46% 54% 49%',
    '--blob-rotation': '-3deg',
  },
  {
    '--blob-radius': '57% 43% 47% 53% / 46% 55% 45% 54%',
    '--blob-rotation': '2deg',
  },
  {
    '--blob-radius': '46% 54% 42% 58% / 58% 45% 55% 42%',
    '--blob-rotation': '-2deg',
  },
]

function randomBlob(): BlobStyle {
  const value = () => Math.round(37 + Math.random() * 26)
  const a = value()
  const b = value()
  const c = value()
  const d = value()

  return {
    '--blob-radius': `${a}% ${100 - a}% ${b}% ${100 - b}% / ${c}% ${d}% ${100 - d}% ${100 - c}%`,
    '--blob-rotation': `${(Math.random() * 10 - 5).toFixed(1)}deg`,
  }
}

export function Capabilities() {
  const [blobStyles, setBlobStyles] = useState(initialBlobs)

  useEffect(() => {
    setBlobStyles(stages.map(() => randomBlob()))
  }, [])

  return (
    <div className="capabilities">
      <div className="capability-map__legend">
        <p>From an ambiguous opportunity</p>
        <span aria-hidden="true">→</span>
        <strong>A working, tested direction</strong>
      </div>

      <div className="capability-map">
        <p className="capability-map__instruction">
          My work joins strategy, technology and research in one continuous
          practice.
        </p>

        <dl className="capability-proof">
          {proofPoints.map((point) => (
            <div key={point.label}>
              <dt>{point.value}</dt>
              <dd>
                <strong>{point.label}</strong>
                <span>{point.detail}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="capability-map__rows">
          {stages.map((stage, rowIndex) => {
            const pair = capabilities.slice(rowIndex * 2, rowIndex * 2 + 2)

            return (
              <div className="capability-map__row" key={stage.label}>
                {pair.map((capability, pairIndex) => (
                  <div
                    className={`capability-node capability-node--${pairIndex === 0 ? 'left' : 'right'}`}
                    key={capability.area}
                  >
                    <span className="capability-node__number">
                      {String(rowIndex * 2 + pairIndex + 1).padStart(2, '0')}
                    </span>
                    <h3>{capability.area}</h3>
                    <p>{capability.summary}</p>
                    <ul>
                      {capability.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                    <p className="capability-node__evidence">
                      <span>Evidence</span> {capability.evidence}
                    </p>
                  </div>
                ))}

                <div className="capability-stage" style={blobStyles[rowIndex]}>
                  <span>{stage.label}</span>
                  <small>{stage.detail}</small>
                </div>
              </div>
            )
          })}
        </div>

        <div className="capability-map__outcome">
          <span>Outcome</span>
          <strong>Ideas people can experience, examine and build on.</strong>
        </div>
      </div>

      <div className="toolkit-atlas">
        <div className="toolkit-atlas__title">
          <span>{toolkit.title}</span>
          <strong>{toolkit.intro}</strong>
        </div>
        <div className="toolkit-atlas__grid">
          {toolkit.groups.map((group, index) => (
            <section
              className={`toolkit-group toolkit-group--${group.tone}`}
              key={group.category}
            >
              <div
                className={`toolkit-group__heading${group.descriptor ? '' : ' toolkit-group__heading--compact'}`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{group.category}</h4>
                  {group.descriptor && <p>{group.descriptor}</p>}
                </div>
              </div>
              <ul>
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
