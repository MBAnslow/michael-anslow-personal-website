export type ProjectSymbolBlob = {
  d: string
  family: BlobFamily
  prominence: 'dominant' | 'supporting'
  treatment: 'fill' | 'outline' | 'wash'
  opacity: number
  strokeWidth: number
}

export type ProjectSymbolGeometry = {
  key: string
  layout: string
  viewBox: string
  backdropD: string
  blobs: ProjectSymbolBlob[]
}

type Point = {
  x: number
  y: number
}

type RandomSource = () => number

export type BlobFamily =
  | 'crumpled'
  | 'folded'
  | 'lobed'
  | 'notched'
  | 'rippled'
  | 'swept'
  | 'twisted'

type BlobAnchor = {
  x: number
  y: number
  radiusX: number
  radiusY: number
}

type BlobLayout = {
  name: string
  anchors: BlobAnchor[]
}

const symbolVersion = 'project-symbol:v6'

const blobFamilies: BlobFamily[] = [
  'crumpled',
  'folded',
  'lobed',
  'notched',
  'rippled',
  'swept',
  'twisted',
]

const blobLayouts: BlobLayout[] = [
  {
    name: 'diagonal',
    anchors: [
      { x: 23, y: 25, radiusX: 17, radiusY: 15 },
      { x: 50, y: 50, radiusX: 24, radiusY: 21 },
      { x: 78, y: 76, radiusX: 16, radiusY: 17 },
    ],
  },
  {
    name: 'orbit',
    anchors: [
      { x: 50, y: 50, radiusX: 29, radiusY: 25 },
      { x: 21, y: 23, radiusX: 11, radiusY: 14 },
      { x: 79, y: 24, radiusX: 14, radiusY: 11 },
      { x: 77, y: 78, radiusX: 12, radiusY: 14 },
    ],
  },
  {
    name: 'horizontal',
    anchors: [
      { x: 20, y: 54, radiusX: 15, radiusY: 22 },
      { x: 49, y: 43, radiusX: 20, radiusY: 17 },
      { x: 79, y: 57, radiusX: 16, radiusY: 23 },
    ],
  },
  {
    name: 'constellation',
    anchors: [
      { x: 24, y: 28, radiusX: 16, radiusY: 17 },
      { x: 68, y: 22, radiusX: 20, radiusY: 14 },
      { x: 77, y: 61, radiusX: 15, radiusY: 20 },
      { x: 46, y: 76, radiusX: 21, radiusY: 15 },
      { x: 22, y: 69, radiusX: 10, radiusY: 12 },
    ],
  },
  {
    name: 'vertical',
    anchors: [
      { x: 44, y: 19, radiusX: 23, radiusY: 13 },
      { x: 57, y: 48, radiusX: 19, radiusY: 24 },
      { x: 40, y: 80, radiusX: 25, radiusY: 13 },
    ],
  },
  {
    name: 'asymmetric',
    anchors: [
      { x: 34, y: 52, radiusX: 30, radiusY: 33 },
      { x: 76, y: 28, radiusX: 14, radiusY: 12 },
      { x: 75, y: 72, radiusX: 17, radiusY: 15 },
    ],
  },
  {
    name: 'corners',
    anchors: [
      { x: 25, y: 27, radiusX: 18, radiusY: 18 },
      { x: 73, y: 25, radiusX: 20, radiusY: 14 },
      { x: 28, y: 75, radiusX: 14, radiusY: 18 },
      { x: 73, y: 72, radiusX: 19, radiusY: 20 },
    ],
  },
]

function normaliseTitle(title: string) {
  return title.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, ' ')
}

function hashString(value: string) {
  let hash = 0x811c9dc5

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }

  return hash >>> 0
}

function createRandom(seed: number): RandomSource {
  let state = seed

  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function round(value: number) {
  return Number(value.toFixed(2))
}

function smoothClosedPath(points: Point[], tension: number) {
  const commands = [`M ${round(points[0].x)} ${round(points[0].y)}`]

  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length]
    const current = points[index]
    const next = points[(index + 1) % points.length]
    const following = points[(index + 2) % points.length]
    const firstControl = {
      x: current.x + ((next.x - previous.x) / 6) * tension,
      y: current.y + ((next.y - previous.y) / 6) * tension,
    }
    const secondControl = {
      x: next.x - ((following.x - current.x) / 6) * tension,
      y: next.y - ((following.y - current.y) / 6) * tension,
    }

    commands.push(
      `C ${round(firstControl.x)} ${round(firstControl.y)} ${round(secondControl.x)} ${round(secondControl.y)} ${round(next.x)} ${round(next.y)}`,
    )
  }

  commands.push('Z')
  return commands.join(' ')
}

function createBlobPath(
  random: RandomSource,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  family: BlobFamily,
) {
  const pointCounts: Record<BlobFamily, number> = {
    crumpled: 13,
    folded: 12,
    lobed: 15,
    notched: 14,
    rippled: 16,
    swept: 13,
    twisted: 15,
  }
  const pointCount = pointCounts[family]
  const rawNoise = Array.from(
    { length: pointCount },
    () => random(),
  )
  const noise = rawNoise.map((current, index) => {
    const previous = rawNoise[(index - 1 + pointCount) % pointCount]
    const next = rawNoise[(index + 1) % pointCount]
    return previous * 0.2 + current * 0.6 + next * 0.2
  })
  const phase = random() * Math.PI * 2
  const harmonicPhase = random() * Math.PI * 2
  const secondaryPhase = random() * Math.PI * 2
  const notchAngle = random() * Math.PI * 2
  const points = noise.map((pointNoise, index) => {
    const angle = phase + (Math.PI * 2 * index) / pointCount
    const cosine = Math.cos(angle)
    const sine = Math.sin(angle)
    let xFactor = cosine
    let yFactor = sine
    let radialFactor = 1

    if (family === 'crumpled') {
      radialFactor =
        0.77 +
        Math.sin(angle * 2 + harmonicPhase) * 0.13 +
        Math.cos(angle * 5 + secondaryPhase) * 0.1 +
        (pointNoise - 0.5) * 0.24
    } else if (family === 'folded') {
      radialFactor =
        0.79 +
        Math.sin(angle * 2 + harmonicPhase) * 0.17 +
        Math.sin(angle * 5 + secondaryPhase) * 0.09 +
        (pointNoise - 0.5) * 0.13
    } else if (family === 'lobed') {
      radialFactor =
        0.8 +
        Math.sin(angle * 3 + harmonicPhase) * 0.14 +
        Math.cos(angle * 7 + secondaryPhase) * 0.07 +
        (pointNoise - 0.5) * 0.14
    } else if (family === 'notched') {
      const notch =
        Math.max(0, Math.cos(angle - notchAngle)) ** 8 * 0.3
      radialFactor =
        0.91 -
        notch +
        Math.sin(angle * 4 + harmonicPhase) * 0.08 +
        (pointNoise - 0.5) * 0.13
    } else if (family === 'rippled') {
      radialFactor =
        0.82 +
        Math.sin(angle * 4 + harmonicPhase) * 0.1 +
        Math.cos(angle * 7 + secondaryPhase) * 0.08 +
        (pointNoise - 0.5) * 0.12
    } else if (family === 'swept') {
      xFactor += Math.sin(angle * 2 + harmonicPhase) * 0.13
      yFactor += Math.cos(angle * 3 + secondaryPhase) * 0.1
      radialFactor =
        0.83 +
        Math.sin(angle * 3 + harmonicPhase) * 0.12 +
        (pointNoise - 0.5) * 0.16
    } else if (family === 'twisted') {
      xFactor += Math.sin(angle * 3 + harmonicPhase) * 0.11
      yFactor += Math.sin(angle * 2 + secondaryPhase) * 0.13
      radialFactor =
        0.8 +
        Math.cos(angle * 5 + harmonicPhase) * 0.11 +
        (pointNoise - 0.5) * 0.16
    }

    return {
      x: centerX + xFactor * radiusX * radialFactor,
      y: centerY + yFactor * radiusY * radialFactor,
    }
  })

  return smoothClosedPath(points, 0.9)
}

function createBackdropPath(random: RandomSource) {
  const shapes = [
    { points: 3, innerRadius: 1 },
    { points: 4, innerRadius: 1 },
    { points: 5, innerRadius: 0.46 },
    { points: 6, innerRadius: 1 },
    { points: 8, innerRadius: 0.62 },
  ]
  const shape = shapes[Math.floor(random() * shapes.length)]
  const isStar = shape.innerRadius < 1
  const pointCount = isStar ? shape.points * 2 : shape.points
  const phase = random() * Math.PI * 2
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = phase + (Math.PI * 2 * index) / pointCount
    const radius = isStar && index % 2 === 1 ? shape.innerRadius : 1

    return {
      x: 58 + Math.cos(angle) * 21 * radius,
      y: 41 + Math.sin(angle) * 21 * radius,
    }
  })

  return [
    `M ${round(points[0].x)} ${round(points[0].y)}`,
    ...points.slice(1).map((point) => `L ${round(point.x)} ${round(point.y)}`),
    'Z',
  ].join(' ')
}

function createTightViewBox(paths: string[]) {
  const values = paths.flatMap((path) =>
    Array.from(path.matchAll(/-?\d+(?:\.\d+)?/g), ([value]) => Number(value)),
  )
  const points = Array.from({ length: Math.floor(values.length / 2) }, (_, index) => ({
    x: values[index * 2],
    y: values[index * 2 + 1],
  }))
  const padding = 2.5
  const minX = Math.min(...points.map(({ x }) => x)) - padding
  const minY = Math.min(...points.map(({ y }) => y)) - padding
  const maxX = Math.max(...points.map(({ x }) => x)) + padding
  const maxY = Math.max(...points.map(({ y }) => y)) + padding

  return [
    round(minX),
    round(minY),
    round(maxX - minX),
    round(maxY - minY),
  ].join(' ')
}

function transformAnchor(
  anchor: BlobAnchor,
  quarterTurns: number,
  mirrorHorizontally: boolean,
) {
  let x = mirrorHorizontally ? 100 - anchor.x : anchor.x
  let y = anchor.y

  for (let turn = 0; turn < quarterTurns; turn += 1) {
    const nextX = 100 - y
    y = x
    x = nextX
  }

  return {
    x,
    y,
    radiusX: quarterTurns % 2 === 0 ? anchor.radiusX : anchor.radiusY,
    radiusY: quarterTurns % 2 === 0 ? anchor.radiusY : anchor.radiusX,
  }
}

export function createProjectSymbol(title: string): ProjectSymbolGeometry {
  const normalisedTitle = normaliseTitle(title)
  const seed = hashString(`${symbolVersion}:${normalisedTitle}`)
  const random = createRandom(seed)
  const layout = blobLayouts[seed % blobLayouts.length]
  const quarterTurns = Math.floor(random() * 4)
  const mirrorHorizontally = random() > 0.5
  const treatments: ProjectSymbolBlob['treatment'][] = ['wash', 'fill']
  const anchorOffset = Math.floor(random() * layout.anchors.length)
  const anchor = transformAnchor(
    layout.anchors[anchorOffset],
    quarterTurns,
    mirrorHorizontally,
  )
  const family =
    blobFamilies[
      (seed + Math.floor(random() * blobFamilies.length)) %
        blobFamilies.length
    ]
  const treatment = treatments[Math.floor(random() * treatments.length)]
  const aspectRatio = Math.max(
    0.84,
    Math.min(1.18, anchor.radiusX / anchor.radiusY),
  )
  const targetRadius = 41 + random() * 3
  const radiusX =
    aspectRatio >= 1 ? targetRadius : targetRadius * aspectRatio
  const radiusY =
    aspectRatio >= 1 ? targetRadius / aspectRatio : targetRadius
  const backdropD = createBackdropPath(random)
  const blobs: ProjectSymbolBlob[] = [
    {
      d: createBlobPath(
        random,
        49 + random() * 4,
        48 + random() * 5,
        radiusX,
        radiusY,
        family,
      ),
      family,
      prominence: 'dominant',
      treatment,
      opacity:
        treatment === 'fill'
          ? round(0.22 + random() * 0.1)
          : round(0.34 + random() * 0.18),
      strokeWidth: round(7.5 + random() * 4.5),
    },
  ]
  const viewBox = createTightViewBox([
    backdropD,
    ...blobs.map(({ d }) => d),
  ])

  return {
    key: seed.toString(16).padStart(8, '0'),
    layout: `${layout.name}-${anchorOffset}-${quarterTurns}-${mirrorHorizontally ? 'mirrored' : 'plain'}`,
    viewBox,
    backdropD,
    blobs,
  }
}
