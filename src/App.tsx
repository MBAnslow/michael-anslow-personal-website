import { useEffect, useState } from 'react'
import { AiPhiFeature } from './components/AiPhiFeature'
import { Arrow } from './components/Arrow'
import { BelongingFeature } from './components/BelongingFeature'
import { Capabilities } from './components/Capabilities'
import { EducationFeature } from './components/EducationFeature'
import { FunikiFeature } from './components/FunikiFeature'
import { PoiesisFeature } from './components/PoiesisFeature'
import { ProjectCard } from './components/ProjectCard'
import { Reveal } from './components/Reveal'
import { SectionHeading } from './components/SectionHeading'
import { TileMosaic } from './components/TileMosaic'
import {
  essays,
  otherWork,
  profileLinks,
  projects,
  publications,
} from './data/portfolio'
import { basePath } from './utils/basePath'

const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'capabilities' },
  { label: 'Projects', id: 'projects' },
  { label: 'Research', id: 'research' },
]

const blogPath = `${basePath}blog/`
const projectAnchor = (title: string) =>
  title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Michael Anslow, home">
          <span>M</span>
          <span>A</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul>
            {navigation.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={activeSection === id ? 'location' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mobile-blog-nav">
              <a href="#writing">Blog</a>
            </li>
          </ul>
        </nav>
        <a className="header-link" href="#writing">
          Explore the blog
          <Arrow />
        </a>
      </header>

      <main id="main">
        <section className="hero-section" id="top" aria-labelledby="hero-title">
          <div className="hero-section__meta">
            <span>Researcher / Innovator</span>
            <span>Paris, France</span>
          </div>

          <h1 id="hero-title">
            <span>Michael</span>
            <span className="hero-section__surname">Anslow</span>
          </h1>

          <div className="hero-section__lower">
            <div className="hero-mark" aria-hidden="true">
              <svg viewBox="0 0 240 240">
                <circle cx="120" cy="120" r="75" />
                <circle cx="120" cy="120" r="48" />
                <path d="M120 0v240M0 120h240" />
                <rect x="92" y="92" width="56" height="56" />
              </svg>
              <span>0→1</span>
            </div>
            <div className="hero-section__intro">
              <p>
                I build new technological experiences, embedded in research and
                informed by a wider societal vision.
              </p>
              <nav
                className="hero-section__routes"
                aria-label="Explore the portfolio"
              >
                <a href="#projects">
                  <span>Projects</span>
                  <small>Selected + other work</small>
                  <Arrow />
                </a>
                <a href="#capabilities">
                  <span>Skills</span>
                  <small>Capabilities + methods</small>
                  <Arrow />
                </a>
              </nav>
            </div>
          </div>

          <div className="hero-stamp" aria-hidden="true">
            <span>AI</span>
            <span>CREATIVITY</span>
            <span>PHILOSOPHY</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            <span>Making ideas tangible</span>
            <i>✦</i>
            <span>AI as a creative material</span>
            <i>✦</i>
            <span>Systems before silos</span>
            <i>✦</i>
            <span>Making ideas tangible</span>
            <i>✦</i>
            <span>AI as a creative material</span>
          </div>
        </div>

        <section className="page-section about-section" id="about">
          <SectionHeading
            index="01"
            title="Between systems and stories"
            note="A practice grounded in engineering, expanded through research and philosophy."
          />
          <Reveal className="about-grid">
            <div className="about-copy">
              <p className="lead">
                My work sits at the point where a speculative idea becomes a
                working system.
              </p>
              <div className="about-copy__columns">
                <p>
                  I am a researcher and research engineer at Sony Computer
                  Science Laboratories in Paris. My background in natural
                  language processing has grown into a wider practice spanning
                  multimodal AI, audio–visual experience and creative
                  assistance.
                </p>
                <p>
                  Alongside building technology, I explore the social,
                  philosophical and ethical questions around it. I co-founded
                  AI–Phi to create a shared space for those conversations
                  across disciplines.
                </p>
              </div>
              <dl className="practice-list">
                <div>
                  <dt>01</dt>
                  <dd>Prototype the future</dd>
                </div>
                <div>
                  <dt>02</dt>
                  <dd>Research through making</dd>
                </div>
                <div>
                  <dt>03</dt>
                  <dd>Connect technical and human questions</dd>
                </div>
              </dl>
            </div>
            <TileMosaic />
          </Reveal>
        </section>

        <section
          className="page-section capabilities-section"
          id="capabilities"
        >
          <SectionHeading
            index="02"
            title="What I bring"
            note="A broad technical practice with evidence in shipped prototypes, published research and long-running collaborations."
          />
          <Reveal>
            <Capabilities />
          </Reveal>
        </section>

        <section className="page-section work-section" id="projects">
          <SectionHeading
            index="03"
            title="Selected work"
            note="Projects that move between artificial intelligence, creative practice and collective inquiry."
          />
          <div className="project-list">
            {projects.map((project) => (
              <Reveal key={project.title}>
                <div
                  className={`project-accordion${project.number === '05' ? ' side-interest-accordion' : ''}`}
                  id={`project-${projectAnchor(project.title)}`}
                >
                  <ProjectCard
                    project={project}
                    expanded={expandedProject === project.number}
                    controls={`project-details-${project.number}`}
                    onToggle={() =>
                      setExpandedProject((current) =>
                        current === project.number ? null : project.number,
                      )
                    }
                  />
                  {expandedProject === project.number && (
                    <div
                      className="project-expansion"
                      id={`project-details-${project.number}`}
                    >
                      {project.number === '01' && <FunikiFeature />}
                      {project.number === '02' && <BelongingFeature />}
                      {project.number === '03' && <AiPhiFeature />}
                      {project.number === '04' && <PoiesisFeature />}
                      {project.number === '05' && <EducationFeature />}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          className="page-section other-work-section"
          id="other-work"
        >
          <SectionHeading
            index="04"
            title="Other work"
            note="Previous projects, collaborations, research threads, wider practice."
          />
          <Reveal>
            <div className="other-work-list">
              {otherWork.map((item, index) => (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={item.title}
                >
                  <span className="other-work-list__number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="other-work-list__title">
                    <span>{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <strong>Role: {item.role}</strong>
                  </div>
                  <p>{item.description}</p>
                  <Arrow />
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="page-section research-section" id="research">
          <SectionHeading
            index="05"
            title="Research"
            note="Selected publications across music AI, natural language processing, knowledge representation and data analysis."
          />
          <Reveal>
            <div className="research-intro">
              <p>
                The through-line is an interest in how complex representations
                become useful, navigable experiences.
              </p>
              <a
                className="text-link"
                href="https://scholar.google.com/citations?user=VjnHrW8AAAAJ&hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Full profile on Scholar
                <Arrow />
              </a>
            </div>
            <ol className="publication-list">
              {publications.map((publication, index) => (
                <li key={publication.title}>
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="publication-list__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="publication-list__title">
                      {publication.title}
                      <small>{publication.authors}</small>
                    </span>
                    <span className="publication-list__meta">
                      {publication.venue}
                      <strong>{publication.year}</strong>
                    </span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="writing-section" id="writing">
          <div className="writing-section__inner">
            <div className="blog-gateway">
              <div className="blog-gateway__meta">
                <span>Portfolio ends / Writing begins</span>
                <span>A distinct space for longer-form ideas</span>
              </div>
              <div className="blog-gateway__body">
                <div>
                  <span className="blog-gateway__eyebrow">Beyond the work</span>
                  <h2>
                    Enter the
                    <strong>blog</strong>
                  </h2>
                </div>
                <div className="blog-gateway__copy">
                  <p>
                    Essays on creative tools, societal myths, awe and the
                    changing relationship between people and AI.
                  </p>
                  <a href={blogPath}>
                    Open the writing site
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
            <div className="essay-grid__heading">
              <span>Selected writing</span>
              <span>{String(essays.length).padStart(2, '0')} essays</span>
            </div>
            <Reveal>
              <div className="essay-grid">
                {essays.map((essay, index) => (
                  <a
                    className={index === 0 ? 'essay-card essay-card--featured' : 'essay-card'}
                    href={
                      essay.localSlug
                        ? `${blogPath}${essay.localSlug}/`
                        : essay.url
                    }
                    target={essay.localSlug ? undefined : '_blank'}
                    rel={essay.localSlug ? undefined : 'noreferrer'}
                    key={`${essay.title}-${essay.subtitle}`}
                  >
                    <span className="essay-card__date">{essay.date}</span>
                    <div>
                      <h3>{essay.title}</h3>
                      <p>{essay.subtitle}</p>
                    </div>
                    <Arrow />
                  </a>
                ))}
              </div>
            </Reveal>
            <a
              className="writing-profile-link"
              href={blogPath}
            >
              Browse the complete blog
              <Arrow />
            </a>
          </div>
        </section>

        <section className="connect-section" id="connect">
          <div className="connect-section__kicker">
            <span>Have an unusual idea?</span>
            <span>Let&apos;s make it tangible.</span>
          </div>
          <div className="connect-section__compact">
            <h2>Let&apos;s connect.</h2>
            <div className="connect-section__footer">
              <p>
                Open to conversations about creative AI, research prototypes,
                philosophy and emerging forms of experience.
              </p>
              <ul>
                {profileLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Michael Anslow © {new Date().getFullYear()}</span>
        <a href="#top">Back to top ↑</a>
        <span>Built with curiosity in Paris</span>
      </footer>
    </>
  )
}

export default App
