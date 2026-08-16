type SectionHeadingProps = {
  index: string
  title: string
  note?: string
}

export function SectionHeading({ index, title, note }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="section-heading__index" aria-hidden="true">
        / {index}
      </span>
      <h2>{title}</h2>
      {note && <p>{note}</p>}
    </header>
  )
}
