import { createProjectSymbol } from '../utils/projectSymbol'

type ProjectSymbolProps = {
  title: string
}

export function ProjectSymbol({ title }: ProjectSymbolProps) {
  const geometry = createProjectSymbol(title)
  const gradientAngle = Number.parseInt(geometry.key.slice(0, 4), 16) % 360
  const textureIndex = Number.parseInt(geometry.key.slice(-2), 16) % 9
  const textureId = `project-symbol-texture-${geometry.key}`
  const textureOpacity = 0.58

  return (
    <svg
      className="project-symbol"
      viewBox={geometry.viewBox}
      aria-hidden="true"
      focusable="false"
      data-symbol-key={geometry.key}
      data-symbol-layout={geometry.layout}
      data-symbol-texture={textureIndex}
    >
      <defs>
        <pattern
          id={textureId}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          {textureIndex === 0 && (
            <path
              d="M -2 10 L 10 -2 M 3 15 L 15 3"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="2"
            />
          )}
          {textureIndex === 1 && (
            <>
              <circle
                cx="2.5"
                cy="2.5"
                r="1.6"
                fill="currentColor"
                fillOpacity={textureOpacity}
              />
              <circle
                cx="7.5"
                cy="7.5"
                r="1.6"
                fill="currentColor"
                fillOpacity={textureOpacity}
              />
            </>
          )}
          {textureIndex === 2 && (
            <path
              d="M -2 10 L 10 -2 M 3 15 L 15 3 M -2 0 L 10 12 M 3 -5 L 15 7"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="1.8"
            />
          )}
          {textureIndex === 3 && (
            <>
              <rect
                width="5"
                height="5"
                fill="currentColor"
                fillOpacity={textureOpacity}
              />
              <rect
                x="5"
                y="5"
                width="5"
                height="5"
                fill="currentColor"
                fillOpacity={textureOpacity}
              />
            </>
          )}
          {textureIndex === 4 && (
            <path
              d="M 0 2.5 H 10 M 0 7.5 H 10"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="2"
            />
          )}
          {textureIndex === 5 && (
            <path
              d="M 2 0 V 4 M 7 5 V 10"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeOpacity={textureOpacity}
              strokeWidth="2.5"
            />
          )}
          {textureIndex === 6 && (
            <path
              d="M -2 3 Q 0 0 2 3 T 6 3 T 10 3 T 14 3 M -2 8 Q 0 5 2 8 T 6 8 T 10 8 T 14 8"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="1.8"
            />
          )}
          {textureIndex === 7 && (
            <path
              d="M 2 0 V 4 M 0 2 H 4 M 8 6 V 10 M 6 8 H 10"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="2"
            />
          )}
          {textureIndex === 8 && (
            <path
              d="M 5 0 L 10 5 L 5 10 L 0 5 Z"
              fill="none"
              stroke="currentColor"
              strokeOpacity={textureOpacity}
              strokeWidth="1.8"
            />
          )}
        </pattern>
        {geometry.blobs.map((blob, index) => (
          <linearGradient
            id={`project-symbol-gradient-${geometry.key}-${index}`}
            gradientTransform={`rotate(${gradientAngle} 0.5 0.5)`}
            key={`gradient-${geometry.key}-${index}`}
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity={Math.min(0.32, blob.opacity + 0.06)}
            />
            <stop
              offset="52%"
              stopColor="currentColor"
              stopOpacity={Math.min(0.18, blob.opacity)}
            />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>
        ))}
      </defs>
      <path
        className="project-symbol__backdrop"
        d={geometry.backdropD}
        fill={`url(#${textureId})`}
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="10"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
      {geometry.blobs.map((blob, index) => {
        const isOutline = blob.treatment === 'outline'

        return (
          <path
            className={`project-symbol__blob project-symbol__blob--${blob.treatment} project-symbol__blob--${blob.family} project-symbol__blob--${blob.prominence}`}
            d={blob.d}
            fill={
              isOutline
                ? 'none'
                : `url(#project-symbol-gradient-${geometry.key}-${index})`
            }
            stroke="currentColor"
            strokeOpacity={Math.min(0.25, blob.opacity)}
            strokeWidth={blob.strokeWidth}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            key={`${geometry.key}-${index}`}
          />
        )
      })}
    </svg>
  )
}
