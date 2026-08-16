export type Accent = 'blue' | 'ochre' | 'terracotta'

export type Project = {
  number: string
  eyebrow: string
  title: string
  description: string
  tags: string[]
  url?: string
  localSlug?: string
  accent: Accent
}

export type Publication = {
  year: string
  title: string
  authors: string
  venue: string
  url: string
}

export type Essay = {
  date: string
  title: string
  subtitle: string
  url?: string
  localSlug?: string
}

export type Capability = {
  area: string
  summary: string
  skills: string[]
  evidence: string
}

export type ProofPoint = {
  value: string
  label: string
  detail: string
}

export const profileLinks = [
  {
    label: 'LinkedIn',
    url: 'https://fr.linkedin.com/in/michael-anslow-researcher-innovator',
  },
  {
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=VjnHrW8AAAAJ&hl=en',
  },
  { label: 'Sony CSL', url: 'https://csl.sony.fr/people/michael-anslow/' },
]

export const projects: Project[] = [
  {
    number: '01',
    eyebrow: 'Research creation · Sony CSL',
    title: 'Funiki',
    description:
      'An engine for creating open-ended immersive ambiences with light and sound. Funiki explores how AI can help turn everyday spaces into responsive stages for play, contemplation and shared experience.',
    tags: ['Generative AI', 'Audio–visual', 'Spatial experience'],
    url: 'https://csl.sony.fr/projects/funiki/',
    accent: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Evidence-based art · Research creation',
    title: 'Belonging',
    description:
      'A related branch of the Funiki inquiry exploring belonging to nature through a handmade cloud, object-based light, reactive audio and a simulated day-and-night cycle.',
    tags: ['Art installation', 'Cognitive science', 'Light & sound'],
    accent: 'terracotta',
  },
  {
    number: '03',
    eyebrow: 'Community · Paris',
    title: 'AI–Phi',
    description:
      'A Paris-based community of researchers and professionals tracking the ideas shaping AI and philosophy through seminars, causeries and interdisciplinary discussion.',
    tags: ['AI & society', 'Philosophy', 'Community'],
    url: 'https://ai-phi.github.io/',
    accent: 'ochre',
  },
  {
    number: '04',
    eyebrow: 'Creative assistance · Sony CSL',
    title: 'Poiesis Studio',
    description:
      'A pre-ChatGPT writing assistant built around masked language modelling. The system treated AI as an instrument for creative exploration rather than an author in its own right.',
    tags: ['NLP', 'Creative tools', 'Prototype'],
    localSlug: 'poiesis-studio',
    accent: 'terracotta',
  },
]

export const educationInterest: Project = {
  number: 'S1',
  eyebrow: 'Side interest · Ongoing inquiry',
  title: 'AI & Education',
  description:
    'An adjacent line of inquiry into how AI enters education through teaching practice, policy, rights, access and local conditions—shaped by reflections from UNESCO Digital Learning Week, Educ@tech and BETT.',
  tags: ['Human agency', 'EdTech', 'Children’s rights'],
  accent: 'ochre',
}

export const capabilities: Capability[] = [
  {
    area: '0→1 innovation',
    summary:
      'Shaping vague intuitions and new research into technological experiences that can be tested, communicated and developed.',
    skills: [
      'Opportunity framing',
      'Project conceptualisation',
      'Rapid prototyping',
      'Patent development',
    ],
    evidence: 'Funiki · Poiesis Studio · Charting Data Landscapes',
  },
  {
    area: 'Language AI & retrieval',
    summary:
      'Deep NLP experience spanning language models, semantic representations, search and production-scale text processing.',
    skills: [
      'Language modelling',
      'Semantic embeddings',
      'Information retrieval',
      'Text processing pipelines',
    ],
    evidence: 'Poiesis Studio · Sony Text & Audio · Charting Data Landscapes',
  },
  {
    area: 'Multimodal & deep learning',
    summary:
      'Connecting language, audio and visual representations through modern deep-learning and generative methods.',
    skills: [
      'Contrastive learning',
      'Transformers',
      'Generative modelling',
      'Audio–text systems',
    ],
    evidence: 'STEM-JEPA · Sony Music Team collaboration · Funiki',
  },
  {
    area: 'Full-stack AI systems',
    summary:
      'Building complete research systems across models, interfaces, APIs, databases, search indexes and deployment.',
    skills: [
      'Python',
      'Django, Dash & Flask',
      'Databases & search',
      'Docker & AWS',
    ],
    evidence: 'Penelope · Charting Data Landscapes · Funiki',
  },
  {
    area: 'Data science & visualisation',
    summary:
      'Acquiring, analysing and making sense of complex datasets using statistical, spatial and network-based methods.',
    skills: [
      'Data acquisition',
      'Dimensionality reduction',
      'Clustering',
      'Network analysis',
    ],
    evidence: 'Sony COVID Task Force · VUB AI Lab · Edinburgh postgraduate research',
  },
  {
    area: 'Research leadership',
    summary:
      'Leading technical work while making complex ideas legible across research, creative and professional communities.',
    skills: [
      'Technical leadership',
      'Academic publishing',
      'Talks & tutorials',
      'Cross-discipline communication',
    ],
    evidence: 'AI–Phi · IJCAI · ISMIR · Sony CSL COVID Language Team',
  },
  {
    area: 'Creative experiences',
    summary:
      'Making emerging technologies tangible, atmospheric and open to interpretation through interactive, audio–visual and spatial experiences.',
    skills: [
      'Creative direction',
      'Experience design',
      'Interaction design',
      'Audio–visual experimentation',
    ],
    evidence: 'Belonging · Funiki · Poiesis Studio',
  },
  {
    area: 'Writing & imagination',
    summary:
      'Using essays, narrative and speculative thinking to develop ideas that cannot be understood through technical prototypes alone.',
    skills: [
      'Long-form writing',
      'Concept development',
      'Narrative framing',
      'Cultural analysis',
    ],
    evidence: 'Materialising Myths · The Light and Dark of Awe · Poiesis Studio',
  },
  {
    area: 'Critical inquiry',
    summary:
      'Tracking the larger questions around AI: human agency, social myths, education, philosophy and how technical systems reshape institutions and everyday life.',
    skills: [
      'Critical synthesis',
      'AI philosophy',
      'Ethics & societal context',
      'Horizon scanning',
    ],
    evidence: 'AI & Education · Materialising Myths · Children’s Rights & AI Literacy',
  },
  {
    area: 'Connect',
    summary:
      'Creating communities where researchers, practitioners and curious people can examine difficult questions together across disciplinary boundaries.',
    skills: [
      'Community building',
      'Event curation',
      'Discussion facilitation',
      'Cross-discipline dialogue',
    ],
    evidence: 'AI–Phi · Seminars & causeries · Research communities',
  },
]

export const proofPoints: ProofPoint[] = [
  {
    value: '2017—Now',
    label: 'Research Engineer / Innovator',
    detail: 'Sony Computer Science Laboratories, Paris',
  },
  {
    value: '02',
    label: 'Patent record',
    detail: 'One awarded · one pending',
  },
  {
    value: 'MSc / BSc',
    label: 'AI foundations',
    detail: 'NLP specialisation · First-class CS · O’Reilly Academic Award',
  },
  {
    value: 'IJCAI / ISMIR',
    label: 'Peer-reviewed research',
    detail: 'Language, knowledge and multimodal AI',
  },
]

export const publications: Publication[] = [
  {
    year: '2026',
    title:
      'Children’s Rights, Metacognition, and AI Literacy: A Conceptual Framework',
    authors:
      'Anslow, Galletti, Charghinoff, Gökpinar, Retkowsky et al.',
    venue: 'PCAIDE',
    url: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VjnHrW8AAAAJ&citation_for_view=VjnHrW8AAAAJ:2osOgNQ5qMEC',
  },
  {
    year: '2024',
    title:
      'STEM-JEPA: A Joint-Embedding Predictive Architecture for Musical Stem Compatibility Estimation',
    authors: 'Riou, Lattner, Hadjeres, Anslow & Peeters',
    venue: 'ISMIR',
    url: 'https://arxiv.org/abs/2408.02514',
  },
  {
    year: '2023',
    title:
      'Exploring Spatial-Temporal Variations of Public Discourse on Social Media',
    authors: 'Anslow & Galletti',
    venue: 'arXiv',
    url: 'https://arxiv.org/abs/2306.16031',
  },
  {
    year: '2022',
    title: 'Interactive Concept-map Based Summaries for SEND Children',
    authors:
      'Galletti, Anslow, Bianchi, Calanca, Tomaiuoli, Vedovelli et al.',
    venue: 'IJCAI',
    url: 'https://scholar.google.com/citations?user=VjnHrW8AAAAJ&hl=en',
  },
  {
    year: '2015',
    title: 'Aligning Experientially Grounded Ontologies Using Language Games',
    authors: 'Anslow & Rovatsos',
    venue: 'GKR',
    url: 'https://scholar.google.com/citations?user=VjnHrW8AAAAJ&hl=en',
  },
]

export const essays: Essay[] = [
  {
    date: 'Dec 2025',
    title: 'Materialising Myths',
    subtitle: 'Exploring future societal roles of AI',
    localSlug: 'materialising-myths',
  },
  {
    date: 'Nov 2025',
    title: 'The Light and Dark of Awe',
    subtitle: 'Part II — Aw-ful',
    localSlug: 'light-and-dark-of-awe-part-two',
  },
  {
    date: 'Oct 2025',
    title: 'The Light and Dark of Awe',
    subtitle: 'Part I — Awe-some',
    localSlug: 'the-light-and-dark-of-awe',
  },
  {
    date: 'Jul 2025',
    title: 'A Vision of Writing Assistance Before ChatGPT',
    subtitle: 'Part II — The Signal in the Machine',
    localSlug: 'writing-assistance-part-two',
  },
  {
    date: 'Jul 2025',
    title: 'A Vision of Writing Assistance Before ChatGPT',
    subtitle: 'Part I — Poiesis Studio',
    localSlug: 'poiesis-studio',
  },
]
