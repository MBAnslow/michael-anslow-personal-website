import methodsAndToolsMarkdown from '../content/methods-and-tools.md?raw'

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

const innovationStages = [
  {
    label: '01 / Inspiration',
    outcome: 'Vague intuitions',
    detail: 'Observation · Possibility mapping · Initial hypotheses',
  },
  {
    label: '02 / Conceptualisation',
    outcome: 'Articulated concepts embedded in research',
    detail: 'Literature review · Concept framing · Research questions',
  },
  {
    label: '03 / Systematisation',
    outcome: 'Systematised understanding and requirements',
    detail: 'Principles · Requirements · Data, model and evaluation design',
  },
  {
    label: '04 / Implementation',
    outcome: 'Concrete implementations',
    detail: 'Prototyping · Integration · Testing and iteration',
  },
]

export function PracticeOverview() {
  return (
    <div className="practice-overview">
      <div className="practice-overview__copy">
        <p className="lead">
          I turn early ideas into working technological experiences.
        </p>
        <div className="practice-overview__details">
          <p>
            I take early-stage AI ideas from vague opportunity through research
            framing, data and model development, interactive prototyping,
            evaluation and communication. My work is deliberately practical:
            research questions are explored inside systems that people can use,
            test and respond to.
          </p>
          <p>
            Across natural language processing and multimodal AI, I have built
            systems for knowledge representation, document exploration, public
            discourse analysis, creative writing and text–audio modelling. This
            includes an AI writing assistant used by professional musicians and
            Funiki, which extends generative technology into dynamic
            light-and-sound experiences for physical spaces.
          </p>
          <p>
            I also lead collaborations, communicate complex research and create
            spaces where technical and human questions can meet. I co-founded
            an interdisciplinary AI and philosophy community, and contribute
            technical support and research to discussions about the potential
            role of AI in education.
          </p>
        </div>
      </div>
      <div className="practice-overview__process">
        <ol className="capability-map__legend" aria-label="Innovation journey">
          {innovationStages.map((stage) => (
            <li key={stage.label}>
              <div className="capability-map__step">
                <span>{stage.label}</span>
                <p>{stage.outcome}</p>
              </div>
              <p className="practice-overview__example">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Capabilities() {
  return (
    <div className="capabilities">
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
