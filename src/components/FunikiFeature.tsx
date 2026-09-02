import { useRef, useState } from 'react'
import { basePath } from '../utils/basePath'
import { Arrow } from './Arrow'

const assetPath = (filename: string) =>
  `${basePath}media/funiki/${filename}`

const gallery = [
  {
    src: assetPath('lighthouse-intro.webp'),
    alt: 'Guillaume preparing the tabletop role-playing session in a room surrounded by lights',
    caption: 'The Lighthouse — preparing an ambient role-playing session.',
  },
  {
    src: assetPath('lighthouse-candle.webp'),
    alt: 'Players around a table illuminated by a warm simulated candlelight ambience',
    caption: 'A virtual candle translated into spatial light and sound.',
  },
  {
    src: assetPath('lighthouse-blue.webp'),
    alt: 'A player in silhouette within deep blue night-time lighting',
    caption: 'Night-time light makes the fictional setting physically present.',
  },
  {
    src: assetPath('passenger-atmosphere.webp'),
    alt: 'The Passenger installation with immersive purple and blue ambient lighting',
    caption: 'The Passenger — light responding to a participant’s breath.',
  },
]

export function FunikiFeature({ onCollapse }: { onCollapse: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openImage = (index: number) => {
    setSelectedImage(index)
    dialogRef.current?.showModal()
  }

  return (
    <div className="funiki-feature">
      <header className="funiki-feature__header">
        <span>01 / Long-horizon research</span>
        <span>Funiki · ふんいき</span>
        <button
          className="project-feature__collapse"
          type="button"
          onClick={onCollapse}
          aria-label="Collapse Funiki project details"
        >
          −
        </button>
      </header>

      <div className="funiki-feature__intro">
        <div>
          <p className="funiki-feature__eyebrow">
            A digital garden for ambient experience
          </p>
          <h3>Every space can become a stage.</h3>
        </div>
        <div className="funiki-feature__copy">
          <p>
            Funiki is an evolving collection of systems, sketches and
            experiments exploring how dynamic light and sound can transform
            everyday spaces. A virtual scene maps audio–visual objects onto
            whatever speakers and lights are present—surround lighting as a
            counterpart to surround sound.
          </p>
          <blockquote>
            “To transform static spaces into immersive ambient experiences.
            For everyone, in everyday spaces.”
          </blockquote>
        </div>
      </div>

      <div className="funiki-feature__gallery">
        {gallery.map((image, index) => (
          <figure
            className={index === 0 ? 'funiki-photo funiki-photo--large' : 'funiki-photo'}
            key={image.src}
          >
            <button type="button" onClick={() => openImage(index)}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span aria-hidden="true">View +</span>
            </button>
            <figcaption>
              <span>0{index + 1}</span>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="funiki-feature__experiments">
        <article>
          <span>Field study 01</span>
          <h4>The Lighthouse</h4>
          <p>
            A Scooby-Doo-style tabletop mystery used to explore how spatial
            lighting and sound can support shared imagination without becoming
            another screen.
          </p>
        </article>
        <article>
          <span>Collaboration 02</span>
          <h4>The Passenger</h4>
          <p>
            An evidence-based art installation where breath signals modulated
            light, sound and Pepper&apos;s ghost illusions to investigate awe.
          </p>
        </article>
        <article>
          <span>System idea 03</span>
          <h4>Object-based ambience</h4>
          <p>
            Virtual fireplaces, candles and moving sources mix across physical
            devices, making an experience portable between ordinary spaces.
          </p>
        </article>
      </div>

      <div className="funiki-feature__video">
        <div className="funiki-feature__video-copy">
          <span>Concept film / 02:04</span>
          <h4>See the atmosphere take shape</h4>
          <p>
            A concept film by Sébastien Marino featuring creative technologist
            Guillaume Boulliard experimenting with the Funiki engine.
          </p>
        </div>
        <div className="video-frame">
          {videoLoaded ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/i7riCaAyB6A?rel=0"
              title="Funiki project teaser"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="video-frame__poster"
              onClick={() => setVideoLoaded(true)}
              aria-label="Load the Funiki teaser video"
            >
              <img
                src={assetPath('funiki-header.webp')}
                alt=""
                loading="lazy"
              />
              <span className="video-frame__play" aria-hidden="true">
                Play film
                <i>▶</i>
              </span>
            </button>
          )}
        </div>
      </div>

      <footer className="funiki-feature__footer">
        <p>
          Follow the project as it grows through working notes, scene studies
          and technical experiments.
        </p>
        <div>
          <a
            href="https://mbanslow.github.io/funiki-website/About/introduction"
            target="_blank"
            rel="noreferrer"
          >
            Enter the digital garden
            <Arrow />
          </a>
          <a
            href="https://csl.sony.fr/projects/funiki/"
            target="_blank"
            rel="noreferrer"
          >
            Sony CSL project page
            <Arrow />
          </a>
        </div>
      </footer>

      <dialog
        className="media-lightbox"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
      >
        <button
          className="media-lightbox__close"
          type="button"
          onClick={() => dialogRef.current?.close()}
        >
          Close ×
        </button>
        <figure>
          <img
            src={gallery[selectedImage].src}
            alt={gallery[selectedImage].alt}
          />
          <figcaption>{gallery[selectedImage].caption}</figcaption>
        </figure>
      </dialog>
    </div>
  )
}
