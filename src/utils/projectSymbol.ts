export type ProjectSymbolBlob = {
  d: string
  outlineD: string
  family: BlobFamily
  prominence: 'dominant' | 'supporting'
  treatment: 'fill' | 'outline' | 'wash'
  opacity: number
  strokeWidth: number
  washOffsetX: number
  washOffsetY: number
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

const symbolVersion = 'project-symbol:v10'

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

function densifyClosedPath(points: Point[], steps: number) {
  const dense: Point[] = []

  for (let index = 0; index < points.length; index += 1) {
    const current = points[index]
    const next = points[(index + 1) % points.length]

    for (let step = 0; step < steps; step += 1) {
      const amount = step / steps
      dense.push({
        x: current.x + (next.x - current.x) * amount,
        y: current.y + (next.y - current.y) * amount,
      })
    }
  }

  return dense
}

function createVariableWidthOutline(
  points: Point[],
  random: RandomSource,
  weight: number,
) {
  const dense = densifyClosedPath(points, 4)
  const count = dense.length
  const slowWaves = 1 + Math.floor(random() * 3)
  const fastWaves = 5 + Math.floor(random() * 6)
  const phase = random() * Math.PI * 2
  const minWidth = 0.42 + weight * 0.28
  const maxWidth = 0.72 + weight * 0.42
  const outer: Point[] = []
  const inner: Point[] = []

  for (let index = 0; index < count; index += 1) {
    const previous = dense[(index - 1 + count) % count]
    const next = dense[(index + 1) % count]
    const tangentX = next.x - previous.x
    const tangentY = next.y - previous.y
    const length = Math.hypot(tangentX, tangentY) || 1
    const normalX = tangentY / length
    const normalY = -tangentX / length
    const amount = index / count
    const pressure =
      0.5 +
      0.18 * Math.sin(amount * Math.PI * 2 * slowWaves + phase) +
      0.08 * Math.sin(amount * Math.PI * 2 * fastWaves + phase * 1.6)
    const width = minWidth + (maxWidth - minWidth) * Math.max(0, Math.min(1, pressure))
    const half = width / 2
    const point = dense[index]

    outer.push({
      x: point.x + normalX * half,
      y: point.y + normalY * half,
    })
    inner.push({
      x: point.x - normalX * half,
      y: point.y - normalY * half,
    })
  }

  const tension = 0.82
  return `${smoothClosedPath(outer, tension)} ${smoothClosedPath(inner.slice().reverse(), tension)}`
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
  const waveCount = 2 + Math.floor(random() * 5)
  const waveStrength = 0.055 + random() * 0.085
  const horizontalWarp = (random() - 0.5) * 0.22
  const verticalWarp = (random() - 0.5) * 0.22
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

    radialFactor +=
      Math.sin(angle * waveCount + secondaryPhase) * waveStrength
    xFactor +=
      Math.sin(angle * 2 + harmonicPhase) * horizontalWarp
    yFactor +=
      Math.cos(angle * 3 + secondaryPhase) * verticalWarp

    return {
      x: centerX + xFactor * radiusX * radialFactor,
      y: centerY + yFactor * radiusY * radialFactor,
    }
  })

  return {
    d: smoothClosedPath(points, 0.7 + random() * 0.22),
    points,
  }
}

function createBackdropPath(
  random: RandomSource,
  centerX: number,
  centerY: number,
  outerRadius: number,
  shapeIndex: number,
) {
  const shapes = [
    { name: 'circle', points: 32, innerRadius: 1, visualScale: 0.92 },
    { name: 'triangle', points: 3, innerRadius: 1, visualScale: 1.04 },
    { name: 'square', points: 4, innerRadius: 1, visualScale: 1 },
    { name: 'star', points: 5, innerRadius: 0.46, visualScale: 1.18 },
    { name: 'hexagon', points: 6, innerRadius: 1, visualScale: 0.96 },
    { name: 'burst', points: 8, innerRadius: 0.62, visualScale: 1.12 },
  ]
  const shape = shapes[shapeIndex % shapes.length]
  const isStar = shape.innerRadius < 1
  const pointCount = isStar ? shape.points * 2 : shape.points
  const phase = random() * Math.PI * 2
  const radiusX =
    outerRadius * shape.visualScale * (0.9 + random() * 0.2)
  const radiusY =
    outerRadius * shape.visualScale * (0.86 + random() * 0.24)
  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = phase + (Math.PI * 2 * index) / pointCount
    const radius = isStar && index % 2 === 1 ? shape.innerRadius : 1

    return {
      x: centerX + Math.cos(angle) * radiusX * radius,
      y: centerY + Math.sin(angle) * radiusY * radius,
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
    0.68,
    Math.min(
      1.42,
      (anchor.radiusX / anchor.radiusY) * (0.78 + random() * 0.46),
    ),
  )
  const targetRadius = 35 + random() * 10
  const radiusX =
    aspectRatio >= 1 ? targetRadius : targetRadius * aspectRatio
  const radiusY =
    aspectRatio >= 1 ? targetRadius / aspectRatio : targetRadius
  const centerX = 30 + anchor.x * 0.4 + (random() - 0.5) * 7
  const centerY = 30 + anchor.y * 0.4 + (random() - 0.5) * 7
  const motifAngle = random() * Math.PI * 2
  const motifDistance = 5 + random() * 9
  const backdropD = createBackdropPath(
    random,
    centerX + Math.cos(motifAngle) * motifDistance,
    centerY + Math.sin(motifAngle) * motifDistance,
    targetRadius * (0.4 + random() * 0.08),
    seed % 6,
  )
  const blobPath = createBlobPath(
    random,
    centerX,
    centerY,
    radiusX,
    radiusY,
    family,
  )
  const strokeWidth = round(1 + random())
  const blobs: ProjectSymbolBlob[] = [
    {
      d: blobPath.d,
      outlineD: createVariableWidthOutline(
        blobPath.points,
        random,
        strokeWidth,
      ),
      family,
      prominence: 'dominant',
      treatment,
      opacity:
        treatment === 'fill'
          ? round(0.22 + random() * 0.1)
          : round(0.34 + random() * 0.18),
      strokeWidth,
      washOffsetX: round((random() - 0.5) * 9),
      washOffsetY: round((random() - 0.5) * 9),
    },
  ]
  const viewBox = createTightViewBox([
    backdropD,
    ...blobs.map(({ d, outlineD }) => `${d} ${outlineD}`),
  ])

  return {
    key: seed.toString(16).padStart(8, '0'),
    layout: `${layout.name}-${anchorOffset}-${quarterTurns}-${mirrorHorizontally ? 'mirrored' : 'plain'}`,
    viewBox,
    backdropD,
    blobs,
  }
}
