---
title: "A Vision of Writing Assistance Before ChatGPT"
subtitle: "Part I — Poiesis Studio"
description: "A look back at an experimental writing instrument built with masked language modelling in 2019."
pubDate: 2025-07-01
tags:
  - "writing"
  - "assistance"
  - "ai"
hero: "/media/blog/poiesis-studio-01.webp"
heroAlt: "The Poeisis Studio interface."
titleImage: "/media/blog/poiesis-studio-title.webp"
titleImageAlt: "Watercolour waves surrounding a sequence of masked word tiles reading: The … walked … ."
series: "A Vision of Writing Assistance Before ChatGPT"
seriesPart: 1
featured: false
draft: false
---
#### Back in Time

In 2019 I was working on a writing assistance project. I discontinued that project but I thought I’d share what I was working on and what I imagined the future might look like at the time based on some internal documentation.

#### T-3

Just 3 years before ChatGPT launched, the ‘large’ in Large Language Model meant a 1.5 billion parameters model (GPT-2). A pretty small model by today’s standards at around 100x smaller than GPT 3.5 (ChatGPT). GPT-2 was a ‘pure’ language model in the sense that it just… modelled language. It wasn’t trained to follow instructions, take part in dialogues or perform long-form ‘reasoning’ like newer models.

Alongside GPT-2 (a continue the sentence model), another model called Bert was all the rage. Bert was a masked language model (a fill in the missing words/tokens model). It wasn’t primarily used for generation, but for making nice representations of text that were useful for all sorts of natural language processing tasks. However, I felt that Bert could also be useful for writing assistance and I started a project on just that.

#### Poiesis Studio

The name of the project was Poiesis Studio. I took a Bert model, fine tuned it on lyrics, added some additional features and created a nice interface. This is what I call a *system’s first* approach to research and it has been the hallmark of my work at Sony CSL. That is, imagine the system you want to exist, build it out as far as you can and then work out the details later. It’s a way to reach out into the future in a similar way to [*design fiction*](https://en.wikipedia.org/wiki/Design_fiction), but grounded in engineering.

With Poiesis Studio you could regenerate arbitrary parts of text rather than just performing sentence continuation. You could also choose to change multiple tokens at once of a certain type (e.g. replace all nouns) and indicate restrictions on the tokens that would be generated such as them being adjectives or nouns.

<figure class="article-figure">
  <img src="../../media/blog/poiesis-studio-01.webp" alt="The Poeisis Studio interface." loading="lazy" />
  <figcaption>The Poeisis Studio interface. Shaded tokens would be regenerated when you click on &gt;&gt;. The +|, |+ and x buttons add and remove tokens leaving a ‘_’ as a place holder. Clicking on NOUN would select all noun tokens as a shortcut to avoid having to chose them individually. You could also ‘paint’ restrictions on tokens such as adjectives and nouns if you specifically wanted tokens matching particular parts of speech to be generated.</figcaption>
</figure>

Here is some masked text and possible generations in the interface. The generations would be shown to the right of the interface. The user could refine the masking to generate different sentences.

<figure class="article-figure article-figure--grouped">
  <div class="article-figure__media article-figure__media--two">
    <img src="../../media/blog/poiesis-studio-02.webp" alt="A sentence with selected masked tokens in the Poiesis Studio interface." loading="lazy" />
    <img src="../../media/blog/poiesis-studio-03.webp" alt="A list of generated alternatives with the generated tokens shown in bold." loading="lazy" />
  </div>
  <figcaption>Masked text on the left and various generations on the right with the <strong>generated tokens </strong>shown in&nbsp;bold.</figcaption>
</figure>

Poiesis Studio came with a particular creative workflow in mind. The idea was that users were in charge of Aesthetics (evaluating ideas) and Poiesis Studio aided in… Poiesis (generating ideas). This workflow consisting of four steps:

-   Perceiving what was already there
-   Intuiting how to expand/alter the document
-   Composing/generating new content
-   Integrating this into the existing document

<figure class="article-figure">
  <img src="../../media/blog/poiesis-studio-04.webp" alt="The imagined creative cycle." loading="lazy" />
  <figcaption>The imagined creative&nbsp;cycle.</figcaption>
</figure>

The plan was to add additional kinds of conditioning such as syllable and rhyming constraints as well as more abstract constraints like emotional constraints. These would be visible annotations explicitly indicating the intention of the user.

<figure class="article-figure article-figure--grouped">
  <div class="article-figure__media article-figure__media--two">
    <img src="../../media/blog/poiesis-studio-05.webp" alt="A Poiesis Studio mockup showing syllable and rhyme constraints." loading="lazy" />
    <img src="../../media/blog/poiesis-studio-06.webp" alt="A Poiesis Studio mockup showing paragraph-level emotional constraints." loading="lazy" />
  </div>
  <figcaption>Two mockups. Adding syllable, rhyming and emotion constraints at the token and paragraph level.</figcaption>
</figure>

It was used by some of the artists collaborating with the [Music Team](https://cslmusicteam.sony.fr/artists/) at Sony CSL. Notably, by artists like Nous Sommes Whim Therapy in the AI Song Contest 2021 for their song “Let it go”. Even after ChatGPT launched, I received feedback that it felt more creative to use as a tool than ChatGPT (for lyrics anyway).

Here is a little clip of Nous Sommes Whim Therapy that mentions Poiesis studio [on BFM TV](https://www.bfmtv.com/replay-emissions/culture-et-vous/musique-creee-par-intelligence-artificielle-12-08_VN-202208120098.html).

You’ll recognise the interface.

### Design Considerations

There were several design considerations and insights behind this prototype.

#### Paint Your Mind

We write from the mind’s eye. Normally this latent experience is hidden, but a collaborative writing system would need to ‘know’ our mind’s eye. Hence the explicit annotations provided to the system.

#### Broad > Fine

We don’t always know precisely what we want to express, but we often have some vague intuitions. The system should be able to work with partial specifications.

#### Generation as a Query

After we have painted our mind’s eye, hitting “generate” is like asking the question — “what could go here?” We might need to make many querys, refining what we want based on what we find.

#### An Interface to the Uknown

One can view a musical instrument as an interface to the music that it creates. Discovering how the instrument sounds is an act of play with the instrument as an interface. In a similar way, providing a clear interface for text generation allows a user to work in a text space they couldn’t easily have imagined a priori. It narrows down exploration to a few simple parametres.

#### A Sense of Agency and Ownership by taking Cognitive Steps

As part of the creative cycle, we are given a sence of agency and feeling of creative participation by taking *cognitive steps*. It can be hard to define exactly what a single cognitive step is and it may well be different between different individuals based on their experience. For example, a chess player might see many moves ahead as a single cognitive step while a beginner might only think of the movement of individual pieces. In art a cognitive step might be ‘connect these lines’ or ‘fill this shape’.

To feel like we own what we create, we should be able to recognise the cognitive steps we are taking. Otherwise, we end up somewhere that might be interesting, but we might not know how or why we got there. It’s like we ‘checked out’ for a moment and lost our agency. Clearly, one could use ChatGPT to generate long texts that would require a human to perform many cognitive steps. But do you really have a feeling of creative ownership while doing that?

With regards to cognitive steps, here are some images from my slides I dug up exploring the idea.

<figure class="article-figure article-figure--grouped">
  <div class="article-figure__media article-figure__media--three">
    <img src="../../media/blog/poiesis-studio-07.webp" alt="A cognitive step that introduces a new situation." loading="lazy" />
    <img src="../../media/blog/poiesis-studio-08.webp" alt="A cognitive step that elaborates on an existing situation." loading="lazy" />
    <img src="../../media/blog/poiesis-studio-09.webp" alt="A cognitive step that transfers a story between genres." loading="lazy" />
  </div>
  <figcaption>Some examples of cognitive steps from my&nbsp;slides.</figcaption>
</figure>

#### In Part II

In the next article I’ll write about what I considered the future of writing to be and sketch what I imagined that system might look like.
