import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { basePath } from '../utils/basePath'

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )
  return rss({
    title: 'Michael Anslow — Notes & Essays',
    description:
      'Writing on creative AI, philosophy, research practice and possible futures.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${basePath}blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-gb</language>',
  })
}
