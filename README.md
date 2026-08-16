# Michael Anslow — Personal Website

A static portfolio and first-party blog built with Astro, React and TypeScript.
The visual language combines editorial poster design with original
Portuguese-tile-inspired motifs. Astro generates clean article URLs while
React powers the homepage interactions and Funiki media feature.

## Local development

Requires Node.js 22 or later.

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run lint
npm run build
npm run preview
```

## Updating content

Projects, publications, homepage essays and profile links live in
`src/data/portfolio.ts`. Shared components are in `src/components/`; static
pages and article routes are in `src/pages/`; the design system and responsive
rules are in `src/styles/global.css`.

Edit `src/content/methods-and-tools.md` to update the portfolio’s Methods &
Tools section. Its main heading and quote form the section header; each `##`
heading creates a category, the following paragraph is its description, and
bullet points become the tools.

## Publishing a blog post

Add a Markdown file to `src/content/blog/`. The filename becomes the clean URL:
`my-new-note.md` is published at `/blog/my-new-note/`.

```yaml
---
title: My new note
subtitle: An optional second line
description: A concise summary for cards, RSS and social previews.
pubDate: 2026-08-15
tags:
  - Creative AI
  - Research
hero: /media/example.webp
heroAlt: A useful description of the image
featured: false
draft: false
series: An optional series title
seriesPart: 1
---
```

Set `draft: true` to keep a post out of the archive, static routes, RSS feed and
sitemap. Matching `series` values connect multi-part articles and order them by
`seriesPart`.

The one-time Medium migration is reproducible. It imports the complete text of
all five essays, preserves their Part I/Part II relationships, downloads every
article image, and rewrites cross-article links to local routes:

```sh
npm run import:medium
```

## Media

Site-owned files belong under `public/media/` and should be resized before
commit. The selected Funiki source photographs can be re-downloaded and
converted to optimized WebP files with:

```sh
npm run optimize:media
```

Every editorial image should have meaningful alt text and a caption. Video is
click-to-load and uses YouTube's privacy-enhanced domain; it does not autoplay.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and deploys every push to
`main`. In the repository settings:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push the repository to the `main` branch.

`astro.config.mjs` derives the repository base path from the standard
`GITHUB_REPOSITORY` environment variable. The same workflow therefore supports
both a GitHub user page and a project page.
