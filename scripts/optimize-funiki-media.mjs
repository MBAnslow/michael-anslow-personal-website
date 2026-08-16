import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(root, 'public/media/funiki')
const sourceRoot =
  'https://raw.githubusercontent.com/MBAnslow/funiki-website/main/quartz/static'

const images = [
  ['funiki-header.png', 'funiki-header.webp'],
  ['the-lighthouse/lighthouse-header.png', 'lighthouse-header.webp'],
  [
    'the-lighthouse/overview-gallery/G-Intro-Full-Light.JPG',
    'lighthouse-intro.webp',
  ],
  [
    'the-lighthouse/overview-gallery/Candle-D-A-C.JPG',
    'lighthouse-candle.webp',
  ],
  [
    'the-lighthouse/overview-gallery/Almost-Silhouette-Bluelight.JPG',
    'lighthouse-blue.webp',
  ],
  [
    'the-lighthouse/overview-gallery/G-Puzzle.JPG',
    'lighthouse-puzzle.webp',
  ],
  ['the-passenger/passenger-atmosphere.jpeg', 'passenger-atmosphere.webp'],
  ['the-passenger/passenger-floating.jpeg', 'passenger-floating.webp'],
]

await mkdir(outputDirectory, { recursive: true })

for (const [source, filename] of images) {
  const response = await fetch(`${sourceRoot}/${source}`)
  if (!response.ok) {
    throw new Error(`Could not download ${source}: ${response.status}`)
  }

  const input = Buffer.from(await response.arrayBuffer())
  const output = await sharp(input)
    .rotate()
    .resize({ width: 1800, height: 1350, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toBuffer()

  await writeFile(resolve(outputDirectory, filename), output)
  console.log(`Optimized ${filename}`)
}

const socialCard = await readFile(resolve(root, 'public/social-card.svg'))
await sharp(socialCard)
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, 'public/social-card.png'))
console.log('Rendered social-card.png')
