import sharp from 'sharp'

// Every screen is a square lattice spanned by (a, b) and (-b, a) in tile units.
// The lattice repeats every a² + b² units, so each screen has to divide TILE
// for the texture to tile without seams. `resolution` is image pixels per unit.
const TILE = 520

const textures = [
  {
    file: 'public/media/halftone-navy.webp',
    screens: [
      { name: 'charcoal', a: 4, b: 2, colour: [36, 52, 100], seed: 11, maxTone: 0.4, edges: [0.25, 1], jitter: 0.7, drift: 0.22, dropout: 0.25 },
      { name: 'graphite', a: 3, b: 2, colour: [50, 67, 120], seed: 23, maxTone: 0.26, edges: [0.4, 1], jitter: 0.8, drift: 0.28, dropout: 0.35 },
    ],
  },
  {
    file: 'public/media/halftone-ink.webp',
    screens: [
      { name: 'charcoal', a: 4, b: 2, colour: [38, 35, 32], seed: 61, maxTone: 0.4, edges: [0.25, 1], jitter: 0.7, drift: 0.22, dropout: 0.25 },
      { name: 'graphite', a: 3, b: 2, colour: [52, 48, 44], seed: 71, maxTone: 0.26, edges: [0.4, 1], jitter: 0.8, drift: 0.28, dropout: 0.35 },
      { name: 'speck', a: 5, b: 1, colour: [128, 122, 113], seed: 83, maxTone: 0.045, edges: [0.62, 1.1], jitter: 0.9, drift: 0.35, dropout: 0.72 },
    ],
  },
]

function gcd(x, y) {
  return y === 0 ? Math.abs(x) : gcd(y, x % y)
}

function random(seed) {
  let state = seed >>> 0

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 2 ** 32
  }
}

function createToneField(seed) {
  const next = random(seed)
  const waves = Array.from({ length: 9 }, () => {
    const fx = Math.floor(next() * 9) - 4
    const fy = Math.floor(next() * 9) - 4

    return {
      fx: fx === 0 && fy === 0 ? 1 : fx,
      fy,
      phase: next() * Math.PI * 2,
      amplitude: 0.4 + next() * 0.6,
    }
  })
  const total = waves.reduce((sum, wave) => sum + wave.amplitude, 0)

  return (x, y) => {
    let value = 0

    for (const wave of waves) {
      value +=
        wave.amplitude *
        Math.sin(
          (2 * Math.PI * (wave.fx * x + wave.fy * y)) / TILE + wave.phase,
        )
    }

    return 0.5 + (value / total) * 1.6
  }
}

// Keyed on the dot centre wrapped to the tile, so per-dot randomness tiles too.
function hash(x, y, seed) {
  const wrappedX = ((Math.round(x) % TILE) + TILE) % TILE
  const wrappedY = ((Math.round(y) % TILE) + TILE) % TILE
  let value = (wrappedX * 374761393 + wrappedY * 668265263 + seed * 2147483647) | 0

  value = Math.imul(value ^ (value >>> 13), 1274126177)
  return ((value ^ (value >>> 16)) >>> 0) / 2 ** 32
}

function smoothstep(edge0, edge1, value) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

async function renderTexture({ file, screens, resolution = 2, quality = 88 }) {
  const size = TILE * resolution
  const pixels = new Float32Array(size * size * 4)

  for (const screen of screens) {
    const {
      name,
      a,
      b,
      colour,
      maxTone,
      edges = [0.42, 1],
      jitter = 0,
      drift = 0,
      dropout = 0,
    } = screen
    const period = b === 0 ? a : (a * a + b * b) / gcd(a, b)

    if (TILE % period !== 0) {
      throw new Error(`${name} screen does not tile at ${TILE}px`)
    }

    const lengthSquared = a * a + b * b
    const pitch = Math.sqrt(lengthSquared)
    const tone = createToneField(screen.seed)

    for (let py = 0; py < size; py += 1) {
      for (let px = 0; px < size; px += 1) {
        const x = (px + 0.5) / resolution
        const y = (py + 0.5) / resolution
        const nearestI = Math.round((x * a + y * b) / lengthSquared)
        const nearestJ = Math.round((-x * b + y * a) / lengthSquared)
        const reach = jitter > 0 || drift > 0 ? 1 : 0
        let coverage = 0

        for (let i = nearestI - reach; i <= nearestI + reach; i += 1) {
          for (let j = nearestJ - reach; j <= nearestJ + reach; j += 1) {
            const cx = i * a - j * b
            const cy = i * b + j * a

            if (dropout > 0 && hash(cx, cy, screen.seed) < dropout) continue

            const level =
              smoothstep(edges[0], edges[1], tone(cx, cy)) * maxTone
            const sizeNoise =
              1 + (hash(cx, cy, screen.seed + 1) - 0.5) * 2 * jitter
            const radius = 0.5 * pitch * Math.sqrt(level) * 1.12 * sizeNoise
            const offsetX =
              (hash(cx, cy, screen.seed + 2) - 0.5) * 2 * drift * pitch
            const offsetY =
              (hash(cx, cy, screen.seed + 3) - 0.5) * 2 * drift * pitch
            const distance = Math.hypot(x - cx - offsetX, y - cy - offsetY)

            coverage = Math.max(
              coverage,
              Math.min(1, Math.max(0, (radius - distance) * resolution + 0.5)),
            )
          }
        }

        if (coverage <= 0) continue

        const index = (py * size + px) * 4
        const remaining = 1 - coverage

        pixels[index] = colour[0] * coverage + pixels[index] * remaining
        pixels[index + 1] = colour[1] * coverage + pixels[index + 1] * remaining
        pixels[index + 2] = colour[2] * coverage + pixels[index + 2] * remaining
        pixels[index + 3] = coverage + pixels[index + 3] * remaining
      }
    }
  }

  const output = Buffer.alloc(size * size * 4)

  for (let index = 0; index < pixels.length; index += 4) {
    const alpha = pixels[index + 3]

    output[index] = alpha > 0 ? Math.round(pixels[index] / alpha) : 0
    output[index + 1] = alpha > 0 ? Math.round(pixels[index + 1] / alpha) : 0
    output[index + 2] = alpha > 0 ? Math.round(pixels[index + 2] / alpha) : 0
    output[index + 3] = Math.round(alpha * 255)
  }

  const info = await sharp(output, {
    raw: { width: size, height: size, channels: 4 },
  })
    .webp({ quality, alphaQuality: 90, effort: 6 })
    .toFile(file)

  console.log(`${file} ${info.width}×${info.height}, ${info.size} bytes`)
}

for (const texture of textures) {
  await renderTexture(texture)
}
