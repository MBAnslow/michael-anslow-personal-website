---
title: "The Lighthouse — Setting the Stage"
subtitle: "The room, lights and game-master setup"
description: "How we arranged nine Philips Hue lights, a shared table and the Funiki control station for The Lighthouse."
pubDate: 2026-02-25
tags:
  - "creative technology"
  - "installation"
  - "tabletop roleplaying"
hero: "/media/blog/lighthouse-setup.webp"
heroAlt: "Philips Hue lights arranged around the music studio used for The Lighthouse."
sourceURL: "https://mbanslow.github.io/funiki-website/Creation/The-Lighthouse/the-setup"
series: "The Lighthouse"
seriesPart: 2
partTitle: "Setting the Stage"
featured: false
draft: false
---

For [*The Lighthouse*](../the-lighthouse/), Guillaume Boulliard and I turned the music studio at Sony CSL Paris into a shared roleplaying space. We ran two sessions there, recording the audio and automatically transcribing it so we could examine the participants’ reactions afterwards.

The studio was useful but imperfect. Existing equipment and a pillar interrupted the room, and it was not possible to create a clean, symmetrical installation. The setup therefore had to work with the space rather than pretend it was a neutral black box.

## Arranging the room

The players sat around a table in the centre. This preserved the familiar social arrangement of a tabletop roleplaying game: everyone could see one another, read their character cards and share a single imagined scene.

Guillaume sat in one corner as game master. From there he could deliver exposition, roll dice and control Funiki without becoming visually detached from the group.

<figure class="article-figure">
  <img src="../../media/blog/lighthouse-room-layout.webp" alt="Top-down sketch of the Lighthouse room: players seated around a table with a lamp at its centre, eight lights around the walls and the game master at a laptop in one corner." loading="lazy" />
  <figcaption>The room layout used for The Lighthouse sessions.</figcaption>
</figure>

## Nine physical lights

We distributed nine Philips Hue lights through the room:

- **Eight perimeter lights** surrounded the group.
- **One central light** sat near the front of the table.

Their function changed with the story. Sometimes the perimeter behaved as a surrounding atmosphere, placing everyone in blue night or ominous red. At other moments, an individual lamp represented a source within the fiction: moonlight, a passing street light, an open doorway or a torch.

The central lamp was particularly useful after the blackout. Its warm flicker illuminated faces and character cards while allowing the edges of the physical room to disappear.

<div class="article-gallery" aria-label="The Lighthouse room setup gallery">
  <a href="../../media/blog/lighthouse-setup.webp" target="_blank">
    <img src="../../media/blog/lighthouse-setup.webp" alt="Philips Hue lamps distributed around the music studio." loading="lazy" />
    <span>The studio and its distributed lamps.</span>
  </a>
  <a href="../../media/blog/lighthouse-guillaume.webp" target="_blank">
    <img src="../../media/blog/lighthouse-guillaume.webp" alt="Guillaume Boulliard seated at the game-master control position." loading="lazy" />
    <span>Guillaume at the game-master station.</span>
  </a>
  <a href="../../media/blog/lighthouse-intro.webp" target="_blank">
    <img src="../../media/blog/lighthouse-intro.webp" alt="Guillaume operating Funiki while consulting the story notes." loading="lazy" />
    <span>Running Funiki alongside the narrative outline.</span>
  </a>
</div>

## Software and sound

We implemented the experience with the [Funiki engine prototype](https://github.com/SonyCSLParis/funiki) that I developed at Sony CSL Paris. Funiki ran directly from Godot. The scene logic controlled virtual light sources whose values were mapped onto the physical Hue lamps around the players.

The mapping uses ego-centric object-based lighting. The room has a digital twin, and a light probe sits at the centre of the scene, where the players are. For each light-emitting object in the virtual scene, Funiki measures the light field it contributes at the probe: its direction, colour and intensity. It then reconstructs that contribution using whatever physical lights are in the room. The result lights you as though you were in the virtual environment.

<figure class="article-figure">
  <img src="../../media/blog/ego-centric-object-based-lighting.webp" alt="Six-panel diagram: a real room with its lamps, a virtual room with a window and fireplace, the contribution of each virtual light measured at a probe at the viewer's position, physical lamps emitting those contributions, the combined result, and the viewer lit as though in the virtual scene." loading="lazy" />
  <figcaption><strong>Ego-centric object-based lighting.</strong> Each virtual light’s contribution at the probe is reproduced by the physical lamps positioned in the matching direction.</figcaption>
</figure>

Audio was streamed to a single JBL speaker. We deliberately kept the first experiment modest and did not use surround sound, although the difference between spatial light and non-spatial audio became important in the [participant feedback](../the-lighthouse-feedback/).

With the room prepared, the next task was to turn Guillaume’s storyboard into distinct technical scenes. Next: [the taxi, lighthouse beam and blackout effects](../the-lighthouse-technical/).
