---
title: "A Vision of Writing Assistance Before ChatGPT"
subtitle: "Part II — The Signal in the Machine"
description: "The Intention Rendering Engine and a possible signal-processing paradigm for writing with AI."
pubDate: 2025-07-04
tags:
  - "creativity"
  - "writing"
  - "assistance"
  - "ai"
  - "llm"
hero: "/media/blog/writing-assistance-part-two-01.webp"
heroAlt: "Illustration from A Vision of Writing Assistance Before ChatGPT"
series: "A Vision of Writing Assistance Before ChatGPT"
seriesPart: 2
featured: false
draft: false
---
After my experience with Poiesis Studio which I described in [part I](../poiesis-studio/), I tried to imagine a little further into the future. In particular, I proposed the Intention Rendering Engine (IRE) back in 2021 to encapsulate these new ideas. I never published it so I thought I’d describe it in this article briefly. However, more than the IRE, what I uncovered along the way was potentially a new paradigm shift in writing.

### A Parallel Story — Music Production and Writing

I was inspired by what the [Music Team](https://cslmusicteam.sony.fr/) at Sony CSL was doing, and I had also got my hands dirty experimenting with audio engineering as a teenager.

There were two questions that it seemed natural to ask:

*Is there a parallel story between writing and music production? And, what might that parallel story tell us about the future of writing*?

#### A Brief History of Music Production

Music began as oral and aural traditions. Later, music notation emerged to preserve and transmit compositions which became increasingly available following the invention of the printing press in the 15th century. Much later, in the 19th century, the phonograph revolutionised music by capturing and reproducing sound. In the mid-20th century, analogue mixing consoles became essential tools in studios, allowing engineers to edit audio. By the ‘80s and ‘90s, the rise of computers led to the development of DAWs like Pro Tools, Cubase, and Logic, which digitised the editing process.

<figure class="article-figure article-figure--grouped">
  <div class="article-figure__media article-figure__media--three">
    <img src="../../media/blog/writing-assistance-part-two-01.webp" alt="A phonograph representing the beginning of recorded music." loading="lazy" />
    <img src="../../media/blog/writing-assistance-part-two-02.webp" alt="A sound engineer working at a mixing desk." loading="lazy" />
    <img src="../../media/blog/writing-assistance-part-two-03.webp" alt="A digital audio workstation interface." loading="lazy" />
  </div>
  <figcaption>Some watershed moments in music production. <strong>The Phonograph</strong>, <strong>Mixing Desk </strong>and<strong> Digital Analogue Workstation</strong>.</figcaption>
</figure>

These watershed moments are all focused on technological innovations. However, what might have been the ouput of purely technical endeavours, gave rise to new creative processes and outputs. Take in point the role of music studios in music production. From one perspective, music studios exist to make a literal reproduction of a performance. However, from another perspective, they became a new form of complex musical instrument. It’s at this intersection of technological innovation and creativity that I considered the parallel story of music production and writing.

#### The Parallel Story

One technological change that I suppose we are all familiar with is the creation of software editors. We take for granted the accessibility of various software editors for writing. Text editing software arose at a similar, though slightly earlier, time to DAWs and these both facilitated nonlinear editing, allowing for text/audio to be edited in arbitrary orders and from arbitrary sources. It might take some reflection to understand the role that text editors have in the writing process, but it is profound. It radically alters the speed at which ideas can be expressed, shared and revised. Moreover, different approaches to writing can be adopted, allowing documents to be sketched out and gradually filled in.

While there is a parallel story to be told between writing and music, there are also obvious differences. Writing is symbolic, made up of characters, words, sentences and sections that refer to both real and imaginary concepts. We decode these symbols into semantic representations in our minds during the act of reading. One could argue that reading is to ‘perform’ text, and that was somewhat true historically. In ancient Greek and Roman times, text *was* primarily read out loud, even when reading alone. There is an obvious parallel here with sheet music. Trained musicians can also ‘silent read’ a musical score, insofar as they can imagine the music being performed in their minds.

<figure class="article-figure">
  <img src="../../media/blog/writing-assistance-part-two-04.webp" alt="In ancient Greece and Rome, text did not have gaps between words and had limited punctuation (scriptio continua)." loading="lazy" />
  <figcaption>In ancient Greece and Rome, text did not have gaps between words and had limited punctuation (scriptio continua). It was only when reading out loud that the text was easily understood. Silent reading wasn’t widely adopted until the medieval period and it was even feared to some&nbsp;extent.</figcaption>
</figure>

We know what the symbolic representations of text and music look like, but what about their semantic representations? The thing that they refer to? With music, we can bypass sheet music entirely and record sounds directly. These recordings can be stored in a compact digital format such as the WAV file format. Text on the other hand is a simplified representation of imagined or real mental concepts. That representation is somewhere in our brains, is hard to get at (brain scans), varies between people and is vast — all possible mental concepts related to language that anyone might have or have had in all of history. There isn’t a file format for that.

In this parallel story there is no equivalent to the phonograph for writing. We don’t have a literal reproduction of the mental states of writers other than to read and intuit what the writer might have meant. While natural language processing and linguistics have tried to get at these semantics, it is challenging and perhaps impossible to lay out all of textual semantics in a global map. Even if this were possible, how would we use such a representation in writing assistance anyway?

#### The Signal in the Machine

What I argue in this article, is that the notion of *music as a signal* is one of the most powerful ideas in modern music production. Music as a manipulable waveform, subject to mathematical and algorithmic operations by modular processing units. Synthesizers construct complex sounds from simpler ones via signal processing and audio can be modified using effects like reverb, delay, compression etc. When sounds can be created and modified as signals, music can be created via the orchestration of the elaborate flow of signals from sources to the final mix and master.

The story of writing diverges from the paradigm of creation as signal processing. However, I feel that the writing process is just on the cusp of entering this new paradigm. It’s only recently that it has been possible to create robust, general purpose semantic representations of text that can be operated on. When writing will truly becomes thought of as signal processing, we will start to think about composing documents by introducing signals and orchestrating their flow towards a final document.

### My early 2021 Vision — The Intention Rendering Engine

Around January 2021, a bit less than 2 years before ChatGPT came out, I sketched out a rough outline for a system that tied together many of these ideas. This was my vision for the future of writing assistance at the time. I called it the Intention Rendering Engine and saw it as the counterpart to the Digital Audio Workstation.

The core idea of the IRE was that documents are essentially *renderings* of what you want to express, which I call your *intentions*. These intentions can have different levels of abstraction and detail and can perhaps even be multimodal. They expose the mind’s eye of the writer to the system as discussed in [part I](../poiesis-studio/) so that an AI assistant can work alongside the writer. Embedded within this system is the notion of processes and signal flow which provides a possible example of the *writing with signals* paradigm.

The following diagram captures the main concepts of the Intention Rendering Engine. It might look a bit busy but I’ll break it down.

<figure class="article-figure">
  <img src="../../media/blog/writing-assistance-part-two-05.webp" alt="An imagined Intention Rendering Engine UI." loading="lazy" />
  <figcaption>An imagined Intention Rendering Engine UI. <strong>Intentions</strong> are in blue boxes. Text, audio, image and tabular intentions are shown. <strong>Processes</strong> that operate on intentions are in red boxes with pointed bottoms. Intentions are <strong>scoped</strong> to different parts of the DOM indicated by lines with boxes at either ends. <strong>DOM</strong> elements with solid outlines are fully rendered. DOM elements with dashed outlines indicate that one or more of its children have intentions to render. There might be various <strong>versions</strong> of DOM elements from previous renders indicated by stacked boxes such as the&nbsp;caption.</figcaption>
</figure>

The basic ideas are as follows:

-   **DOM:** There is an explicit document object model that defines a document hierarchy E.g. document, title, paragraph, sentence etc.
-   **Intentions**: The author indicates what needs to be expressed in the document as intentions. These are scoped so that they should be expressed at different levels in the DOM.
-   **Processes**: These transform intentions to text (e.g. an image or audio to its caption) or text to text (e.g. renaming place names, making the text more formal). Processes can also explicitly say how one DOM element is generated from another. For example, the 3rd sentence is generated from the 2nd sentence in the paragraph according to a process.
-   **Rendering:** The process of creating a completed document from: intentions, processes and existing DOM elements. This may require a little planning as there may be dependencies between parts of the DOM. For example, the 3rd sentence is generated from the 2nd sentence in the paragraph according to a process.
-   **Scope:** Intentions have a particular scope. That scope is a particular DOM element such as a sentence or paragraph. The intention should be expressed at that level of granularity and below it in the hierarchy.
-   **Versions:** A user can create many different renders and decide to keep or regenerate DOM elements.

#### Text as a Signal

Back in 2021, it wasn’t clear to me what exactly the *signal* should be in the IRE. Processes and intentions should ideally be able to be combined in arbitrary ways across arbitrary contexts. This is the same as in digital signal processing — we should be able to apply a pitch shift or reverb to any audio signal and have it do something predictable. Luckily for us, modern LLMs are so versatile and robust to their inputs that simply using text as a signal is probably good enough. By that, I mean that every process in the IRE could be an LLM instruction, while non-text modalities could just be converted into text before being processed. The results might not be as predictable as an audio effect is, but it should at least follow the instructions in the process.

One might have to write the instructions carefully and contextualise their role in the IRE. For example, if a process is scoped to a sentence DOM element, the instruction can be extended to include the desired length of the output as a constraint (one sentence). Softer constraints could be introduced as metadata to the IRE, for example, a document scoped intentions such as the style of the text. The IRE could alter process instructions to add this context automatically.

### Design Considerations — Part II

It’s worth reflecting and expanding on some of the design considerations from [part I](../poiesis-studio/). Now that we have the unifying idea of *writing with signals* it’s clear how many of these principles are supported by this idea.

**Paint Your Mind: T**he mind’s eye, which is usually hidden, is now expressed on the page as scoped intentions and processes. It stays there after a render is completed as something like margin notes. These margin notes are like dry/source signals in music production.

**Broad > Fine**: Intentions can be vague or precise. This allows for writers to work from broad to fine strokes when writing a document. Scoping intentions also explicitly indicate how broad a concept is. E.g. an intention specified at a chapter level will be broader than at a sentence level. Fine-level detail will always be surface text that results from a signal flow from intentions and/or other parts of the document.

**Generation as a Query & An Interface to the Unknown:** Users can create by changing processes and adding and removing intentions. Every time they render the document they get some idea of how this affects the rendered output. Processes and intentions create a sort of interface for exploring potential ideas. The creative process now becomes thinking about signal flows from sources to the rendered output.

**Meta Processes and Intentions:** A fun side-effect of viewing instructions as processes is that you could do a form of ‘meta’ programming where processes (instructions) generate processes (instructions). One can also generate intentions for the system rather than specifying them yourself.

**A Sense of Agency and Ownership by Taking Cognitive Steps:** The presence of an explicit DOM and the ability to tether intentions and processes to it provides more fine-grained and explicit control over what is going on. Writing becomes more like creating a map (defining a DOM) and gradually filling it in by intention rendering and conventional writing. This is something that I feel we can conceptually imagine and handle. We say what should exist, where we want it, and how it should get there.

### So What?

#### Sampling Text

One of the consequences of treating audio as a signal in music production was that existing songs could be sampled to make new songs. This was met with some derision and regarded as theft by some people in the music industry but eventually, it became a new creative approach. Intentions can themselves be existing pieces of text that we shop and change to make new texts.

An IRE document can becomes a schematic for many possible rendered documents rather than a single version of rendered text. A document might capture a particular story structure, a type of dialogue etc. These can be composed together by cutting and pasting them, sometimes by copying the text sometimes by copying the signal flow information. It’s like glueing together different programs, but these programs generate parts of a document.

#### Structured Generation for Games

In computer games, generating sensible variations of text could increase the replayability and immersiveness of many games. Something like an IRE could help to specify the intentions and processes that help to render adequately constrained text such as fixed aspects of the dialogue. Moreover, the current game state could be fed in as intentions (game state variables) to add user experience customised dialogue.

As a consequence of the writing with signals paradigm in the IRE, documents now become something more like a program that generates varied dialogues/stories/scenarios. Some IRE documents might even capture particular writing recipes that can be tweaked for different use cases.

#### Reflections on ChatGPT-like LLMs for Writing Assistance

ChatGPT-like LLMs are a byproduct of an implicit vision of LLMs as dialogue systems. This was the most natural and simple extension to autoregressive models (complete the sentence models). They are great general-purpose tools, but perhaps we should re-evaluate how we use them for writing assistance.

As an exercise, we can use the IRE as a point of comparison to ChatGPT-like dialogue interfaces:

-   Intentions and instructions are baked in together in instruction-tuned LLMs — what you want expressed and how you want it to be expressed. Also, every prompt is expected to be an instruction, so intentions would be interpreted as instructions.
-   There is only explicitly one active intention/process at a time (the current prompt). However, there may be other intentions/processes activated implicitly as the LLM might be attending to previous prompts. The flow from intentions and processes to the document being created is transient in ChatGPT-like LLMs unlike the IRE where it is explicit and it ‘remains in the margins’.
-   One can scope changes to documents implicitly (the instruction is followed by changing parts of the document) or explicitly (the instruction details where the change should be) with current LLMs.
-   With current LLMs, all revisions and instructions are in memory. The LLM needs to realise which version it's working on and what it is supposed to be doing with it. The current and previous documents are things that were communicated in a dialogue rather than artefacts that are modified over time. There also isn’t the idea of storing versions of generations.

Hopefully, that has provided some points of comparison to mull over.

### Conclusion

I’ve shared my pre-ChatGPT vision of writing assistance. In particular, the IRE approach to writing assistance supports non-linear writing and the notion of writing with signals*.* I feel strongly that the writing with signals paradigm is one that will transform the way we write over the coming decades. It *is* implicitly how we are already beginning to think about writing with AI, and exploring this idea will likely lead to new creative approaches and workflows. This conceptual shift and sketch of the IRE system could provide a new perspective for researchers and creators.

### Appendices

#### The Intention Rendering Engine

This was the original diagram which I reworked for the article. I thought I’d include it here for completeness. It’s a bit dull and academic.

<figure class="article-figure">
  <img src="../../media/blog/writing-assistance-part-two-06.webp" alt="A." loading="lazy" />
  <figcaption>A. The relationship between sources, targets, surface<br>text and a document. A. 4 sources used to generate parts of<br>a document. An image, a table of data, and two text sources.<br>B. The document structure. C. The way in which sources are<br>bound to targets, the various surface texts available and the<br>chosen surface text in the document.</figcaption>
</figure>
