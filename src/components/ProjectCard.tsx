import type { CSSProperties, PointerEvent } from 'react'
import type { Project } from '../data/portfolio'
import { ProjectSymbol } from './ProjectSymbol'

type ProjectCardProps = {
  project: Project
  expanded: boolean
  controls: string
  onToggle: () => void
}

type TiltProperties = CSSProperties & {
  '--tilt-x': string
  '--tilt-y': string
}

const neutralTilt: TiltProperties = {
  '--tilt-x': '0deg',
  '--tilt-y': '0deg',
}

export function ProjectCard({
  project,
  expanded,
  controls,
  onToggle,
}: ProjectCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    event.currentTarget.style.setProperty('--tilt-y', `${x * 2.4}deg`)
    event.currentTarget.style.setProperty('--tilt-x', `${y * -2.4}deg`)
  }

  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <article
      className={`project-card project-card--${project.accent}${expanded ? ' project-card--expanded' : ''}`}
      style={neutralTilt}
      onClick={onToggle}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="project-card__topline">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
        <span className="project-card__role">Role: {project.role}</span>
      </div>
      <div className="project-card__body">
        <ProjectSymbol title={project.title} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-card__footer">
        <div className="project-card__footer-content">
          <dl className="project-card__skills">
            <div>
              <dt>Technical practice</dt>
              <dd>{project.skills.technical.join(' · ')}</dd>
            </div>
            <div>
              <dt>Ways of working</dt>
              <dd>{project.skills.soft.join(' · ')}</dd>
            </div>
          </dl>
        </div>
        <button
          className="project-card__action"
          type="button"
          aria-expanded={expanded}
          aria-controls={controls}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${project.title} project details`}
        >
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
      </div>
    </article>
  )
}
