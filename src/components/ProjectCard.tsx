import { useEffect, useRef } from 'react'
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
  const bodyRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const body = bodyRef.current
    const title = titleRef.current
    const description = descriptionRef.current

    if (!body || !title || !description) return

    const updateOverlap = () => {
      const descriptionCharacters = description.querySelectorAll<HTMLElement>(
        '[data-description-character]',
      )
      const titleText = title.firstChild

      if (
        window.innerWidth < 901 ||
        !titleText ||
        titleText.nodeType !== Node.TEXT_NODE
      ) {
        descriptionCharacters.forEach((character) => {
          character.classList.remove(
            'project-card__description-character--overlap',
          )
        })
        return
      }

      const bodyRect = body.getBoundingClientRect()
      const width = Math.max(1, Math.ceil(bodyRect.width))
      const height = Math.max(1, Math.ceil(bodyRect.height))
      const titleCanvas = document.createElement('canvas')
      const descriptionCanvas = document.createElement('canvas')
      titleCanvas.width = descriptionCanvas.width = width
      titleCanvas.height = descriptionCanvas.height = height
      const titleContext = titleCanvas.getContext('2d')
      const descriptionContext = descriptionCanvas.getContext('2d')

      if (!titleContext || !descriptionContext) return

      const drawCharacter = (
        context: CanvasRenderingContext2D,
        character: string,
        rectangle: DOMRect,
        styles: CSSStyleDeclaration,
      ) => {
        context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
        context.textBaseline = 'alphabetic'
        context.fillStyle = '#000'

        const metrics = context.measureText(character)
        const inkHeight =
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
        const baseline =
          rectangle.top -
          bodyRect.top +
          (rectangle.height - inkHeight) / 2 +
          metrics.actualBoundingBoxAscent
        const scaleX =
          metrics.width > 0 ? Math.max(0.5, rectangle.width / metrics.width) : 1

        context.save()
        context.translate(rectangle.left - bodyRect.left, baseline)
        context.scale(scaleX, 1)
        context.fillText(character, 0, 0)
        context.restore()
      }

      const titleStyles = window.getComputedStyle(title)
      const value = titleText.textContent ?? ''
      const renderedTitle =
        titleStyles.textTransform === 'uppercase'
          ? value.toLocaleUpperCase()
          : titleStyles.textTransform === 'lowercase'
            ? value.toLocaleLowerCase()
            : value

      for (let index = 0; index < value.length; index += 1) {
        if (/\s/.test(value[index])) continue

        const range = document.createRange()
        range.setStart(titleText, index)
        range.setEnd(titleText, index + 1)
        Array.from(range.getClientRects()).forEach((rectangle) => {
          drawCharacter(
            titleContext,
            renderedTitle[index],
            rectangle,
            titleStyles,
          )
        })
      }

      const descriptionStyles = window.getComputedStyle(description)
      descriptionCharacters.forEach((character) => {
        drawCharacter(
          descriptionContext,
          character.textContent ?? '',
          character.getBoundingClientRect(),
          descriptionStyles,
        )
      })

      const titlePixels = titleContext.getImageData(0, 0, width, height).data
      const descriptionPixels = descriptionContext.getImageData(
        0,
        0,
        width,
        height,
      ).data

      descriptionCharacters.forEach((character) => {
        const rectangle = character.getBoundingClientRect()
        const left = Math.max(0, Math.floor(rectangle.left - bodyRect.left))
        const right = Math.min(width, Math.ceil(rectangle.right - bodyRect.left))
        const top = Math.max(0, Math.floor(rectangle.top - bodyRect.top))
        const bottom = Math.min(
          height,
          Math.ceil(rectangle.bottom - bodyRect.top),
        )
        let overlappingPixels = 0

        for (
          let y = top;
          y < bottom && overlappingPixels < 3;
          y += 1
        ) {
          for (let x = left; x < right; x += 1) {
            const alphaIndex = (y * width + x) * 4 + 3

            if (
              titlePixels[alphaIndex] > 24 &&
              descriptionPixels[alphaIndex] > 24
            ) {
              overlappingPixels += 1
              if (overlappingPixels >= 3) break
            }
          }
        }

        character.classList.toggle(
          'project-card__description-character--overlap',
          overlappingPixels >= 3,
        )
      })
    }

    updateOverlap()

    const observer = new ResizeObserver(updateOverlap)
    observer.observe(body)
    observer.observe(title)
    observer.observe(description)
    void document.fonts.ready.then(updateOverlap)

    return () => observer.disconnect()
  }, [project.description, project.title])

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
      <div className="project-card__body" ref={bodyRef}>
        <ProjectSymbol title={project.title} />
        <h3 ref={titleRef}>{project.title}</h3>
        <p ref={descriptionRef}>
          {project.description.split(/(\s+)/).map((token, tokenIndex) =>
            /\s+/.test(token) ? (
              token
            ) : (
              <span
                className="project-card__description-word"
                key={`${token}-${tokenIndex}`}
              >
                {Array.from(token).map((character, characterIndex) => (
                  <span
                    data-description-character
                    key={`${character}-${characterIndex}`}
                  >
                    {character}
                  </span>
                ))}
              </span>
            ),
          )}
        </p>
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
