export interface Project {
  slug: string;
  name: string;
  image: string;
  alt: string;
  caption: string;
  cardClass: string;
  tag: string;
  headline: string;
  challenge: string;
  approach: string;
}

export const projects: Project[] = [
  {
    name: "FORME",
    image: "/assets/images/forme.webp",
    tag: "BRAND STRATEGY / VISUAL IDENTITY / PACKAGING",
    headline: "A new shape of self-care.",
    challenge:
      "The brief: give a modern skincare concept a distinctive voice in a crowded, visually similar category. Make the everyday ritual feel considered, confident and effortless.",
    approach:
      "The direction: sculptural forms, an unapologetic cobalt blue, and a precise typographic system. An identity designed to feel as good in your hands as it looks on your shelf.",
    slug: "forme",
    alt: "FORME sculptural blue skincare packaging with a minimal white box",
    caption: "Brand strategy · Visual identity",
    cardClass: "project project-one",
  },
  {
    name: "MONO",
    image: "/assets/images/mono.webp",
    tag: "ART DIRECTION / EDITORIAL DESIGN / VISUAL IDENTITY",
    headline: "Culture, without the noise.",
    challenge:
      "The brief: create an editorial identity for an independent culture publication. Give diverse voices a shared framework, with enough freedom to surprise on every page.",
    approach:
      "The direction: a strict monochrome foundation, expressive typography, and one electric blue interruption. A flexible system that puts the work, and the people behind it, first.",
    slug: "mono",
    alt: "MONO black and white editorial books and visual identity",
    caption: "Art direction · Editorial design",
    cardClass: "project project-two",
  },
  {
    name: "AER",
    image: "/assets/images/aer.webp",
    tag: "STRATEGY / VISUAL IDENTITY",
    headline: "Space to think differently.",
    challenge:
      "The brief: create an identity for an architecture practice with a precise, human approach to space. Translate spatial thinking into a distinctive visual language.",
    approach:
      "The direction: quiet typography, structural composition and tactile materials. A flexible identity that gives the architecture room to speak.",
    slug: "aer",
    alt: "Architectural stationery and a concrete model for AER",
    caption: "Brand strategy · Visual identity",
    cardClass: "project reveal",
  },
  {
    name: "PULSE",
    image: "/assets/images/pulse.webp",
    tag: "VISUAL IDENTITY / ART DIRECTION",
    headline: "An identity with a rhythm of its own.",
    challenge:
      "The brief: develop a culture-led music identity that connects the energy of live performance with the intimacy of listening.",
    approach:
      "The direction: electric blue, bold type and a dynamic graphic rhythm. A system that moves between sleeves, posters and digital releases.",
    slug: "pulse",
    alt: "PULSE cobalt blue vinyl record packaging",
    caption: "Visual identity · Art direction",
    cardClass: "project reveal",
  },
  {
    name: "STILL",
    image: "/assets/images/still.webp",
    tag: "BRAND IDENTITY / PACKAGING",
    headline: "A moment worth slowing down for.",
    challenge:
      "The brief: build a considered coffee brand around the everyday ritual. Bring clarity and warmth to the shelf without adding visual noise.",
    approach:
      "The direction: understated packaging, a disciplined typographic hierarchy and one small blue signature. Simple, recognisable and designed to be held.",
    slug: "still",
    alt: "STILL premium minimal coffee packaging",
    caption: "Brand identity · Packaging",
    cardClass: "project reveal",
  },
  {
    name: "OFFSET",
    image: "/assets/images/offset.webp",
    tag: "CAMPAIGN / EDITORIAL DESIGN",
    headline: "A different point of view.",
    challenge:
      "The brief: create a campaign for an independent design exhibition, bringing together a diverse collection of creative perspectives.",
    approach:
      "The direction: oversized typography and a bold circular motif interrupt an orderly grid. A modular visual system that invites a closer look.",
    slug: "offset",
    alt: "OFFSET exhibition posters in black white and cobalt blue",
    caption: "Campaign · Editorial design",
    cardClass: "project reveal",
  },
];

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
);
