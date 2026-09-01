import { Arrow } from './Arrow'

const causerieOutputUrl =
  'https://ai-phi.github.io/posts/fears-trust-post/'
const creativeCommunityUrl =
  'https://ai-phi.github.io/posts/ai-phi-creative/'

const programme = [
  {
    label: 'Seminar series',
    title: 'Bring expertise into the room',
    description:
      'Invited researchers and practitioners present a position, then open it to sustained interdisciplinary discussion.',
  },
  {
    label: 'Causeries',
    title: 'Think together, not at an audience',
    description:
      'Member-led conversations inspired by the Parisian salon use shared questions, readings and short contributions to examine a topic.',
  },
  {
    label: 'Community',
    title: 'Continue beyond the session',
    description:
      'News updates, informal exchanges, drinks and dinners create the trust needed for ideas to travel between disciplines.',
  },
]

const selectedSessions = [
  {
    number: '38',
    title: 'Consciousness in AI Research',
    speaker: 'Thierry Poibeau · CNRS / ENS',
    url: 'https://ai-phi.github.io/posts/session-38-poibeau-consciousness-ai-research/',
  },
  {
    number: '24',
    title: 'Qualia and Symmetry',
    speaker: 'Ryota Kanai · Araya',
    url: 'https://ai-phi.github.io/posts/session-24-ryota-kanai/',
  },
  {
    number: '21',
    title: 'Alignment with Human Values',
    speaker: 'Mehdi Khamassi · CNRS / Sorbonne',
    url: 'https://ai-phi.github.io/posts/session-21-khamassi-alignment-human-values/',
  },
  {
    number: '20',
    title: 'What Is Reasoning?',
    speaker: 'AI–Phi causerie',
    url: 'https://ai-phi.github.io/posts/session-20-Causerie-Reasoning/',
  },
]

export function AiPhiFeature() {
  return (
    <div className="ai-phi-feature">
      <header className="ai-phi-feature__header">
        <span>Project focus / 03</span>
        <span>AI–Phi</span>
        <span>Community practice · Paris</span>
      </header>

      <div className="ai-phi-feature__intro">
        <div>
          <p className="ai-phi-feature__eyebrow">
            AI × Philosophy × Community
          </p>
          <h3>A room for the questions technology cannot answer alone.</h3>
        </div>
        <div className="ai-phi-feature__copy">
          <p>
            AI–Phi is a Paris-based community of researchers and professionals
            united by an interest in the intersection of artificial
            intelligence and philosophy. We track the ideas shaping a rapidly
            changing world through seminars, participatory conversations and
            informal community activity.
          </p>
          <p>
            I am a <strong>co-founder and organiser of AI–Phi</strong>. I help
            shape the programme, facilitate discussion and create a space where
            technical, philosophical and societal perspectives can genuinely
            meet.
          </p>
        </div>
      </div>

      <dl className="ai-phi-feature__facts">
        <div>
          <dt>40</dt>
          <dd>Sessions reached by June 2026</dd>
        </div>
        <div>
          <dt>03</dt>
          <dd>Seminars, causeries and other sessions</dd>
        </div>
        <div>
          <dt>Paris</dt>
          <dd>A local interdisciplinary community</dd>
        </div>
        <div className="ai-phi-feature__role">
          <dt>My role</dt>
          <dd>Co-founder &amp; organiser</dd>
        </div>
      </dl>

      <div className="ai-phi-feature__programme">
        {programme.map((item, index) => (
          <article key={item.label}>
            <span>0{index + 1} / {item.label}</span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <section className="ai-phi-feature__evidence">
        <article className="ai-phi-feature__output">
          <span>Causerie output / 15 January 2026</span>
          <h4>Hopes, fears, trust, understanding and regulation</h4>
          <p>
            A collective response to an open discussion about the gap between
            engineering uncertainty and public expectations of AI. The
            resulting contributions examine autonomy, persuasion, ethics,
            trust and the limits of regulating emergent systems.
          </p>
          <small>
            Includes Michael&apos;s contribution on the limits of pragmatic
            evaluations of intelligence.
          </small>
          <a href={causerieOutputUrl} target="_blank" rel="noreferrer">
            Read the collective output
            <Arrow />
          </a>
        </article>

        <div className="ai-phi-feature__community">
          <a href={creativeCommunityUrl} target="_blank" rel="noreferrer">
            <figure>
              <img
                src="https://ai-phi.github.io/assets/edmund-drawing-lestel-small-75.jpg"
                alt="Edmund Ronald's live sketch from an AI–Phi session"
                loading="lazy"
              />
              <figcaption>
                <span>Creative community / Live sketch</span>
                Edmund Ronald&apos;s live sketch made during the session with
                Dominique Lestel.
              </figcaption>
            </figure>
          </a>
          <a href={creativeCommunityUrl} target="_blank" rel="noreferrer">
            <figure>
              <img
                src="https://ai-phi.github.io/assets/pic-session-26.jpg"
                alt="Members of the AI–Phi community gathered for session 26"
                loading="lazy"
              />
              <figcaption>
                <span>Community / Session 26</span>
                Snapshot of one of our sessions at Sony CSL Paris in the
                Quartier Latin.
              </figcaption>
            </figure>
          </a>
        </div>
      </section>

      <div className="ai-phi-feature__sessions">
        <div className="ai-phi-feature__sessions-intro">
          <span>Selected conversations</span>
          <h4>Ideas we have put on the table.</h4>
          <p>
            Across forty sessions, the programme has moved between minds,
            machines, values, language, agency, regulation and the material
            foundations of computation.
          </p>
        </div>
        <ol>
          {selectedSessions.map((session) => (
            <li key={session.number}>
              <a href={session.url} target="_blank" rel="noreferrer">
                <span>{session.number}</span>
                <strong>
                  {session.title}
                  <small>{session.speaker}</small>
                </strong>
                <Arrow />
              </a>
            </li>
          ))}
        </ol>
      </div>

      <footer className="ai-phi-feature__footer">
        <p>
          A sustained forum for treating AI as a technical, philosophical and
          cultural project at the same time.
        </p>
        <a href="https://ai-phi.github.io/" target="_blank" rel="noreferrer">
          Visit AI–Phi
          <Arrow />
        </a>
      </footer>
    </div>
  )
}
