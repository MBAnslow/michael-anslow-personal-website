import { useRef, useState } from 'react'
import { basePath } from '../utils/basePath'
import { Arrow } from './Arrow'

const assetPath = (filename: string) =>
  `${basePath}media/funiki/${filename}`

const belongingGallery = [
  {
    src: assetPath('belonging-process-workbench.webp'),
    alt: 'Cloud armatures, electronics and fabrication materials on a workshop bench',
    caption: 'Armatures and mapped lighting take shape on the workbench.',
  },
  {
    src: assetPath('belonging-process-shell.webp'),
    alt: 'A hand testing the translucent mesh and fibre structure inside the cloud',
    caption: 'Building a translucent outer layer that could hold and diffuse light.',
  },
  {
    src: assetPath('belonging-process-simulation.webp'),
    alt: 'A small illuminated cloud prototype beside computers running a three-dimensional simulation',
    caption: 'Connecting the physical prototype to its simulated environment.',
  },
  {
    src: assetPath('belonging-process-filling.webp'),
    alt: 'A person filling a large illuminated handmade cloud with fibre',
    caption: 'Giving the full-scale cloud its volume by hand.',
  },
  {
    src: assetPath('belonging-collaboration.webp'),
    alt: 'Two collaborators carrying an early cloud prototype through a garden',
    caption: 'Moving an early cloud body between collaborative tests.',
  },
  {
    src: assetPath('belonging-exhibition.webp'),
    alt: 'The completed illuminated cloud suspended above a seat in the exhibition installation',
    caption: 'The completed Belonging installation: a cloud, a seat and a space to breathe.',
  },
]

export function BelongingFeature() {
  const [selectedImage, setSelectedImage] = useState(5)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openImage = (index: number) => {
    setSelectedImage(index)
    dialogRef.current?.showModal()
  }

  return (
    <div className="belonging-feature" aria-labelledby="belonging-title">
      <header className="belonging-feature__header">
        <span>Project focus / 02</span>
        <span>Belonging</span>
        <span>Evidence-based art installation</span>
      </header>

      <div className="belonging-feature__masthead">
        <div>
          <p>Research creation · Related to Funiki</p>
          <h3 id="belonging-title">Belonging</h3>
          <span>Finding a connection to nature through a handmade cloud</span>
        </div>
        <div className="belonging-feature__introduction">
          <p>
            Belonging is a distinct evidence-based art installation growing
            from the same questions as Funiki: how can light and sound alter
            our felt relationship with a space? Here, that question becomes an
            exploration of belonging to nature through an artificial weather
            object.
          </p>
          <p>
            A handmade cloud anchors a simulated environment streaming the
            changing light of a day-and-night cycle. Mapped LEDs, illumination
            and reactive audio rise and fall together through a slow breath
            cycle, giving the installation a living rhythm without trying to
            imitate nature literally.
          </p>
          <a
            href="https://linkedin.com/in/zephirlorne"
            target="_blank"
            rel="noreferrer"
          >
            In collaboration with Zéphyr Lorne
            <small>Cognitive scientist &amp; experience designer</small>
            <Arrow />
          </a>
        </div>
      </div>

      <div className="belonging-feature__installation">
        <figure>
          <button type="button" onClick={() => openImage(5)}>
            <img
              src={belongingGallery[5].src}
              alt={belongingGallery[5].alt}
              loading="lazy"
            />
            <span aria-hidden="true">View installation +</span>
          </button>
          <figcaption>
            <span>Exhibition installation / 01</span>
            {belongingGallery[5].caption}
          </figcaption>
        </figure>
        <div className="belonging-feature__system">
          <span>How the experience breathes</span>
          <h4>One continuous system, from virtual sky to physical light.</h4>
          <dl>
            <div>
              <dt>01 / Object</dt>
              <dd>A handmade cloud with individually mapped LEDs.</dd>
            </div>
            <div>
              <dt>02 / Environment</dt>
              <dd>A simulation streams a full day-and-night light cycle.</dd>
            </div>
            <div>
              <dt>03 / Rhythm</dt>
              <dd>Reactive audio and illumination follow a shared breath.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="belonging-feature__process-heading">
        <span>Prototype journal / 01—05</span>
        <h4>Making the cloud was part of understanding it.</h4>
        <p>
          We moved between small material studies, lighting tests, software
          simulation and full-scale fabrication before assembling the
          exhibition installation.
        </p>
      </div>

      <div className="belonging-feature__process">
        {belongingGallery.slice(0, 5).map((image, index) => (
          <figure key={image.src}>
            <button type="button" onClick={() => openImage(index)}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              <span aria-hidden="true">View +</span>
            </button>
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <footer className="belonging-feature__footer">
        <strong>A related branch of the Funiki inquiry.</strong>
        <p>
          Belonging takes object-based ambience into an explicitly artistic
          and cognitive frame: a situated installation designed around
          perception, breath and a felt relationship with nature.
        </p>
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
            src={belongingGallery[selectedImage].src}
            alt={belongingGallery[selectedImage].alt}
          />
          <figcaption>{belongingGallery[selectedImage].caption}</figcaption>
        </figure>
      </dialog>
    </div>
  )
}
