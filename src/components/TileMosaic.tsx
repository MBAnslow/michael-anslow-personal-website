export function TileMosaic() {
  return (
    <figure className="tile-panel">
      <div className="tile-panel__frame">
        <svg
          className="tile-panel__art"
          viewBox="0 0 400 340"
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
              <stop offset="86%" stopColor="var(--ochre)" />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--ochre), var(--aqua))"
              />
            </linearGradient>
            <linearGradient
              id="tile-journey-conceptualisation"
              x1="0"
              y1="55"
              x2="0"
              y2="170"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="color-mix(in srgb, var(--ochre), var(--aqua))"
              />
              <stop offset="12%" stopColor="var(--aqua)" />
              <stop offset="86%" stopColor="var(--aqua)" />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--aqua), var(--terracotta))"
              />
            </linearGradient>
            <linearGradient
              id="tile-journey-systematisation"
              x1="0"
              y1="170"
              x2="0"
              y2="275"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="color-mix(in srgb, var(--aqua), var(--terracotta))"
              />
              <stop offset="12%" stopColor="var(--terracotta)" />
              <stop offset="86%" stopColor="var(--terracotta)" />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--terracotta), var(--blue))"
              />
            </linearGradient>
            <linearGradient
              id="tile-journey-implementation"
              x1="200"
              y1="0"
              x2="350"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="color-mix(in srgb, var(--terracotta), var(--blue))"
              />
              <stop offset="12%" stopColor="var(--blue)" />
              <stop offset="78%" stopColor="var(--blue)" />
              <stop offset="100%" stopColor="var(--ink)" />
            </linearGradient>
          </defs>
          <path className="tile__grout" d="M200 0v340M0 170h400" />
          <path
            className="tile__journey-segment tile__journey-segment--inspiration"
            d="M50 55L200 55"
          />
          <path
            className="tile__journey-segment tile__journey-segment--conceptualisation"
            d="M200 55C295 56 348 55 350 105C352 152 318 169 200 170"
          />
          <path
            className="tile__journey-segment tile__journey-segment--systematisation"
            d="M200 170C110 171 52 165 50 215C48 260 105 272 200 275"
          />
          <path
            className="tile__journey-segment tile__journey-segment--implementation"
            d="M200 275C255 278 307 276 350 275"
          />
          <path
            className="tile__journey-base"
            d="M50 55L200 55C295 56 348 55 350 105C352 152 318 169 200 170C110 171 52 165 50 215C48 260 105 272 200 275C255 278 307 276 350 275"
          />
          <circle className="tile__journey-start" cx="50" cy="55" r="14" />
          <circle className="tile__journey-end" cx="350" cy="275" r="18" />
          <rect className="tile__border" x="2" y="2" width="396" height="336" />
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
