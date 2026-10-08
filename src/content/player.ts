/** Player dossier — Build Catalog HUD
 * Narrative source: ChatGPT player-history script (shared) + verified personal loadout.
 * Rule: no invented degrees, dates, hackathon names, or unverified claims.
 */

export type Locale = "es" | "en";

export type ClearStatus = "CLEARED" | "ONGOING";

export type PlayerClear = {
  title: string;
  /** Narrative quest title */
  quest: string;
  hudLabel: string;
  copy: string;
  loadout: string;
  unlocks: string[];
  accent: string;
  status: ClearStatus;
};

export type PlayerTrophy = {
  id: string;
  title: string;
  category: string;
  stat: string;
  detail: string;
  /** Short text fallback / aria */
  mark: string;
  /** Pixel loadout icon from ChatGPT character sheet */
  icon: string;
  quote?: string;
};

export type SkillTier = "CORE" | "STRONG" | "FAMILIAR";

export type PlayerSkill = {
  label: string;
  /** Relative ticks 1–5 (not a fake %) */
  ticks: 1 | 2 | 3 | 4 | 5;
  tier: SkillTier;
};

/** Fixed-column loadout bars — honest relative tiers, shared across locales */
export const playerSkills: PlayerSkill[] = [
  { label: "Next / React", ticks: 5, tier: "CORE" },
  { label: "TypeScript", ticks: 5, tier: "CORE" },
  { label: "NestJS", ticks: 4, tier: "STRONG" },
  { label: "FastAPI", ticks: 3, tier: "STRONG" },
  { label: "Supabase", ticks: 3, tier: "STRONG" },
  { label: "Vercel", ticks: 3, tier: "STRONG" },
  { label: "AI / Agents", ticks: 2, tier: "FAMILIAR" },
];

type PlayerCopy = {
  name: string;
  classTitle: string;
  classSub: string;
  tagline: string;
  identityLine: string;
  homeEyebrow: string;
  homeLine: string;
  homeMobile: {
    eyebrow: string;
    classLine: string;
    title: string;
    sub: string;
    openCatalog: string;
    source: string;
    unlocked: string;
    liveDemos: string;
    classLabel: string;
    classValue: string;
    missionBoard: string;
    online: string;
    featuredDrops: string;
  };
  catalogPortal: {
    label: string;
    title: string;
    live: string;
    hint: string;
    cta: string;
  };
  playerPortal: {
    label: string;
    title: string;
    hint: string;
    cta: string;
    acts: string;
  };
  sysHint: string;
  acts: { origin: string; clears: string; trophies: string };
  dossierStatus: string;
  dossierOnline: string;
  loadoutTitle: string;
  actEyebrows: { origin: string; clears: string; trophies: string };
  originEyebrow: string;
  originQuote: string;
  originP1: string;
  originP2: string;
  originP3: string;
  originLoadoutLabel: string;
  originLoadout: string;
  originInventoryLabel: string;
  originInventory: string[];
  originNext: string;
  clearsEyebrow: string;
  clearsTitle: string;
  clearsIntro: string;
  clearsNext: string;
  trophiesEyebrow: string;
  trophiesTitle: string;
  trophiesIntro: string;
  trophiesBack: string;
  clears: PlayerClear[];
  trophies: PlayerTrophy[];
  settings: {
    title: string;
    sub: string;
    language: string;
    close: string;
  };
  ctas: {
    catalog: { label: string; href: string };
    player: { label: string; href: string };
    cv: { label: string; href: string };
    github: { label: string; href: string };
  };
  avatar: {
    initials: string;
    level: string;
    pendingLabel: string;
    pendingHint: string;
    photo: string | null;
    credential: string | null;
    agentId: string;
    clearance: string;
    status: string;
    turntable: {
      frames: string[];
      frameWidth: number;
      frameHeight: number;
    } | null;
  };
};

const sharedCtas = {
  catalog: { label: "ENTER CATALOG", href: "/projects" },
  player: { label: "LOAD DOSSIER", href: "/player" },
  cv: { label: "DOWNLOAD CV", href: "/jose-maza-cv.pdf" },
  github: { label: "GITHUB", href: "https://github.com/Jgmaza" },
} as const;

const sharedAvatar = {
  initials: "JM",
  level: "LVL 30",
  pendingLabel: "CRT PORTRAIT",
  pendingHint: "Drop photo at public/player.jpg",
  photo: "/assets/player/portrait.png" as string | null,
  credential: "/assets/player/id-neutro.png" as string | null,
  agentId: "JM-0030",
  clearance: "FULLSTACK",
  status: "ACTIVE",
  turntable: {
    frames: [
      "/assets/player/frame-000.png",
      "/assets/player/frame-030.png",
      "/assets/player/frame-060.png",
      "/assets/player/frame-090.png",
      "/assets/player/frame-210.png",
      "/assets/player/frame-240.png",
      "/assets/player/frame-180.png",
      "/assets/player/frame-120.png",
      "/assets/player/frame-150.png",
      "/assets/player/frame-270.png",
      "/assets/player/frame-330.png",
    ],
    frameWidth: 172,
    frameHeight: 469,
  },
};

const sharedInventory = [
  "Next / React",
  "TypeScript",
  "Supabase",
  "Vercel",
  "NestJS",
  "FastAPI",
  "AI / Agents",
] as const;

const clearsEs: PlayerClear[] = [
  {
    title: "Ministerio de Minas",
    quest: "Mapping the Mining Stakeholder Grid",
    hudLabel: "CLEAR // PUBLIC SECTOR · ONGOING",
    copy: "Misión actual: mapear y gestionar actores del sector minero. Backend FastAPI + SQLAlchemy + MySQL y frontend React orientado a visualización e integración con la API. La plataforma sostiene recolección estructurada y procesos de decisión — interoperabilidad en un entorno institucional real.",
    loadout: "FastAPI · React · MySQL · Stakeholders",
    unlocks: ["Sector público", "Data visualization", "API integration", "Decision support"],
    accent: "#0d7377",
    status: "ONGOING",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS",
    copy: "En Guarapo Labs apoyé proyectos de clientes internacionales y un producto nuevo con front, back y conceptos de AI. Las misiones se enfocaron en tools internas: convertir necesidades concretas en interfaces que hablan con datos y procesos — Next y Supabase de UI a capa de datos. Lore only: sin acceso al código cliente.",
    loadout: "Next · Supabase · Internal UI · AI concepts",
    unlocks: ["Internal tools", "Client delivery", "Frontend ↔ datos", "Product ops"],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Clazz Dev",
    quest: "Fine-Tuning the Assistant Pipeline",
    hudLabel: "CLEAR // AI AUTOMATION",
    copy: "Automatización con AI y asistentes virtuales a medida: OpenAI, n8n, FastAPI y Python. Fine-tuning y prompts estructurados, integración de APIs externas, orquestación de backends y pipelines de automatización para procesos internos y de cliente. El clear no era solo un chat — era poner un agente a trabajar dentro de un flujo real.",
    loadout: "OpenAI · n8n · FastAPI · Python",
    unlocks: ["AI assistants", "Automation pipelines", "Prompt systems", "API orchestration"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "I-Cluster",
    quest: "Shipping Care for Tolú",
    hudLabel: "CLEAR // HEALTH · COMMUNITY",
    copy: "Software para un proyecto de salud emocional en el municipio de Tolú. React + Express para apps escalables, en equipo cross-functional, con foco en calidad y features que sostuvieran iniciativas de bienestar. Una misión donde el producto tocaba personas fuera de la pantalla.",
    loadout: "React · Express · Cross-functional",
    unlocks: ["Health tech", "Community product", "Team delivery", "Reliable shipping"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT",
    copy: "Puente NestJS entre ERP, órdenes y cierre operativo: SOAP/ERP ↔ órdenes ↔ consumo/entrega. El reto no era solo endpoints — era entender qué necesitaba cada lado y cómo debía comunicarse cuando los sistemas no hablan el mismo idioma. Lore laboral: sin IP del cliente.",
    loadout: "NestJS · SOAP · REST · Integration",
    unlocks: ["Backend integration", "Operational flows", "Fragile systems", "API design"],
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Infinity Tech Consulting",
    quest: "Fullstack Craft on AWS & Vercel",
    hudLabel: "CLEAR // AGENCY YEARS",
    copy: "Años manteniendo y construyendo apps fullstack con Next.js, Flask y Prisma — front y back, deploy en AWS y Vercel. Modelado de datos, documentación de requerimientos y casos de uso, UIs responsive para landings, forms y proyectos custom, y flujo Git para calidad en proyectos complejos.",
    loadout: "Next.js · Flask · Prisma · AWS · Vercel",
    unlocks: ["Fullstack delivery", "Cloud deploy", "Requirements → ship", "Git discipline"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "Sofin SAS · Support",
    quest: "Stabilizing the Invoice Gate",
    hudLabel: "CLEAR // OPS SUPPORT",
    copy: "Primer clear corporativo: soporte sobre facturación electrónica y pruebas de código ERP para mejorar estabilidad. Ahí aprendí que un sistema en producción también se cuida desde los tickets, no solo desde el editor.",
    loadout: "ERP · E-invoicing · QA",
    unlocks: ["Production ops", "Support mindset", "ERP context"],
    accent: "#6f8199",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE",
    copy: "Freelance: interfaz operativa (React, tablas, flujos) llevada a deploy real en Vercel. Convertir requerimientos en una superficie usable para equipos — sin exponer detalle de negocio del cliente.",
    loadout: "React · TanStack Table · Redux · Vercel",
    unlocks: ["Freelance ship", "Dense UI", "Client delivery"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "Mussistant",
    quest: "Setlist → Spotify Playlist",
    hudLabel: "CLEAR // PRODUCT · LIVE",
    copy: "Producto propio: de setlist a playlist con OCR, matching Spotify y allowlist en Development Mode. Auth Supabase, panel admin LRU y demo viva en Vercel — cerrar el ciclo problema → UI → API → deploy.",
    loadout: "React · Vite · Supabase · Spotify · OCR",
    unlocks: ["Product ownership", "OAuth PKCE", "Allowlist ops", "Live demo"],
    accent: "#1db954",
    status: "CLEARED",
  },
  {
    title: "Splitia",
    quest: "Who Owes Whom — Without the Drama",
    hudLabel: "CLEAR // PRODUCT · ONGOING",
    copy: "App de gastos compartidos (Next + Supabase). Core tipo Splitwise en curso: grupos, splits, balances y camino hacia agente de gastos diarios por correo. Build activo en el hub.",
    loadout: "Next.js · Supabase · Balances",
    unlocks: ["Product core", "Auth real", "Debt simplification"],
    accent: "#e85d04",
    status: "ONGOING",
  },
  {
    title: "MediAgent",
    quest: "Voice at the Pharmacy Counter",
    hudLabel: "CLEAR // HACKATHON WIN",
    copy: "Hackathon Barranqui-IA / Código Abierto 2025: agente de voz que conecta inventario, fórmula y paciente. Stack de voz caro (Vapi/Deepgram/ElevenLabs) — en portfolio vive como lore + demo degradada. Win unlocked.",
    loadout: "Next · Vapi · Supabase · Voice stack",
    unlocks: ["Hackathon win", "Voice agents", "Team product pitch"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "VerificaCol",
    quest: "Fact-Check the Campaign Feed",
    hudLabel: "CLEAR // AI AGENTS · LIVE",
    copy: "Portal demo que analiza URLs, resume propuestas y conversa sobre el contenido para combatir desinformación electoral. Pipeline de credibilidad + chat — demo pública en Vercel.",
    loadout: "Next · FastAPI · OpenAI · Vercel",
    unlocks: ["LLM product", "Credibility pipeline", "Public demo"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "Edunova",
    quest: "Rebuild the Learning Stack",
    hudLabel: "CLEAR // STARTUP · ONGOING",
    copy: "Recuperar el producto completo (back + front). Misión en curso: reconstruir y volver a poner en pie una plataforma educativa — sin inventar lo que aún no está en repo.",
    loadout: "Fullstack · Product rebuild",
    unlocks: ["Startup recovery", "Full product scope"],
    accent: "#ffb020",
    status: "ONGOING",
  },
  {
    title: "BioAlert+",
    quest: "WhatsApp Alerts for School Cafeterias",
    hudLabel: "CLEAR // HACKATHON · CARIBE",
    copy: "Caribe Tech: agente serverless que convierte transacciones de cafetería en alertas e insights para padres y operadores. Lore + repo del equipo — demos S3 ya no públicas.",
    loadout: "AWS Lambda · Claude · DynamoDB · WhatsApp",
    unlocks: ["Serverless agents", "Hackathon collab", "Ops insights"],
    accent: "#c1121f",
    status: "CLEARED",
  },
  {
    title: "Rhythm Elegance",
    quest: "One Composition, Full Bleed",
    hudLabel: "CLEAR // FRONTEND CRAFT",
    copy: "Landing craft: tipografía expresiva, motion intencional y una sola idea visual. Referencia de frontend cuando el brief pide presencia, no un template.",
    loadout: "React · Vite · Tailwind · Motion",
    unlocks: ["Visual craft", "Landing presence"],
    accent: "#9b2226",
    status: "CLEARED",
  },
  {
    title: "Interledger Agent",
    quest: "Marketplace for Payment Agents",
    hudLabel: "CLEAR // EXPLORATION",
    copy: "Exploración alrededor de Open Payments / Interledger: APIs TypeScript y prototipos de marketplace de agentes. Base técnica para demos y conversaciones de producto.",
    loadout: "TypeScript · Nest/Node · Open Payments",
    unlocks: ["Open payments", "Agent APIs", "R&D prototype"],
    accent: "#6a4c93",
    status: "ONGOING",
  },
];

const clearsEn: PlayerClear[] = [
  {
    title: "Ministry of Mines",
    quest: "Mapping the Mining Stakeholder Grid",
    hudLabel: "CLEAR // PUBLIC SECTOR · ONGOING",
    copy: "Current mission: map and manage mining-sector stakeholders. FastAPI + SQLAlchemy + MySQL backend and a React frontend focused on visualization and API integration. Structured data collection and decision support — interoperability inside a real institutional environment.",
    loadout: "FastAPI · React · MySQL · Stakeholders",
    unlocks: ["Public sector", "Data visualization", "API integration", "Decision support"],
    accent: "#0d7377",
    status: "ONGOING",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS",
    copy: "At Guarapo Labs I supported international client work and a new product spanning front, back, and AI concepts. Internal tools: turn concrete needs into interfaces that talk to product data — Next and Supabase from UI to data. Lore only: no client code access.",
    loadout: "Next · Supabase · Internal UI · AI concepts",
    unlocks: ["Internal tools", "Client delivery", "Frontend ↔ data", "Product ops"],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Clazz Dev",
    quest: "Fine-Tuning the Assistant Pipeline",
    hudLabel: "CLEAR // AI AUTOMATION",
    copy: "AI-driven automation and custom virtual assistants: OpenAI, n8n, FastAPI, and Python. Fine-tuning, structured prompts, external APIs, backend orchestration, and scalable automation pipelines. The clear wasn't just a chat — it was putting an agent to work inside a real workflow.",
    loadout: "OpenAI · n8n · FastAPI · Python",
    unlocks: ["AI assistants", "Automation pipelines", "Prompt systems", "API orchestration"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "I-Cluster",
    quest: "Shipping Care for Tolú",
    hudLabel: "CLEAR // HEALTH · COMMUNITY",
    copy: "Software for an emotional-health project in Tolú. React + Express for scalable apps, cross-functional delivery, and features that supported wellbeing initiatives. A mission where the product reached people beyond the screen.",
    loadout: "React · Express · Cross-functional",
    unlocks: ["Health tech", "Community product", "Team delivery", "Reliable shipping"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT",
    copy: "NestJS bridge between ERP, orders, and operational close: SOAP/ERP ↔ orders ↔ consumption/delivery. The hard part wasn't only endpoints — it was what each side needed when systems don't share a language. Labor lore: no client IP.",
    loadout: "NestJS · SOAP · REST · Integration",
    unlocks: ["Backend integration", "Operational flows", "Fragile systems", "API design"],
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Infinity Tech Consulting",
    quest: "Fullstack Craft on AWS & Vercel",
    hudLabel: "CLEAR // AGENCY YEARS",
    copy: "Years building and maintaining fullstack apps with Next.js, Flask, and Prisma — front and back, deployed on AWS and Vercel. Data modeling, requirements docs, use cases, responsive UIs for landings and custom projects, and Git-based QA across complex work.",
    loadout: "Next.js · Flask · Prisma · AWS · Vercel",
    unlocks: ["Fullstack delivery", "Cloud deploy", "Requirements → ship", "Git discipline"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "Sofin SAS · Support",
    quest: "Stabilizing the Invoice Gate",
    hudLabel: "CLEAR // OPS SUPPORT",
    copy: "First corporate clear: support on electronic invoicing and ERP code testing for stability. Learned that production systems are also cared for from tickets — not only from the editor.",
    loadout: "ERP · E-invoicing · QA",
    unlocks: ["Production ops", "Support mindset", "ERP context"],
    accent: "#6f8199",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE",
    copy: "Freelance: operational interface (React, tables, flows) shipped to a real Vercel deploy. Requirements into a usable surface for teams — business details omitted on purpose.",
    loadout: "React · TanStack Table · Redux · Vercel",
    unlocks: ["Freelance ship", "Dense UI", "Client delivery"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "Mussistant",
    quest: "Setlist → Spotify Playlist",
    hudLabel: "CLEAR // PRODUCT · LIVE",
    copy: "Own product: setlist to playlist with OCR, Spotify matching, and Development Mode allowlist. Supabase auth, LRU admin panel, live Vercel demo — close the loop problem → UI → API → deploy.",
    loadout: "React · Vite · Supabase · Spotify · OCR",
    unlocks: ["Product ownership", "OAuth PKCE", "Allowlist ops", "Live demo"],
    accent: "#1db954",
    status: "CLEARED",
  },
  {
    title: "Splitia",
    quest: "Who Owes Whom — Without the Drama",
    hudLabel: "CLEAR // PRODUCT · ONGOING",
    copy: "Shared-expense app (Next + Supabase). Splitwise-style core in progress: groups, splits, balances, and a path toward a daily expense email agent. Active build on the hub.",
    loadout: "Next.js · Supabase · Balances",
    unlocks: ["Product core", "Real auth", "Debt simplification"],
    accent: "#e85d04",
    status: "ONGOING",
  },
  {
    title: "MediAgent",
    quest: "Voice at the Pharmacy Counter",
    hudLabel: "CLEAR // HACKATHON WIN",
    copy: "Barranqui-IA / Código Abierto 2025 hackathon: voice agent connecting inventory, prescription, and patient. Expensive voice stack — portfolio ships as lore + degraded demo. Win unlocked.",
    loadout: "Next · Vapi · Supabase · Voice stack",
    unlocks: ["Hackathon win", "Voice agents", "Team product pitch"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "VerificaCol",
    quest: "Fact-Check the Campaign Feed",
    hudLabel: "CLEAR // AI AGENTS · LIVE",
    copy: "Demo portal that analyzes URLs, summarizes proposals, and chats about content to fight electoral misinformation. Credibility pipeline + chat — live on Vercel.",
    loadout: "Next · FastAPI · OpenAI · Vercel",
    unlocks: ["LLM product", "Credibility pipeline", "Public demo"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "Edunova",
    quest: "Rebuild the Learning Stack",
    hudLabel: "CLEAR // STARTUP · ONGOING",
    copy: "Recover the full product (back + front). Ongoing mission: rebuild an education platform — without inventing what isn't in a repo yet.",
    loadout: "Fullstack · Product rebuild",
    unlocks: ["Startup recovery", "Full product scope"],
    accent: "#ffb020",
    status: "ONGOING",
  },
  {
    title: "BioAlert+",
    quest: "WhatsApp Alerts for School Cafeterias",
    hudLabel: "CLEAR // HACKATHON · CARIBE",
    copy: "Caribe Tech: serverless agent turning cafeteria transactions into alerts and insights for parents and operators. Lore + team repo — S3 demos no longer public.",
    loadout: "AWS Lambda · Claude · DynamoDB · WhatsApp",
    unlocks: ["Serverless agents", "Hackathon collab", "Ops insights"],
    accent: "#c1121f",
    status: "CLEARED",
  },
  {
    title: "Rhythm Elegance",
    quest: "One Composition, Full Bleed",
    hudLabel: "CLEAR // FRONTEND CRAFT",
    copy: "Landing craft: expressive type, intentional motion, one visual idea. Frontend reference when the brief asks for presence — not a generic template.",
    loadout: "React · Vite · Tailwind · Motion",
    unlocks: ["Visual craft", "Landing presence"],
    accent: "#9b2226",
    status: "CLEARED",
  },
  {
    title: "Interledger Agent",
    quest: "Marketplace for Payment Agents",
    hudLabel: "CLEAR // EXPLORATION",
    copy: "Exploration around Open Payments / Interledger: TypeScript APIs and agent-marketplace prototypes. Technical base for demos and product conversations.",
    loadout: "TypeScript · Nest/Node · Open Payments",
    unlocks: ["Open payments", "Agent APIs", "R&D prototype"],
    accent: "#6a4c93",
    status: "ONGOING",
  },
];


const trophyIcons = {
  music: "/assets/trophies/music.png",
  gym: "/assets/trophies/gym.png",
  chess: "/assets/trophies/chess.png",
  code: "/assets/trophies/code.png",
} as const;

const trophiesEs: PlayerTrophy[] = [
  {
    id: "music",
    title: "SOUND EXPLORER",
    category: "PERSONAL QUEST",
    stat: "MUSIC",
    detail:
      "La música ocupa un lugar central: tocar, escuchar y explorar sonidos. Siempre parte del build.",
    mark: "MU",
    icon: trophyIcons.music,
    quote: "Always part of the build.",
  },
  {
    id: "gym",
    title: "TRAINING ARC",
    category: "LIFE PROGRESSION",
    stat: "GYM",
    detail:
      "Un proceso personal de entrenamiento y progresión que sigue en curso. Mostrarse, otra vez.",
    mark: "GY",
    icon: trophyIcons.gym,
    quote: "Keep showing up.",
  },
  {
    id: "chess",
    title: "ONE MORE MOVE",
    category: "PERSONAL QUEST",
    stat: "CHESS",
    detail:
      "Partidas, posiciones y tiempo para pensar el siguiente movimiento. Estrategia y paciencia.",
    mark: "CH",
    icon: trophyIcons.chess,
    quote: "One more move.",
  },
  {
    id: "public-demo",
    title: "PUBLIC DEMO UNLOCKED",
    category: "PRODUCT MILESTONE",
    stat: "LIVE BUILDS",
    detail:
      "Builds que salieron de local a una experiencia pública tocable. Deploy y entrega de producto.",
    mark: "PD",
    icon: trophyIcons.code,
    quote: "Some trophies were never placed on a podium.",
  },
];

const trophiesEn: PlayerTrophy[] = [
  {
    id: "music",
    title: "SOUND EXPLORER",
    category: "PERSONAL QUEST",
    stat: "MUSIC",
    detail:
      "Music stays central: playing, listening, and exploring sound. Always part of the build.",
    mark: "MU",
    icon: trophyIcons.music,
    quote: "Always part of the build.",
  },
  {
    id: "gym",
    title: "TRAINING ARC",
    category: "LIFE PROGRESSION",
    stat: "GYM",
    detail:
      "A personal training and progression arc that is still ongoing. Show up again.",
    mark: "GY",
    icon: trophyIcons.gym,
    quote: "Keep showing up.",
  },
  {
    id: "chess",
    title: "ONE MORE MOVE",
    category: "PERSONAL QUEST",
    stat: "CHESS",
    detail:
      "Games, positions, and time to think the next move. Strategy and patience.",
    mark: "CH",
    icon: trophyIcons.chess,
    quote: "One more move.",
  },
  {
    id: "public-demo",
    title: "PUBLIC DEMO UNLOCKED",
    category: "PRODUCT MILESTONE",
    stat: "LIVE BUILDS",
    detail:
      "Builds that left localhost for a public, touchable experience. Deploy and product delivery.",
    mark: "PD",
    icon: trophyIcons.code,
    quote: "Some trophies were never placed on a podium.",
  },
];

export const playerByLocale: Record<Locale, PlayerCopy> = {
  es: {
    name: "José Gabriel Maza Mendoza",
    classTitle: "Fullstack Product Engineer",
    classSub: "Problem → UI → API → Deploy",
    tagline: "Build useful things. Keep exploring.",
    identityLine: "Code is part of the build. Not the whole player.",
    homeEyebrow: "BUILD CATALOG · SELECT DESTINATION",
    homeLine: "Elige un camino. Builds para tocar, o el dossier del player.",
    homeMobile: {
      eyebrow: "PLAYER SELECT · JOSÉ MAZA",
      classLine: "FULLSTACK / PRODUCT ENGINEER",
      title: "Build Catalog",
      sub: "Inventario de apps desbloqueadas: productos, agentes AI e integraciones.",
      openCatalog: "OPEN CATALOG",
      source: "SOURCE",
      unlocked: "UNLOCKED",
      liveDemos: "LIVE DEMOS",
      classLabel: "CLASS",
      classValue: "FULLSTACK",
      missionBoard: "MISSION BOARD",
      online: "ONLINE",
      featuredDrops: "FEATURED DROPS ↓",
    },
    catalogPortal: {
      label: "CATALOG",
      title: "Mission board",
      live: "06 LIVE",
      hint: "Builds públicos que puedes abrir y probar.",
      cta: "ENTER CATALOG",
    },
    playerPortal: {
      label: "PLAYER",
      title: "Dossier file",
      hint: "Origins, clears y trophies del player.",
      cta: "LOAD DOSSIER",
      acts: "Origins · Clears · Trophies",
    },
    sysHint: "SYS · SETTINGS · ES / EN",
    acts: { origin: "ORIGINS", clears: "CLEARS", trophies: "TROPHIES" },
    dossierStatus: "PLAYER DOSSIER",
    dossierOnline: "ONLINE",
    loadoutTitle: "LOADOUT",
    actEyebrows: {
      origin: "ACT 01 · ORIGINS",
      clears: "ACT 02 · CLEARS",
      trophies: "ACT 03 · TROPHIES",
    },
    originEyebrow: "ORIGINS // PLAYER BACKGROUND",
    originQuote: "Every player started somewhere.",
    originP1:
      "José Maza comenzó construyendo soluciones desde el código, pero pronto descubrió que completar una misión significaba mucho más que escribir funciones. Aprendió a conectar interfaces, APIs, datos y despliegues para llevar las ideas hasta un producto funcional.",
    originP2:
      "Antes de reunir un loadout completo, tuvo que moverse entre problemas que no venían con instrucciones claras. Cada proyecto fue una oportunidad para entender cómo funcionaban las piezas, cómo se conectaban y qué hacía falta para convertir una idea en algo usable.",
    originP3:
      "Con el tiempo el foco dejó de estar solo en una parte del sistema. La misión pasó a ser cerrar el ciclo: entender el problema, construir la interfaz, conectar el backend y llevar la solución a un entorno donde pudiera probarse. El catálogo reúne builds profesionales, proyectos propios y experimentos públicos.",
    originLoadoutLabel: "CURRENT LOADOUT",
    originLoadout: "Code · Music · Gym · Chess · Ideas",
    originInventoryLabel: "TECH INVENTORY",
    originInventory: [...sharedInventory],
    originNext: "→ CLEARS · misiones completadas",
    clearsEyebrow: "CLEARS // COMPLETED MISSIONS",
    clearsTitle: "Misiones ya completadas",
    clearsIntro:
      "Log laboral + builds propios + hackathons. Cada clear es una misión — el feed avanza solo hasta que tomes el control.",
    clearsNext: "→ TROPHIES · logros y loadout personal",
    trophiesEyebrow: "TROPHIES // ACHIEVEMENTS",
    trophiesTitle: "Logros, hitos y quests personales",
    trophiesIntro:
      "Un trophy es algo específico — no una cualidad genérica. Incluye loadout personal y milestones de producto.",
    trophiesBack: "← ORIGINS · volver al trasfondo",
    clears: clearsEs,
    trophies: trophiesEs,
    settings: {
      title: "SYS · SETTINGS",
      sub: "Ajusta el idioma del catálogo.",
      language: "LANGUAGE",
      close: "CLOSE",
    },
    ctas: {
      catalog: { ...sharedCtas.catalog, label: "ENTER CATALOG" },
      player: { ...sharedCtas.player, label: "LOAD DOSSIER" },
      cv: { ...sharedCtas.cv },
      github: { ...sharedCtas.github },
    },
    avatar: sharedAvatar,
  },
  en: {
    name: "José Gabriel Maza Mendoza",
    classTitle: "Fullstack Product Engineer",
    classSub: "Problem → UI → API → Deploy",
    tagline: "Build useful things. Keep exploring.",
    identityLine: "Code is part of the build. Not the whole player.",
    homeEyebrow: "BUILD CATALOG · SELECT DESTINATION",
    homeLine: "Pick a path. Builds you can touch, or the player dossier.",
    homeMobile: {
      eyebrow: "PLAYER SELECT · JOSÉ MAZA",
      classLine: "FULLSTACK / PRODUCT ENGINEER",
      title: "Build Catalog",
      sub: "Inventory of unlocked apps: products, AI agents, and integrations.",
      openCatalog: "OPEN CATALOG",
      source: "SOURCE",
      unlocked: "UNLOCKED",
      liveDemos: "LIVE DEMOS",
      classLabel: "CLASS",
      classValue: "FULLSTACK",
      missionBoard: "MISSION BOARD",
      online: "ONLINE",
      featuredDrops: "FEATURED DROPS ↓",
    },
    catalogPortal: {
      label: "CATALOG",
      title: "Mission board",
      live: "06 LIVE",
      hint: "Public builds you can open and try.",
      cta: "ENTER CATALOG",
    },
    playerPortal: {
      label: "PLAYER",
      title: "Dossier file",
      hint: "Origins, clears, and player trophies.",
      cta: "LOAD DOSSIER",
      acts: "Origins · Clears · Trophies",
    },
    sysHint: "SYS · SETTINGS · ES / EN",
    acts: { origin: "ORIGINS", clears: "CLEARS", trophies: "TROPHIES" },
    dossierStatus: "PLAYER DOSSIER",
    dossierOnline: "ONLINE",
    loadoutTitle: "LOADOUT",
    actEyebrows: {
      origin: "ACT 01 · ORIGINS",
      clears: "ACT 02 · CLEARS",
      trophies: "ACT 03 · TROPHIES",
    },
    originEyebrow: "ORIGINS // PLAYER BACKGROUND",
    originQuote: "Every player started somewhere.",
    originP1:
      "José Maza started building from code, then learned that clearing a mission meant more than writing functions. He connected interfaces, APIs, data, and deploys to take ideas into working products.",
    originP2:
      "Before the full loadout, he had to move through problems that didn't come with instructions. Each project was a chance to see how the pieces fit, how they talked, and what it took to turn an idea into something usable.",
    originP3:
      "Over time the focus stopped being only one slice of the system. The quest became closing the loop: understand the problem, build the UI, wire the backend, and ship somewhere you can actually try it. The catalog holds professional builds, personal products, and public experiments.",
    originLoadoutLabel: "CURRENT LOADOUT",
    originLoadout: "Code · Music · Gym · Chess · Ideas",
    originInventoryLabel: "TECH INVENTORY",
    originInventory: [...sharedInventory],
    originNext: "→ CLEARS · completed missions",
    clearsEyebrow: "CLEARS // COMPLETED MISSIONS",
    clearsTitle: "Missions already cleared",
    clearsIntro:
      "Work log + own builds + hackathons. Each clear is a mission — the feed crawls until you take control.",
    clearsNext: "→ TROPHIES · milestones and personal loadout",
    trophiesEyebrow: "TROPHIES // ACHIEVEMENTS",
    trophiesTitle: "Achievements, milestones, and personal quests",
    trophiesIntro:
      "A trophy is something specific — not a generic trait. Personal loadout plus product milestones.",
    trophiesBack: "← ORIGINS · back to lore",
    clears: clearsEn,
    trophies: trophiesEn,
    settings: {
      title: "SYS · SETTINGS",
      sub: "Set the catalog language.",
      language: "LANGUAGE",
      close: "CLOSE",
    },
    ctas: {
      catalog: { ...sharedCtas.catalog },
      player: { ...sharedCtas.player },
      cv: { ...sharedCtas.cv },
      github: { ...sharedCtas.github },
    },
    avatar: sharedAvatar,
  },
};

/** @deprecated use playerByLocale + LocaleProvider */
export const player = playerByLocale.es;
