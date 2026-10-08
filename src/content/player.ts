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
    title: "Sector público / energía",
    quest: "Connecting Systems That Didn't Speak",
    hudLabel: "CLEAR // INTEROPERABILITY",
    copy: "En sector público y energía, el desafío fue coordinar sistemas, servicios y stakeholders para que la información pudiera circular. Exploré interoperabilidad: cómo se conectan los componentes, cómo se configuran las integraciones y qué implica llevar una solución técnica a un entorno institucional.",
    loadout: "Integrations · Stakeholders · Ops",
    unlocks: [
      "Interoperabilidad",
      "Integración de sistemas",
      "Stakeholders",
      "Flujos operativos",
    ],
    accent: "#0d7377",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT",
    copy: "La misión fue construir un puente entre el ERP y la planta: conectar procesos empresariales con la información de producción. Con NestJS trabajé la integración para que los datos recorrieran el flujo previsto. El reto no era solo endpoints — era entender qué necesitaba cada parte y cómo debía comunicarse.",
    loadout: "NestJS · APIs · Integration",
    unlocks: [
      "Backend integration",
      "System thinking",
      "Operational flows",
      "API design",
    ],
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS",
    copy: "En Guarapo / Cata las misiones se enfocaron en tools internas: convertir necesidades concretas en interfaces que interactuaran con la información y los procesos del producto. Con Next y Supabase recorrí el flujo desde la UI hasta la capa de datos.",
    loadout: "Next · Supabase · Internal UI",
    unlocks: [
      "Internal tools",
      "UI funcional",
      "Frontend ↔ datos",
      "Product ops",
    ],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE",
    copy: "Misión freelance: construir una interfaz operativa y llevarla a un entorno de despliegue real. Convertí requerimientos en una experiencia web funcional, con Vercel como parte del proceso de entrega.",
    loadout: "UI · Frontend · Vercel",
    unlocks: [
      "UI operativa",
      "Requerimientos → ship",
      "Deploy real",
    ],
    accent: "#457b9d",
    status: "CLEARED",
  },
];

const clearsEn: PlayerClear[] = [
  {
    title: "Public sector / energy",
    quest: "Connecting Systems That Didn't Speak",
    hudLabel: "CLEAR // INTEROPERABILITY",
    copy: "In public sector and energy, the challenge was coordinating systems, services, and stakeholders so information could move. I explored interoperability: how components connect, how integrations are configured, and what it takes to ship technical work into an institutional environment.",
    loadout: "Integrations · Stakeholders · Ops",
    unlocks: [
      "Interoperability",
      "System integration",
      "Stakeholders",
      "Operational flows",
    ],
    accent: "#0d7377",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT",
    copy: "The mission was to bridge ERP and plant: connect business processes with production information. With NestJS I worked the integration so data could travel the intended flow. The hard part wasn't only endpoints — it was understanding what each side needed and how it should communicate.",
    loadout: "NestJS · APIs · Integration",
    unlocks: [
      "Backend integration",
      "System thinking",
      "Operational flows",
      "API design",
    ],
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS",
    copy: "At Guarapo / Cata the quests focused on internal tools: turning concrete needs into interfaces that talk to product data and processes. With Next and Supabase I worked the full path from UI to the data layer.",
    loadout: "Next · Supabase · Internal UI",
    unlocks: [
      "Internal tools",
      "Functional UI",
      "Frontend ↔ data",
      "Product ops",
    ],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE",
    copy: "Freelance mission: build an operational interface and ship it to a real deploy environment. I turned requirements into a working web experience, with Vercel as part of the delivery path.",
    loadout: "UI · Frontend · Vercel",
    unlocks: ["Operational UI", "Requirements → ship", "Real deploy"],
    accent: "#457b9d",
    status: "CLEARED",
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
      "No solo “trabajé en X”. Cada clear es una ficha de misión: contexto, problema, contribución y unlocks.",
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
      "Not just “I worked at X”. Each clear is a mission card: context, problem, contribution, and unlocks.",
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
