export function readingTime(content: string) {
  const words = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/[#>*_`[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/).length

  return Math.max(1, Math.ceil(words / 220))
}
