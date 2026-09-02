import { basePath } from '../utils/basePath'
import { Arrow } from './Arrow'

const imagePath = (filename: string) =>
  `${basePath}media/blog/${filename}`

export function PoiesisFeature({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div className="poiesis-feature">
      <header className="poiesis-feature__header">
        <span>04 / Creative assistance · NLP</span>
        <span>Poiesis Studio</span>
        <button
          className="project-feature__collapse"
          type="button"
          onClick={onCollapse}
          aria-label="Collapse Poiesis Studio project details"
        >
          −
        </button>
      </header>

      <div className="poiesis-feature__intro">
        <div>
          <p className="poiesis-feature__eyebrow">
            A writing instrument before ChatGPT
          </p>
          <h3>Generate possibilities, not finished answers.</h3>
        </div>
        <div className="poiesis-feature__copy">
          <p>
            I originated, conceptualised and implemented Poiesis Studio at Sony
            CSL in 2019. It used a fine-tuned masked language model to let
            writers regenerate arbitrary parts of a text while keeping the
            surrounding composition visible and under their control.
          </p>
          <p>
            The project treated AI as a creative instrument: the person
            perceives, evaluates and integrates ideas while the system helps
            generate possibilities. The approach was awarded a patent and used
            by Sony artists, including Nous Sommes Whim Therapy during the 2021
            AI Song Contest.
          </p>
        </div>
      </div>

      <dl className="poiesis-feature__facts">
        <div>
          <dt>2019</dt>
          <dd>Prototype developed at Sony CSL</dd>
        </div>
        <div>
          <dt>Patent</dt>
          <dd>Awarded for the writing-assistance approach</dd>
        </div>
        <div>
          <dt>2021</dt>
          <dd>Used in the AI Song Contest creative process</dd>
        </div>
      </dl>

      <div className="poiesis-feature__evidence">
        <span>Evidence in practice</span>
        <a
          href="https://www.aisongcontest.com/participants/noussommeswhimtherapy-2021"
          target="_blank"
          rel="noreferrer"
        >
          <small>AI Song Contest 2021</small>
          <strong>
            Used to write the definitive lyrics for “Let it go” by Nous sommes
            Whim Therapy
          </strong>
          <Arrow />
        </a>
        <a
          href="https://www.bfmtv.com/replay-emissions/culture-et-vous/musique-creee-par-intelligence-artificielle-12-08_VN-202208120098.html"
          target="_blank"
          rel="noreferrer"
        >
          <small>BFM TV · Culture et vous</small>
          <strong>
            Featured in “Musique créée par intelligence artificielle”
          </strong>
          <Arrow />
        </a>
      </div>

      <figure className="poiesis-feature__interface">
        <img
          src={imagePath('poiesis-studio-01.webp')}
          alt="The Poiesis Studio interface with words selected for regeneration"
          loading="lazy"
        />
        <figcaption>
          <span>Interface study / 01</span>
          Writers could mask individual words or grammatical categories, add
          constraints and explore multiple continuations.
        </figcaption>
      </figure>

      <div className="poiesis-feature__principles">
        <article>
          <span>01 / Select</span>
          <h4>Work at any scale</h4>
          <p>
            Replace a token, a grammatical category or several connected parts
            instead of surrendering the whole document to generation.
          </p>
        </article>
        <article>
          <span>02 / Condition</span>
          <h4>Paint an intention</h4>
          <p>
            Part-of-speech, syllable, rhyme and emotional constraints made the
            writer&apos;s intention explicit and editable.
          </p>
        </article>
        <article>
          <span>03 / Choose</span>
          <h4>Keep creative agency</h4>
          <p>
            Generation acted as a query—“what could go here?”—while evaluation
            and integration remained recognisable human cognitive steps.
          </p>
        </article>
      </div>

      <footer className="poiesis-feature__footer">
        <p>
          The full project story covers the interface, creative workflow and
          the ideas that later developed into a broader vision for writing with
          AI.
        </p>
        <a href={`${basePath}blog/poiesis-studio/`}>
          Read the full project story
          <Arrow />
        </a>
      </footer>
    </div>
  )
}
