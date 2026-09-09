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

function renderDescriptionText(text: string) {
  return text.split(/(\s+)/).map((token, tokenIndex) =>
    /\s+/.test(token) ? (
      token
    ) : (
      <span
        className="project-card__description-word"
        data-description-word
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
  )
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

    let fittedBodyWidth = -1
    let fittedBodyHeight = -1
    let fittedTitleWidth = -1
    let fittedTitleHeight = -1

    const fitTitle = () => {
      const bodyRect = body.getBoundingClientRect()
      const titleWidth = title.clientWidth
      const titleHeight = title.clientHeight

      if (window.innerWidth < 901) {
        title.style.removeProperty('font-size')
        fittedBodyWidth = bodyRect.width
        fittedBodyHeight = bodyRect.height
        fittedTitleWidth = titleWidth
        fittedTitleHeight = titleHeight
        return
      }

      if (
        Math.abs(bodyRect.width - fittedBodyWidth) < 0.5 &&
        Math.abs(bodyRect.height - fittedBodyHeight) < 0.5 &&
        Math.abs(titleWidth - fittedTitleWidth) < 0.5 &&
        Math.abs(titleHeight - fittedTitleHeight) < 0.5
      ) {
        return
      }

      fittedBodyWidth = bodyRect.width
      fittedBodyHeight = bodyRect.height
      fittedTitleWidth = titleWidth
      fittedTitleHeight = titleHeight
      title.style.removeProperty('font-size')

      const preferredSize = Number.parseFloat(
        window.getComputedStyle(title).fontSize,
      )
      const fits = () => {
        const frame = title.getBoundingClientRect()
        const styles = window.getComputedStyle(title)
        const innerTop =
          frame.top +
          Number.parseFloat(styles.borderTopWidth) +
          Number.parseFloat(styles.paddingTop)
        const innerRight =
          frame.right -
          Number.parseFloat(styles.borderRightWidth) -
          Number.parseFloat(styles.paddingRight)
        const words = title.querySelectorAll<HTMLElement>(
          '.project-card__title-word',
        )
        const letters = title.querySelectorAll<HTMLElement>(
          '[data-title-character]',
        )

        const clearsTopEdge = Array.from(words).every(
          (word) => word.getBoundingClientRect().top >= innerTop - 1,
        )
        const clearsRightEdge = Array.from(letters).every(
          (letter) => letter.getBoundingClientRect().right <= innerRight + 1,
        )

        return clearsTopEdge && clearsRightEdge
      }
      let minimumSize = 16
      let maximumSize = Math.max(
        preferredSize,
        title.clientHeight * 1.5,
        title.clientWidth * 0.5,
      )

      title.style.fontSize = `${maximumSize}px`

      while (fits() && maximumSize < 512) {
        minimumSize = maximumSize
        maximumSize = Math.min(512, maximumSize * 1.35)
        title.style.fontSize = `${maximumSize}px`
      }

      for (let iteration = 0; iteration < 14; iteration += 1) {
        const candidate = (minimumSize + maximumSize) / 2
        title.style.fontSize = `${candidate}px`

        if (fits()) {
          minimumSize = candidate
        } else {
          maximumSize = candidate
        }
      }

      title.style.fontSize = `${minimumSize}px`
    }

    const fitDescription = () => {
      if (window.innerWidth < 901) {
        description.style.removeProperty('left')
        description.style.removeProperty('right')
        description.style.removeProperty('width')
        return
      }

      const bodyRect = body.getBoundingClientRect()
      const symbol = body.querySelector<SVGElement>('.project-symbol')
      const symbolRect = symbol?.getBoundingClientRect()
      const iconGap = 20
      const minLeft = 20
      const preferredWidth = bodyRect.width * 0.46
      const rightLimit = symbolRect
        ? Math.min(
            body.clientWidth - 20,
            Math.max(minLeft + 160, symbolRect.left - bodyRect.left - iconGap),
          )
        : body.clientWidth * 0.78
      const maxWidth = Math.max(160, rightLimit - minLeft)
      const words = description.querySelectorAll<HTMLElement>(
        '.project-card__description-copy .project-card__description-word',
      )

      const applyWidth = (width: number) => {
        description.style.left = 'auto'
        description.style.right = `${body.clientWidth - rightLimit}px`
        description.style.width = `${width}px`
      }

      const textFits = () => {
        const styles = window.getComputedStyle(description)
        const frame = description.getBoundingClientRect()
        const innerLeft =
          frame.left + Number.parseFloat(styles.paddingLeft)
        const innerRight =
          frame.right - Number.parseFloat(styles.paddingRight)

        return Array.from(words).every((word) => {
          const rectangle = word.getBoundingClientRect()

          return (
            rectangle.left >= innerLeft - 1 &&
            rectangle.right <= innerRight + 1
          )
        })
      }

      applyWidth(Math.min(preferredWidth, maxWidth))

      if (textFits()) return

      let minimumWidth = Math.min(preferredWidth, maxWidth)
      let maximumWidth = maxWidth

      for (let iteration = 0; iteration < 14; iteration += 1) {
        const candidate = (minimumWidth + maximumWidth) / 2
        applyWidth(candidate)

        if (textFits()) {
          maximumWidth = candidate
        } else {
          minimumWidth = candidate
        }
      }

      applyWidth(maximumWidth)

      if (!textFits()) {
        applyWidth(maxWidth)
      }
    }

    const updateOverlap = () => {
      fitTitle()
      fitDescription()

      const titleLetters = title.querySelectorAll<HTMLElement>(
        '[data-title-character]',
      )
      const descriptionLetters = description.querySelectorAll<HTMLElement>(
        '.project-card__description-copy [data-description-character]',
      )
      const clearOverlapBox = () => {
        description.style.removeProperty('--description-title-mask')
        delete body.dataset.overlapBox
        description.style.removeProperty('left')
        description.style.removeProperty('right')
        description.style.removeProperty('width')
        body.style.removeProperty('--overlap-box-left')
        body.style.removeProperty('--overlap-box-top')
        body.style.removeProperty('--overlap-box-width')
        body.style.removeProperty('--overlap-box-height')
      }

      if (
        window.innerWidth < 901 ||
        titleLetters.length === 0 ||
        descriptionLetters.length === 0
      ) {
        clearOverlapBox()
        return
      }

      const bodyRect = body.getBoundingClientRect()
      const canvasWidth = Math.max(1, Math.ceil(bodyRect.width))
      const canvasHeight = Math.max(1, Math.ceil(bodyRect.height))
      const titleCanvas = document.createElement('canvas')
      titleCanvas.width = canvasWidth
      titleCanvas.height = canvasHeight
      const titleContext = titleCanvas.getContext('2d')

      if (!titleContext) {
        clearOverlapBox()
        return
      }

      const drawLetter = (
        context: CanvasRenderingContext2D,
        letter: HTMLElement,
        styles: CSSStyleDeclaration,
        uppercase = false,
      ) => {
        const character = uppercase
          ? (letter.textContent ?? '').toLocaleUpperCase()
          : (letter.textContent ?? '')
        const rectangle = letter.getBoundingClientRect()
        context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
        context.textBaseline = 'alphabetic'
        context.fillStyle = '#000'

        const metrics = context.measureText(character)
        const ascent =
          metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent
        const descent =
          metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent
        const baseline =
          rectangle.top -
          bodyRect.top +
          (rectangle.height - ascent - descent) / 2 +
          ascent

        context.fillText(
          character,
          rectangle.left - bodyRect.left,
          baseline,
        )
      }

      const titleStyles = window.getComputedStyle(title)
      titleLetters.forEach((letter) => {
        drawLetter(titleContext, letter, titleStyles, true)
      })

      const titlePixels = titleContext.getImageData(
        0,
        0,
        canvasWidth,
        canvasHeight,
      ).data

      const descriptionRect = description.getBoundingClientRect()
      const maskWidth = Math.max(1, Math.ceil(descriptionRect.width))
      const maskHeight = Math.max(1, Math.ceil(descriptionRect.height))
      const maskCanvas = document.createElement('canvas')
      maskCanvas.width = maskWidth
      maskCanvas.height = maskHeight
      const maskContext = maskCanvas.getContext('2d')

      if (maskContext) {
        const mask = maskContext.createImageData(maskWidth, maskHeight)
        const offsetX = descriptionRect.left - bodyRect.left
        const offsetY = descriptionRect.top - bodyRect.top

        for (let y = 0; y < maskHeight; y += 1) {
          for (let x = 0; x < maskWidth; x += 1) {
            const maskIndex = (y * maskWidth + x) * 4
            const bodyX = Math.floor(offsetX + x)
            const bodyY = Math.floor(offsetY + y)
            const insideBody =
              bodyX >= 0 &&
              bodyX < canvasWidth &&
              bodyY >= 0 &&
              bodyY < canvasHeight
            const titleAlpha = insideBody
              ? titlePixels[(bodyY * canvasWidth + bodyX) * 4 + 3]
              : 0

            mask.data[maskIndex] = 255
            mask.data[maskIndex + 1] = 255
            mask.data[maskIndex + 2] = 255
            mask.data[maskIndex + 3] = titleAlpha
          }
        }

        maskContext.putImageData(mask, 0, 0)
        description.style.setProperty(
          '--description-title-mask',
          `url("${maskCanvas.toDataURL()}")`,
        )
      }
      const boxLeft = descriptionRect.left
      const boxTop = descriptionRect.top
      const boxRight = descriptionRect.right
      const boxBottom = descriptionRect.bottom

      const left = boxLeft - bodyRect.left
      const top = boxTop - bodyRect.top
      const right = boxRight - bodyRect.left
      const bottom = boxBottom - bodyRect.top

      body.dataset.overlapBox = 'true'
      body.style.setProperty('--overlap-box-left', `${left}px`)
      body.style.setProperty('--overlap-box-top', `${top}px`)
      body.style.setProperty('--overlap-box-width', `${right - left}px`)
      body.style.setProperty('--overlap-box-height', `${bottom - top}px`)
    }

    updateOverlap()

    const observer = new ResizeObserver(updateOverlap)
    observer.observe(body)
    observer.observe(title)
    observer.observe(description)
    void document.fonts.ready.then(() => {
      fittedBodyWidth = -1
      fittedBodyHeight = -1
      fittedTitleWidth = -1
      fittedTitleHeight = -1
      updateOverlap()
    })

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
      data-project-number={project.number}
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
        <h3 ref={titleRef}>
          {project.title.split(/(\s+)/).map((token, tokenIndex) =>
            /\s+/.test(token) ? (
              token
            ) : (
              <span
                className="project-card__title-word"
                key={`${token}-${tokenIndex}`}
              >
                {Array.from(token).map((character, characterIndex) => (
                  <span
                    data-title-character
                    key={`${character}-${characterIndex}`}
                  >
                    {character}
                  </span>
                ))}
              </span>
            ),
          )}
        </h3>
        <p ref={descriptionRef}>
          <span className="project-card__description-copy">
            {renderDescriptionText(project.description)}
          </span>
          <span className="project-card__description-overlap" aria-hidden="true">
            {renderDescriptionText(project.description)}
          </span>
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
