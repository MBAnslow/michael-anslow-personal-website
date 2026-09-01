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
  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ??
    sections[0]?.label

  return (
    <nav className="scroll-story" aria-label="Page progress">
      <span
        className="scroll-story__label"
        aria-hidden="true"
        key={activeSection}
      >
        {activeLabel}
      </span>
      <div className="scroll-story__markers">
        <span className="scroll-story__track" aria-hidden="true">
          <span className="scroll-story__fill" />
        </span>
        <ol>
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={`Go to ${section.label}`}
                aria-current={
                  activeSection === section.id ? 'location' : undefined
                }
              >
                <span className="scroll-story__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
