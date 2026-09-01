export type Accent = 'blue' | 'ochre' | 'terracotta'

export type Project = {
  number: string
  eyebrow: string
  role: string
  title: string
  description: string
  tags: string[]
  skills: {
    technical: string[]
    soft: string[]
  }
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

export type OtherWorkItem = {
  eyebrow: string
  role: string
  title: string
  description: string
  skills: {
    technical: string[]
    soft: string[]
  }
  href: string
}

export type Capability = {
  area: string
  summary: string
  skills: string[]
  evidence: {
    label: string
    href: string
  }[]
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
  { label: 'GitHub', url: 'https://github.com/MBAnslow' },
  { label: 'Sony CSL', url: 'https://csl.sony.fr/people/michael-anslow/' },
]

export const projects: Project[] = [
  {
    number: '01',
    eyebrow: 'Research creation · Sony CSL',
    role: 'Originator',
    title: 'Funiki',
    description:
      'An engine for creating open-ended immersive ambiences with light and sound. Funiki explores how AI can help turn everyday spaces into responsive stages for play, contemplation and shared experience.',
    tags: ['Generative AI', 'Audio–visual', 'Spatial experience'],
    skills: {
      technical: ['Godot', 'Generative AI', 'Audio–visual systems'],
      soft: ['Project conceptualisation', 'Creative direction', 'Cross-disciplinary collaboration'],
    },
    url: 'https://csl.sony.fr/projects/funiki/',
    accent: 'blue',
  },
  {
    number: '02',
    eyebrow: 'Evidence-based art · Research creation',
    role: 'Creative technologist',
    title: 'Belonging',
    description:
      'A related branch of the Funiki inquiry exploring belonging to nature through a handmade cloud, object-based light, reactive audio and a simulated day-and-night cycle.',
    tags: ['Art installation', 'Cognitive science', 'Light & sound'],
    skills: {
      technical: ['Mapped lighting', 'Reactive audio', 'Real-time simulation'],
      soft: ['Creative prototyping', 'Experience design', 'Research collaboration'],
    },
    accent: 'terracotta',
  },
  {
    number: '03',
    eyebrow: 'Community · Paris',
    role: 'Co-founder & organiser',
    title: 'AI–Phi',
    description:
      'A Paris-based community of researchers and professionals tracking the ideas shaping AI and philosophy through seminars, causeries and interdisciplinary discussion.',
    tags: ['AI & society', 'Philosophy', 'Community'],
    skills: {
      technical: ['AI research synthesis', 'Technical communication', 'Web publishing'],
      soft: ['Community building', 'Event curation', 'Discussion facilitation'],
    },
    url: 'https://ai-phi.github.io/',
    accent: 'ochre',
  },
  {
    number: '04',
    eyebrow: 'Creative assistance · Sony CSL',
    role: 'Originator',
    title: 'Poiesis Studio',
    description:
      'A pre-ChatGPT writing assistant built around masked language modelling. The system treated AI as an instrument for creative exploration rather than an author in its own right.',
    tags: ['NLP', 'Creative tools', 'Prototype'],
    skills: {
      technical: [
        'Python',
        'PyTorch',
        'Masked Language Modelling',
        'Full Stack',
        'AWS Deployment',
        'Dockerised',
      ],
      soft: ['Project conceptualisation', 'Creative collaboration', 'Technical communication'],
    },
    localSlug: 'poiesis-studio',
    accent: 'terracotta',
  },
  {
    number: '05',
    eyebrow: 'Side interest · Ongoing inquiry',
    role: 'Co-author & tech volunteer',
    title: 'AI & Education',
    description:
      'An adjacent line of inquiry grounded in co-authored research on inclusive learning, children’s rights and AI literacy, alongside volunteering with Crece en Libertad.',
    tags: ['Inclusive learning', 'AI literacy', 'Children’s rights'],
    skills: {
      technical: ['AI literacy', 'Research synthesis', 'Inclusive technology'],
      soft: ['Academic writing', 'Cross-cultural collaboration', 'Volunteering'],
    },
    accent: 'ochre',
  },
]

export const otherWork: OtherWorkItem[] = [
  {
    eyebrow: 'Multimodal AI · Sony CSL Music Team',
    role: 'Text lead',
    title: 'Text & Audio Project',
    description:
      'Led the text work for an internal Music Team collaboration with data engineer Amaury Delort, exploring multimodal deep learning across language and audio, including NLP pipelines, language modelling, MongoDB and a Dash interface for querying and curating datasets.',
    skills: {
      technical: ['Python & NLP pipelines', 'Language modelling', 'MongoDB & Dash'],
      soft: ['Technical leadership', 'Cross-team collaboration', 'Data curation'],
    },
    href: 'https://cslmusicteam.sony.fr/',
  },
  {
    eyebrow: 'Data exploration · Research system',
    role: 'Originator',
    title: 'Charting Data Landscapes',
    description:
      'A research platform for navigating complex information through semantic representations, retrieval pipelines, data processing and visual interfaces.',
    skills: {
      technical: ['Dash', 'SOLR', 'Information retrieval'],
      soft: ['Project conceptualisation', 'Partner collaboration', 'Interface framing'],
    },
    href: 'https://csl.sony.fr/people/michael-anslow/',
  },
  {
    eyebrow: 'Public-interest NLP · Rapid research',
    role: 'Project lead',
    title: 'Sony CSL COVID Language Team',
    description:
      'Computational-linguistics research examining public discourse across languages and national contexts during the first wave of the pandemic.',
    skills: {
      technical: ['NLP pipelines', 'Data analysis', 'Visualisation'],
      soft: ['Project leadership', 'Rapid research', 'Cross-language collaboration'],
    },
    href: 'https://sonycslparis.github.io/COVID/tweets',
  },
  {
    eyebrow: 'Platform engineering · EU research',
    role: 'Software engineer',
    title: 'Penelope',
    description:
      'First prototype of an online platform, PENELOPE, for composing OpenAPI-described services into analysis pipelines to facilitate the development of distributed components across several institutions. Created for the European Union project ODYCCEUS.',
    skills: {
      technical: ['Django', 'OpenAPI', 'REST', 'Full Stack'],
      soft: ['Research collaboration', 'Technical documentation'],
    },
    href: 'https://github.com/SonyCSLParis/website',
  },
]

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
    evidence: [
      { label: 'Funiki', href: '#project-funiki' },
      { label: 'Poiesis Studio', href: '#project-poiesis-studio' },
      {
        label: 'Charting Data Landscapes',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
    ],
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
    evidence: [
      { label: 'Poiesis Studio', href: '#project-poiesis-studio' },
      {
        label: 'Sony Text & Audio',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
      {
        label: 'Charting Data Landscapes',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
    ],
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
    evidence: [
      {
        label: 'STEM-JEPA',
        href: 'https://csl.sony.fr/publications/stem-jepa/',
      },
      {
        label: 'Sony Music collaboration',
        href: 'https://cslmusicteam.sony.fr/',
      },
      { label: 'Funiki', href: '#project-funiki' },
    ],
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
    evidence: [
      {
        label: 'Penelope',
        href: 'https://github.com/SonyCSLParis/website',
      },
      {
        label: 'Charting Data Landscapes',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
      { label: 'Funiki', href: '#project-funiki' },
    ],
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
    evidence: [
      {
        label: 'Sony COVID Task Force',
        href: 'https://sonycslparis.github.io/COVID/tweets',
      },
      {
        label: 'VUB AI Lab',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
      {
        label: 'Edinburgh research',
        href: 'https://csl.sony.fr/people/michael-anslow/',
      },
    ],
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
    evidence: [
      { label: 'AI–Phi', href: '#project-ai-phi' },
      {
        label: 'IJCAI',
        href: 'https://csl.sony.fr/publications/interactive-concept-map-based-summaries-for-send-children/',
      },
      {
        label: 'ISMIR',
        href: 'https://csl.sony.fr/publications/stem-jepa/',
      },
      {
        label: 'Sony CSL COVID Language Team',
        href: 'https://sonycslparis.github.io/COVID/tweets',
      },
    ],
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
    evidence: [
      { label: 'Belonging', href: '#project-belonging' },
      { label: 'Funiki', href: '#project-funiki' },
      { label: 'Poiesis Studio', href: '#project-poiesis-studio' },
    ],
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
    evidence: [
      {
        label: 'Materialising Myths',
        href: '/blog/materialising-myths/',
      },
      {
        label: 'The Light and Dark of Awe',
        href: '/blog/the-light-and-dark-of-awe/',
      },
      {
        label: 'Poiesis Studio',
        href: '/blog/poiesis-studio/',
      },
    ],
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
    evidence: [
      { label: 'AI & Education', href: '#project-ai-education' },
      {
        label: 'Materialising Myths',
        href: '/blog/materialising-myths/',
      },
      {
        label: 'Children’s Rights & AI Literacy',
        href: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=VjnHrW8AAAAJ&citation_for_view=VjnHrW8AAAAJ:2osOgNQ5qMEC',
      },
    ],
  },
  {
    area: 'Connecting communities',
    summary:
      'Creating communities where researchers, practitioners and curious people can examine difficult questions together across disciplinary boundaries.',
    skills: [
      'Community building',
      'Event curation',
      'Discussion facilitation',
      'Cross-discipline dialogue',
    ],
    evidence: [
      { label: 'AI–Phi', href: '#project-ai-phi' },
      {
        label: 'Seminars & causeries',
        href: 'https://ai-phi.github.io/',
      },
      {
        label: 'Research communities',
        href: 'https://csl.sony.fr/seminars/martina-galletti-michael-anslow/',
      },
    ],
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
    url: 'https://www.ijcai.org/proceedings/2022/727',
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
