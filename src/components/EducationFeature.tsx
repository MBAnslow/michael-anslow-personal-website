export function EducationFeature() {
  return (
    <div className="education-feature">
      <header className="education-feature__header">
        <span>Project focus / 05 · Side interest</span>
        <span>AI &amp; Education</span>
        <span>Research · Volunteering</span>
      </header>

      <div className="education-feature__intro">
        <div>
          <p className="education-feature__eyebrow">
            A parallel line of inquiry
          </p>
          <h3>Technology does not improve education merely by arriving.</h3>
        </div>
        <div className="education-feature__copy">
          <p>
            Alongside my main research practice, I follow how AI is being
            introduced into education—and what disappears when adoption is
            discussed without teachers, children or local context.
          </p>
          <p>
            This interest is grounded in collaborative research on inclusive
            learning and children&apos;s agency, alongside volunteering with
            Crece en Libertad, which supports children and adolescents in
            Mexico to understand and exercise their rights.
          </p>
        </div>
      </div>

      <dl className="education-feature__events">
        <div>
          <dt>Children&apos;s rights</dt>
          <dd>
            <a
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VjnHrW8AAAAJ&citation_for_view=VjnHrW8AAAAJ:2osOgNQ5qMEC"
              target="_blank"
              rel="noreferrer"
            >
              Children&apos;s Rights, Metacognition, and AI Literacy
            </a>
            <span>
              A conceptual framework for protecting autonomy and judgement in
              AI-mediated learning.
            </span>
          </dd>
        </div>
        <div>
          <dt>Inclusive learning</dt>
          <dd>
            <a
              href="https://www.ijcai.org/proceedings/2022/727"
              target="_blank"
              rel="noreferrer"
            >
              Interactive Concept-map Based Summaries for SEND Children
            </a>
            <span>
              Research on an AI-supported tool for children with reading
              comprehension difficulties.
            </span>
          </dd>
        </div>
        <div>
          <dt>Volunteering</dt>
          <dd>
            <a
              href="https://crece-en-libertad.org/"
              target="_blank"
              rel="noreferrer"
            >
              Crece en Libertad
            </a>
            <span>
              I volunteer with this international solidarity NGO, which
              promotes children&apos;s rights and participatory education in
              Mexico.
            </span>
          </dd>
        </div>
      </dl>

      <div className="education-feature__video">
        <div className="education-feature__video-copy">
          <span>Recorded presentation · Sony CSL Paris</span>
          <h4>AI &amp; Education in the wild</h4>
          <p>
            In <em>Etincelle</em>, Martina Galletti and I survey current debates
            about AI and education, then focus on low-resource contexts and AI
            for SEND learners.
          </p>
          <a
            href="https://www.youtube.com/watch?v=7VgPFjEDWBg"
            target="_blank"
            rel="noreferrer"
          >
            Open on YouTube ↗
          </a>
        </div>
        <div className="education-feature__video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/7VgPFjEDWBg?rel=0"
            title="Etincelle by Martina Galletti and Michael Anslow"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
