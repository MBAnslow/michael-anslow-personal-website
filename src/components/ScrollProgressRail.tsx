type ScrollSection = {
  id: string
  label: string
}

type ScrollProgressRailProps = {
  sections: ScrollSection[]
  activeSection: string
}

export function ScrollProgressRail({
  sections,
  activeSection,
}: ScrollProgressRailProps) {
  return (
    <nav className="scroll-story" aria-label="Page progress">
      <span className="scroll-story__track" aria-hidden="true">
        <span className="scroll-story__fill" />
      </span>
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={
                activeSection === section.id ? 'location' : undefined
              }
            >
              <span className="scroll-story__label">{section.label}</span>
              <span className="scroll-story__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
