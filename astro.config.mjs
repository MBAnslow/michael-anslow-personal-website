import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

const [owner = 'MBAnslow', repository = ''] = (
  process.env.GITHUB_REPOSITORY ?? '/'
).split('/')
const isUserSite = repository.endsWith('.github.io')
const base = repository && !isUserSite ? `/${repository}` : '/'

export default defineConfig({
  site: `https://${owner.toLowerCase()}.github.io`,
  base,
  output: 'static',
  integrations: [react(), sitemap()],
})
