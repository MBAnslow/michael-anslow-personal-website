import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import { XMLParser } from 'fast-xml-parser'
import sharp from 'sharp'
import TurndownService from 'turndown'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDirectory = resolve(root, 'src/content/blog')
const imageDirectory = resolve(root, 'public/media/blog')
const feedURL = 'https://medium.com/feed/@michael.anslow'

const posts = {
  '6aee56908ef7': {
    slug: 'materialising-myths',
    subtitle: 'Exploring Future Societal Roles of AI',
    description:
      'What ancient stories of artificial beings can tell us about the roles we may allow AI systems to inhabit.',
    featured: true,
  },
  '60af8c287808': {
    slug: 'light-and-dark-of-awe-part-two',
    subtitle: 'Part II — Aw-ful',
    description:
      'Disconnection, suffering and the shadow side of self-transcendence.',
    series: 'The Light and Dark of Awe',
    seriesPart: 2,
  },
  '5f4f02021fe2': {
    slug: 'the-light-and-dark-of-awe',
    subtitle: 'Part I — Awe-some',
    description:
      'From the overview effect to meditation and ordinary belonging—an exploration of awe and the self-world relationship.',
    series: 'The Light and Dark of Awe',
    seriesPart: 1,
  },
  '2783809f43d8': {
    slug: 'writing-assistance-part-two',
    subtitle: 'Part II — The Signal in the Machine',
    description:
      'The Intention Rendering Engine and a possible signal-processing paradigm for writing with AI.',
    series: 'A Vision of Writing Assistance Before ChatGPT',
    seriesPart: 2,
  },
  '56c259c01f3f': {
    slug: 'poiesis-studio',
    subtitle: 'Part I — Poiesis Studio',
    description:
      'A look back at an experimental writing instrument built with masked language modelling in 2019.',
    series: 'A Vision of Writing Assistance Before ChatGPT',
    seriesPart: 1,
  },
}

const normalizeSpace = (value) =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\u200a/g, ' ')
    .replace(/\u200b/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const yamlString = (value) => JSON.stringify(normalizeSpace(value))
const comparableHeading = (value) =>
  normalizeSpace(value)
    .toLowerCase()
    .replace(/\s/g, '')
    .replace(/[—–-]/g, '-')

await mkdir(contentDirectory, { recursive: true })
await mkdir(imageDirectory, { recursive: true })

const response = await fetch(feedURL, {
  headers: {
    accept: 'application/rss+xml',
    'user-agent': 'Feedly/1.0',
  },
})

if (!response.ok) {
  throw new Error(`Could not download Medium feed: ${response.status}`)
}

const xml = await response.text()
const parser = new XMLParser({
  ignoreAttributes: false,
  processEntities: false,
})
const feed = parser.parse(xml)
const items = Array.isArray(feed.rss.channel.item)
  ? feed.rss.channel.item
  : [feed.rss.channel.item]

const turndown = new TurndownService({
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
  headingStyle: 'atx',
})

turndown.addRule('articleFigure', {
  filter: (node) => node.nodeName === 'FIGURE',
  replacement: (_content, node) => {
    const image = node.querySelector('img')
    const caption = node.querySelector('figcaption')
    if (!image) return ''

    const source = image.getAttribute('src')
    const alt = image.getAttribute('alt') ?? ''
    const captionHTML = caption?.innerHTML ?? ''

    return `\n\n<figure class="article-figure">\n  <img src="${source}" alt="${alt.replaceAll('"', '&quot;')}" loading="lazy" />\n  ${captionHTML ? `<figcaption>${captionHTML}</figcaption>` : ''}\n</figure>\n\n`
  },
})

for (const item of items) {
  const guid =
    typeof item.guid === 'object' ? item.guid['#text'] : String(item.guid)
  const postId = String(guid).match(/[a-f0-9]{12}$/)?.[0]
  const definition = postId ? posts[postId] : undefined
  if (!definition) continue

  const title = normalizeSpace(String(item.title))
  const $ = load(String(item['content:encoded']), null, false)

  $('img').each((_, image) => {
    const source = $(image).attr('src') ?? ''
    if (source.includes('medium.com/_/stat')) {
      $(image).remove()
    }
  })

  $('a').each((_, link) => {
    const href = $(link).attr('href') ?? ''
    const targetId = href.match(/[a-f0-9]{12}/)?.[0]
    const target = targetId ? posts[targetId] : undefined
    if (target) $(link).attr('href', `../${target.slug}/`)
  })

  const firstHeading = $('h1, h2, h3, h4').first()
  if (
    firstHeading.length &&
    comparableHeading(firstHeading.text()) ===
      comparableHeading(definition.subtitle)
  ) {
    firstHeading.remove()
  }

  const figures = $('figure').toArray()
  let imageIndex = 0
  let firstImage

  for (const figure of figures) {
    const image = $(figure).find('img').first()
    const source = image.attr('src')
    if (!source || source.includes('medium.com/_/stat')) continue

    imageIndex += 1
    const filename = `${definition.slug}-${String(imageIndex).padStart(2, '0')}.webp`
    const assetPath = `/media/blog/${filename}`
    const articlePath = `../../media/blog/${filename}`
    const caption = normalizeSpace($(figure).find('figcaption').text())
    const alt =
      normalizeSpace(image.attr('alt') ?? '') ||
      caption.split(/(?<=[.!?])\s/)[0]?.slice(0, 180) ||
      `Illustration from ${title}`

    const imageResponse = await fetch(source)
    if (!imageResponse.ok) {
      throw new Error(`Could not download ${source}: ${imageResponse.status}`)
    }

    const input = Buffer.from(await imageResponse.arrayBuffer())
    const output = await sharp(input)
      .rotate()
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer()

    await writeFile(resolve(imageDirectory, filename), output)
    image.attr('src', articlePath)
    image.attr('alt', alt)
    image.removeAttr('width')
    image.removeAttr('height')
    firstImage ??= { path: assetPath, alt }
  }

  const markdown = turndown
    .turndown($.html())
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const categories = Array.isArray(item.category)
    ? item.category
    : [item.category].filter(Boolean)
  const date = new Date(item.pubDate).toISOString().slice(0, 10)
  const frontmatter = [
    '---',
    `title: ${yamlString(title)}`,
    `subtitle: ${yamlString(definition.subtitle)}`,
    `description: ${yamlString(definition.description)}`,
    `pubDate: ${date}`,
    'tags:',
    ...categories.map((category) => `  - ${yamlString(category)}`),
    ...(firstImage
      ? [
          `hero: ${yamlString(firstImage.path)}`,
          `heroAlt: ${yamlString(firstImage.alt)}`,
        ]
      : []),
    ...(definition.series
      ? [
          `series: ${yamlString(definition.series)}`,
          `seriesPart: ${definition.seriesPart}`,
        ]
      : []),
    `featured: ${definition.featured ?? false}`,
    'draft: false',
    '---',
    '',
  ].join('\n')

  await writeFile(
    resolve(contentDirectory, `${definition.slug}.md`),
    `${frontmatter}${markdown}\n`,
  )
  console.log(`Imported ${title}: ${imageIndex} images`)
}
