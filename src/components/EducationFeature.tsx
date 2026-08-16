export function EducationFeature() {
  return (
    <div className="education-feature">
      <header className="education-feature__header">
        <span>Side interest / 01</span>
        <span>AI &amp; Education</span>
        <span>Field notes · Critical inquiry</span>
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
            This interest has developed through research, conversations and
            event-based field notes, including a review of UNESCO Digital
            Learning Week 2025, Educ@tech and BETT prepared with Martina
            Galletti.
          </p>
        </div>
      </div>

      <dl className="education-feature__events">
        <div>
          <dt>UNESCO DLW</dt>
          <dd>Disruptions, dilemmas and directions for AI in education</dd>
        </div>
        <div>
          <dt>Educ@tech + BETT</dt>
          <dd>Reading the EdTech market against classroom realities</dd>
        </div>
        <div>
          <dt>Two lenses</dt>
          <dd>Low-resource contexts and support for SEND learners</dd>
        </div>
      </dl>

      <div className="education-feature__position">
        <span>Working position</span>
        <blockquote>
          Start with the educational relationship, then ask where AI is
          genuinely useful.
        </blockquote>
        <p>
          The history of classroom technology is full of promised revolutions.
          Durable tools tend to support practices that educators can adapt,
          evaluate and make their own.
        </p>
      </div>

      <div className="education-feature__lenses">
        <article>
          <span>01 / Context</span>
          <h4>Design for where learning happens</h4>
          <p>
            Infrastructure, connectivity, language, digital confidence and
            existing pedagogy are design requirements—not details to solve
            after deployment.
          </p>
        </article>
        <article>
          <span>02 / Agency</span>
          <h4>Keep teachers and learners visible</h4>
          <p>
            Efficiency should not quietly displace human relationships,
            children&apos;s voices or accountability for educational
            decisions.
          </p>
        </article>
        <article>
          <span>03 / Evidence</span>
          <h4>Test benefits, harms and assumptions</h4>
          <p>
            Claims about personalisation need evidence that includes cognitive,
            social and emotional development—especially for children at the
            margins.
          </p>
        </article>
      </div>

      <div className="education-feature__questions">
        <div>
          <span>Questions I am following</span>
          <h4>Where might careful technical work help?</h4>
        </div>
        <ul>
          <li>
            How can open educational resources be adapted to local languages,
            reading levels and cultural contexts?
          </li>
          <li>
            Can useful AI systems work offline, across shared devices and
            through a teacher or community proxy?
          </li>
          <li>
            How should children&apos;s rights, privacy and freedom of thought
            shape educational AI?
          </li>
          <li>
            What can language technology contribute to reading comprehension
            and support for SEND learners?
          </li>
        </ul>
      </div>

      <footer className="education-feature__footer">
        <strong>Side interest, intentionally.</strong>
        <p>
          This is an evolving area of reading, discussion and collaboration,
          adjacent to—not presented as—the central programme of my research.
        </p>
      </footer>
    </div>
  )
}
