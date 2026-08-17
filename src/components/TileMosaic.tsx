const motifs = [0, 1, 2, 3]

type MotifProps = {
  variant: number
  x: number
  y: number
  rotation: number
}

function Motif({ variant, x, y, rotation }: MotifProps) {
  const transform = `translate(${x} ${y}) rotate(${rotation} 100 100)`

  if (variant === 0) {
    return (
      <g transform={transform}>
        <rect className="tile__paper" width="200" height="200" />
        <circle className="tile__line" cx="100" cy="100" r="60" />
        {[0, 45, 90, 135].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path className="tile__fill" d="M100 31c13 18 18 34 0 54-18-20-13-36 0-54Z" />
            <circle className="tile__dot" cx="100" cy="19" r="5" />
          </g>
        ))}
        <circle className="tile__paper tile__line" cx="100" cy="100" r="18" />
      </g>
    )
  }

  if (variant === 1) {
    return (
      <g transform={transform}>
        <rect className="tile__paper" width="200" height="200" />
        {[0, 90, 180, 270].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path className="tile__line" d="M100 100C55 100 35 67 16 18c50 19 82 39 84 82Z" />
            <path className="tile__fill" d="M82 82c-20-6-31-21-43-42 21 11 37 23 43 42Z" />
          </g>
        ))}
        <circle className="tile__accent" cx="100" cy="100" r="11" />
      </g>
    )
  }

  if (variant === 2) {
    return (
      <g transform={transform}>
        <rect className="tile__paper" width="200" height="200" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path className="tile__fill" d="M100 89c-13-18-10-34 0-51 10 17 13 33 0 51Z" />
            <path className="tile__line" d="M100 38V13" />
          </g>
        ))}
        <circle className="tile__accent" cx="100" cy="100" r="12" />
        <circle className="tile__line" cx="100" cy="100" r="76" />
      </g>
    )
  }

  return (
    <g transform={transform}>
      <rect className="tile__paper" width="200" height="200" />
      <path className="tile__line" d="M0 100h200M100 0v200" />
      {[0, 90, 180, 270].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path className="tile__fill" d="M100 93C75 72 65 49 64 14c28 20 40 46 36 79Z" />
          <circle className="tile__accent" cx="52" cy="30" r="8" />
        </g>
      ))}
      <circle className="tile__paper tile__line" cx="100" cy="100" r="20" />
    </g>
  )
}

export function TileMosaic() {
  return (
    <figure className="tile-panel">
      <div className="tile-panel__frame">
        <svg
          className="tile-panel__art"
          viewBox="0 0 400 400"
          role="img"
          aria-labelledby="tile-title tile-description"
        >
          <title id="tile-title">Generative blue and ochre tile pattern</title>
          <desc id="tile-description">
            Four original geometric floral motifs represent inspiration,
            conceptualisation, systematisation and implementation.
          </desc>
          <Motif variant={motifs[0]} x={0} y={0} rotation={0} />
          <Motif variant={motifs[1]} x={200} y={0} rotation={90} />
          <Motif variant={motifs[2]} x={0} y={200} rotation={270} />
          <Motif variant={motifs[3]} x={200} y={200} rotation={180} />
          <path className="tile__grout" d="M200 0v400M0 200h400" />
          <rect className="tile__border" x="2" y="2" width="396" height="396" />
        </svg>
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
