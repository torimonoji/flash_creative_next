export interface CaseStudy {
  slug: string;
  sector: string;
  year: string;
  status: string;
  services: string[];
  introduction: string;
  ideaTitle: string;
  ideaBody: string;
  identityTitle: string;
  identityBody: string;
  brandLine: string;
  boardLabel?: string;
  typeWeights: string;
  typeSample: string;
  detailLabel: string;
  detailTitle: string;
  detailBody: string;
  detailNote: string;
  detailAlt: string;
  palette: { name: string; hex: string; light: boolean }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  forme: {
    slug: "forme",
    sector: "Beauty & self-care",
    year: "2026",
    status: "Independent concept",
    services: ["Brand strategy", "Visual identity", "Packaging"],
    introduction:
      "An exploration of everyday beauty through form, colour and touch. FORME turns a familiar self-care ritual into something quietly sculptural.",
    ideaTitle: "Less noise.\nMore feeling.",
    ideaBody:
      "A category full of promises needed a simpler point of view. The concept centres on the experience of holding, seeing and using the product — an identity with room to breathe and a shape that invites a second look.",
    identityTitle: "A clear voice.\nA distinctive shape.",
    identityBody:
      "An airy wordmark balances the weight of the sculptural bottle. Cobalt provides a recognisable signature, while paper white and near-black keep the rest of the system precise and restrained.",
    brandLine: "Considered, by nature.",
    typeWeights: "Light / Regular",
    typeSample: "A new shape\nof self-care.",
    detailLabel: "The packaging",
    detailTitle: "Designed to be held.",
    detailBody:
      "The bottle’s soft contours meet the quiet structure of the carton. An embossed curve carries the same gesture across the packaging, connecting the two through texture rather than decoration.",
    detailNote: "Embossed paper. Sculptural glass. One shared gesture.",
    detailAlt:
      "Close-up of the FORME carton’s embossed curve and sculptural cobalt bottle",
    palette: [
      { name: "Cobalt", hex: "#1733BB", light: false },
      { name: "Paper", hex: "#F2F1ED", light: true },
      { name: "Ink", hex: "#181818", light: false },
    ],
  },
  aer: {
    slug: "aer",
    sector: "Architecture & spatial design",
    year: "2026",
    status: "Independent concept",
    services: ["Brand strategy", "Visual identity"],
    introduction:
      "An identity concept for an architecture practice that values precision and the way people inhabit space. AER translates that perspective into measured typography, structural layouts and tactile details.",
    ideaTitle: "Built on clarity.\nOpen to possibility.",
    ideaBody:
      "The identity takes its cues from the work itself: proportion, material and the space between elements. A restrained framework makes room for drawings, models and completed spaces to carry the story.",
    identityTitle: "A quiet presence.\nA precise signature.",
    identityBody:
      "Spaced lettering gives the name an architectural rhythm. Concrete grey and near-black ground the system, while a narrow blue edge introduces a recognisable accent without crowding the composition.",
    brandLine: "Thoughtful spaces. Measured expression.",
    typeWeights: "Light / Regular",
    typeSample: "Space to think\ndifferently.",
    detailLabel: "The applications",
    detailTitle: "Structure you can hold.",
    detailBody:
      "The stationery pairs generous margins with simple alignments. Paper, dark surfaces and a fine blue edge echo the material contrasts of an architectural model. The same principles can guide a project presentation, keeping the identity present while the work takes the lead.",
    detailNote: "Tactile paper. Structural spacing. A fine blue edge.",
    detailAlt:
      "AER light and dark stationery with blue edges beside a concrete architectural model",
    palette: [
      { name: "Concrete", hex: "#D5D2CB", light: true },
      { name: "Graphite", hex: "#242522", light: false },
      { name: "Blueprint", hex: "#213EA6", light: false },
    ],
  },
  pulse: {
    slug: "pulse",
    sector: "Music & culture",
    year: "2026",
    status: "Independent concept",
    services: ["Visual identity", "Art direction"],
    introduction:
      "A music identity concept shaped by the energy of a live set and the intimacy of a record. PULSE brings the two together through bold lettering, electric colour and a direct graphic rhythm.",
    ideaTitle: "Feel the energy.\nKeep the connection.",
    ideaBody:
      "Music moves between shared experiences and private moments. The direction gives both a common visual signature: immediate enough to register at a distance, simple enough to stay close to the artist and the release.",
    identityTitle: "Turn up the type.\nLet colour lead.",
    identityBody:
      "Dense, heavyweight lettering meets a field of electric blue. Black provides contrast and a link to the record itself; paper white creates a pause when the system needs a quieter setting. Scale and repetition supply movement without adding visual clutter.",
    brandLine: "Made to move you.",
    typeWeights: "Regular / Heavy",
    typeSample: "An identity with\na rhythm of its own.",
    detailLabel: "The record sleeve",
    detailTitle: "From sound to surface.",
    detailBody:
      "The sleeve gives the name a commanding position and lets blue carry the rest of the composition. The record label repeats that relationship at a smaller scale. Together, they establish a simple visual language that can extend to a release announcement or a performance poster.",
    detailNote: "Electric blue. Heavy type. A clear graphic beat.",
    detailAlt:
      "PULSE electric blue record sleeve with bold black lettering and a black vinyl record",
    palette: [
      { name: "Electric", hex: "#163CD6", light: false },
      { name: "Vinyl", hex: "#111111", light: false },
      { name: "White", hex: "#F5F5F2", light: true },
    ],
  },
  still: {
    slug: "still",
    sector: "Coffee & everyday rituals",
    year: "2026",
    status: "Independent concept",
    services: ["Brand identity", "Packaging"],
    introduction:
      "A coffee brand concept built around a small, familiar pause. STILL uses clear typography, tactile packaging and a compact blue signature to give the everyday ritual a considered presence.",
    ideaTitle: "Make room\nfor the everyday.",
    ideaBody:
      "The direction starts with the moment of taking a break. Space, readable information and a restrained palette invite a closer look, allowing the product to feel calm and recognisable on the shelf and in the hand.",
    identityTitle: "Less to look at.\nMore to remember.",
    identityBody:
      "An evenly spaced wordmark sets a quiet tone. Paper white and deep charcoal create the foundation, with blue reserved for a small information block. The identity gains consistency through proportion and placement rather than ornament.",
    brandLine: "A pause, thoughtfully made.",
    boardLabel: "Brand identity",
    typeWeights: "Regular / Medium",
    typeSample: "A moment worth\nslowing down for.",
    detailLabel: "The packaging",
    detailTitle: "A familiar ritual, considered.",
    detailBody:
      "The coffee pouch gives the wordmark space and gathers supporting information into a single blue block. On the cup, the same name sits against charcoal. Keeping these elements consistent connects the shelf experience with the moment of drinking.",
    detailNote: "Paper textures. Clear information. One blue signature.",
    detailAlt:
      "STILL paper coffee pouch with a blue information block beside a charcoal takeaway cup",
    palette: [
      { name: "Paper", hex: "#EEECE5", light: true },
      { name: "Charcoal", hex: "#202020", light: false },
      { name: "Signature", hex: "#1547A1", light: false },
    ],
  },
  offset: {
    slug: "offset",
    sector: "Design & exhibitions",
    year: "2026",
    status: "Independent concept",
    services: ["Campaign", "Editorial design"],
    introduction:
      "A campaign concept for an independent design exhibition. OFFSET brings different creative perspectives into one visual framework, using oversized type and a blue circular motif to draw attention to the work.",
    ideaTitle: "A shared space.\nA different angle.",
    ideaBody:
      "An exhibition needs a recognisable invitation while leaving room for many points of view. The concept establishes a common structure, then allows scale, position and image to interrupt it — a small shift that changes the way a composition is read.",
    identityTitle: "Order in the grid.\nEnergy at the edges.",
    identityBody:
      "A bold wordmark anchors the page. The blue circle introduces a contrasting shape and a clear focal point, while black and white keep supporting information direct. These few elements can be rearranged without losing the campaign’s signature.",
    brandLine: "Make space for another perspective.",
    boardLabel: "Campaign",
    typeWeights: "Regular / Bold",
    typeSample: "A different\npoint of view.",
    detailLabel: "The campaign",
    detailTitle: "One idea. Many compositions.",
    detailBody:
      "The poster places a large name above an equally direct circular form. Folds and paper texture give the composition a physical presence. A modular grid carries that relationship into editorial pages and smaller announcements, adjusting the balance of type, image and space to each format.",
    detailNote: "Oversized type. A blue circle. A modular grid.",
    detailAlt:
      "OFFSET exhibition posters with large black typography and a blue circular motif on folded white paper",
    palette: [
      { name: "Ink", hex: "#151515", light: false },
      { name: "Paper", hex: "#F2F1ED", light: true },
      { name: "Signal", hex: "#164BD8", light: false },
    ],
  },
  mono: {
    slug: "mono",
    sector: "Arts & culture / Publishing",
    year: "2026",
    status: "Independent concept",
    services: ["Art direction", "Editorial design", "Visual identity"],
    introduction:
      "An editorial concept for independent culture. MONO gives photography, writing and unexpected perspectives a common language — precise in structure, open in expression.",
    ideaTitle: "Many voices.\nOne clear frame.",
    ideaBody:
      "The system begins with the content. A disciplined grid holds different stories together, while changes in scale and pacing give each contributor room to shape the conversation.",
    identityTitle: "Bold at the surface.\nClear at the core.",
    identityBody:
      "A weighty wordmark anchors the publication. Black and paper white keep imagery and type in focus; electric blue marks a deliberate interruption, guiding the eye without competing with the story.",
    brandLine: "Independent voices. Shared perspective.",
    typeWeights: "Regular / Bold",
    typeSample: "Culture,\nwithout the noise.",
    detailLabel: "The editorial system",
    detailTitle: "A rhythm for every story.",
    detailBody:
      "Oversized titles, generous margins and tightly set supporting text establish a clear reading rhythm. The cover uses the same contrast: a direct masthead, a strong image and a small blue marker. Together, these elements form a recognisable framework for future issues.",
    detailNote: "Monochrome imagery. Expressive type. An electric blue accent.",
    detailAlt:
      "MONO publication covers with bold typography, black-and-white photography and blue editorial accents",
    palette: [
      { name: "Ink", hex: "#181818", light: false },
      { name: "Paper", hex: "#F2F1ED", light: true },
      { name: "Electric", hex: "#2943FF", light: false },
    ],
  },
};
