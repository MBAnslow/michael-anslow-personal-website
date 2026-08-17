import type { CSSProperties, PointerEvent } from 'react'

type TilePanelProperties = CSSProperties & {
  '--tile-pointer-x': string
  '--tile-pointer-y': string
  '--tile-tilt-x': string
  '--tile-tilt-y': string
}

const neutralTile: TilePanelProperties = {
  '--tile-pointer-x': '50%',
  '--tile-pointer-y': '50%',
  '--tile-tilt-x': '0deg',
  '--tile-tilt-y': '0deg',
}

export function TileMosaic() {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    event.currentTarget.style.setProperty('--tile-pointer-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--tile-pointer-y', `${y * 100}%`)
    event.currentTarget.style.setProperty(
      '--tile-tilt-x',
      `${(y - 0.5) * -3}deg`,
    )
    event.currentTarget.style.setProperty(
      '--tile-tilt-y',
      `${(x - 0.5) * 3}deg`,
    )
  }

  const resetTile = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tile-pointer-x', '50%')
    event.currentTarget.style.setProperty('--tile-pointer-y', '50%')
    event.currentTarget.style.setProperty('--tile-tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tile-tilt-y', '0deg')
  }

  return (
    <figure
      className="tile-panel"
      style={neutralTile}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTile}
    >
      <div className="tile-panel__frame">
        <svg
          className="tile-panel__art"
          viewBox="0 0 400 400"
          role="img"
          aria-labelledby="tile-title tile-description"
        >
          <title id="tile-title">Four-stage creative process</title>
          <desc id="tile-description">
            A curving line travels through inspiration, conceptualisation,
            systematisation and implementation. It begins with a solid circle
            and ends with an open circle.
          </desc>
          <defs>
            <linearGradient
              id="tile-journey-inspiration"
              x1="50"
              y1="0"
              x2="200"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--ochre)" />
              <stop offset="78%" stopColor="var(--ochre)" />
              <stop offset="100%" stopColor="var(--aqua)" />
            </linearGradient>
            <linearGradient
              id="tile-journey-conceptualisation"
              x1="0"
              y1="75"
              x2="0"
              y2="195"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--aqua)" />
              <stop offset="78%" stopColor="var(--aqua)" />
              <stop offset="100%" stopColor="var(--terracotta)" />
            </linearGradient>
            <linearGradient
              id="tile-journey-systematisation"
              x1="0"
              y1="195"
              x2="0"
              y2="315"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--terracotta)" />
              <stop offset="78%" stopColor="var(--terracotta)" />
              <stop offset="100%" stopColor="var(--blue)" />
            </linearGradient>
            <linearGradient
              id="tile-journey-implementation"
              x1="200"
              y1="0"
              x2="350"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--blue)" />
              <stop offset="78%" stopColor="var(--blue)" />
              <stop offset="100%" stopColor="var(--ink)" />
            </linearGradient>
          </defs>
          <path className="tile__grout" d="M200 0v400M0 200h400" />
          <path
            className="tile__journey-segment tile__journey-segment--inspiration"
            d="M50 75L200 75"
          />
          <path
            className="tile__journey-segment tile__journey-segment--conceptualisation"
            d="M200 75C295 76 348 75 350 132C352 180 318 194 200 195"
          />
          <path
            className="tile__journey-segment tile__journey-segment--systematisation"
            d="M200 195C110 196 52 190 50 250C48 300 105 312 200 315"
          />
          <path
            className="tile__journey-segment tile__journey-segment--implementation"
            d="M200 315C255 318 307 316 350 315"
          />
          <path
            className="tile__journey-base"
            d="M50 75L200 75C295 76 348 75 350 132C352 180 318 194 200 195C110 196 52 190 50 250C48 300 105 312 200 315C255 318 307 316 350 315"
          />
          <circle className="tile__journey-start" cx="50" cy="75" r="14" />
          <circle className="tile__journey-end" cx="350" cy="315" r="18" />
          <circle className="tile__journey-traveller" r="7">
            <animate
              attributeName="r"
              values="6;8;6"
              dur="1.2s"
              repeatCount="indefinite"
            />
            <animateMotion
              path="M50 75L200 75C295 76 348 75 350 132C352 180 318 194 200 195C110 196 52 190 50 250C48 300 105 312 200 315C255 318 307 316 350 315"
              dur="16s"
              repeatCount="indefinite"
              calcMode="linear"
              keyPoints="0;0.16;0.51;0.84;1"
              keyTimes="0;0.25;0.5;0.75;1"
            />
          </circle>
          <rect className="tile__border" x="2" y="2" width="396" height="396" />
        </svg>
        <div className="tile-panel__frost" aria-hidden="true" />
        <div className="tile-panel__quadrants">
          <p>
            <span>From vague intuitions…</span>
          </p>
          <p>
            <span>Disentangled and solidified</span>
          </p>
          <p>
            <span>
              Identified principles and technical framing embedded in
              literature
            </span>
          </p>
          <p>
            <span>Implemented in software systems</span>
          </p>
        </div>
        <span className="tile-panel__corner tile-panel__corner--top-left">
          Inspiration
        </span>
        <span className="tile-panel__corner tile-panel__corner--top-right">
          Conceptualisation
        </span>
        <span className="tile-panel__corner tile-panel__corner--bottom-left">
          Systematisation
        </span>
        <span className="tile-panel__corner tile-panel__corner--bottom-right">
          Implementation
        </span>
      </div>
    </figure>
  )
}
