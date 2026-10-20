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
  { label: "Next.js", ticks: 5, tier: "CORE" },
  { label: "TypeScript", ticks: 5, tier: "CORE" },
  { label: "React", ticks: 4, tier: "STRONG" },
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
  loadoutExpand: string;
  loadoutExpandEyebrow: string;
  loadoutExpandTitle: string;
  loadoutExpandIntro: string;
  loadoutClose: string;
  loadoutCount: string;
  loadoutEstimateNote: string;
  loadoutProject: string;
  loadoutProjects: string;
  loadoutRepo: string;
  loadoutRepos: string;
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
    colorimetry: string;
    close: string;
  };
  ctas: {
    catalog: { label: string; href: string };
    player: { label: string; href: string };
    cv: { label: string; href: string };
    github: { label: string; href: string };
    pro: { label: string; href: string };
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
  pro: { label: "PRO PORTFOLIO", href: "https://jgmaza.vercel.app" },
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
  "Next.js",
  "TypeScript",
  "React",
  "Supabase",
  "Vercel",
  "NestJS",
  "FastAPI",
  "AI / Agents",
] as const;

const clearsEs: PlayerClear[] = [
  {
    title: "Ministerio de Minas",
    quest: "Multi-Track Institutional Ops",
    hudLabel: "CLEAR // PUBLIC SECTOR · Sep 2025–presente",
    copy: "Misión actual en varias pistas: Integrador de servicios (APISIX/FastAPI/Vue, interoperabilidad VUT↔ARGO/REDAM/RUES/VUCE), SIVEEIC (dosimetría unificada Angular/Node/SQL Server), Taiga corporativo (LDAP, Kanban, alertas) y mapeo de actores (matriz — única demo pública sanitizada). No es solo la matriz.",
    loadout: "FastAPI · APISIX · Vue · Angular · Node · SQL Server · React",
    unlocks: ["Interoperability gateway", "Energy surveillance", "DevOps docs", "Public-sector delivery"],
    accent: "#0d7377",
    status: "ONGOING",
  },
  {
    title: "Integrador de Servicios",
    quest: "One Gateway to Hide the Wire",
    hudLabel: "CLEAR // INTEROP · ONGOING",
    copy: "Fachada HTTP: gateway APISIX + admin FastAPI/Vue. REST↔SOAP, token broker, vault de credenciales, RBAC por apps. Demo sanitizada en Vercel (Interop Gateway) con MSW — sistemas ficticios. Autoría mayoritaria en transversales/integrador.",
    loadout: "FastAPI · Vue · APISIX · PostgreSQL · K8s · MSW demo",
    unlocks: ["API gateway", "SOAP↔JSON", "RBAC", "Sanitized demo"],
    accent: "#1d3557",
    status: "ONGOING",
  },
  {
    title: "SIVEEIC",
    quest: "Unify the Dosimetry Ledger",
    hudLabel: "CLEAR // ENERGY SURVEILLANCE · ONGOING",
    copy: "Ecosistema multi-repo de vigilancia energética. Foco: dosimetría unificada — SPs + dual-write, flags NR/NP, Consultar multi-filtro y reportes. Demo sanitizada Dose Ledger en Vercel (MSW) con trabajadores ficticios.",
    loadout: "Angular · Node · SQL Server · Docker · MSW demo",
    unlocks: ["Unified dosimetry", "Dual-write", "Sanitized demo"],
    accent: "#2a9d8f",
    status: "ONGOING",
  },
  {
    title: "Taiga MME",
    quest: "Patch the Board, Not the Process",
    hudLabel: "CLEAR // TOOLING · CLEARED",
    copy: "Customizaciones sobre Taiga 6.8 dockerizado: filtro/búsqueda de etiquetas en Kanban, validación de fechas de vencimiento y alertas por correo. Documentado en el manual de actualización 2025–2026.",
    loadout: "Taiga · Docker · JS patches · Python notify · LDAP",
    unlocks: ["Product customization", "Kanban UX", "Due-date alerts"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS · Jun–Sep 2025",
    copy: "En Guarapo Labs apoyé clientes internacionales y un producto nuevo (front, back e IA). Al entrar, aceleramos entregas y nos pusimos al día con el cronograma; en el track visual mantuve las tareas de UI al corriente (Next + Supabase). Lore only: sin código de cliente.",
    loadout: "Next · Supabase · Internal UI · AI concepts",
    unlocks: ["Schedule catch-up", "Front ownership", "Internal tools", "Client delivery"],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Clazz Dev",
    quest: "Fine-Tuning the Assistant Pipeline",
    hudLabel: "CLEAR // AI AUTOMATION · Feb–May 2025",
    copy: "Automatización con AI (OpenAI, n8n, FastAPI, Python) dentro de flujos reales de ventas/ops. Workflows de agente que bajaron la operación humana de ~7 a ~2 personas al gestionar el ciclo de ventas. Lore: sin publicar el proyecto que no funcionó ni métricas de dashboard no recordadas.",
    loadout: "OpenAI · n8n · FastAPI · Python",
    unlocks: ["7→2 ops", "Sales agent", "Automation pipelines", "API orchestration"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE · Dic 2024–Ene 2025",
    copy: "Freelance (~2 meses) antes de Clazz, con el mismo círculo: interfaz operativa (React, tablas, flujos) llevada a deploy real en Vercel. Puente freelance → incorporación a la startup. Detalle de negocio del cliente omitido.",
    loadout: "React · TanStack · Redux · Vercel",
    unlocks: ["Freelance ship", "Dense UI", "Client delivery"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "I-Cluster",
    quest: "Shipping Care for Tolú",
    hudLabel: "CLEAR // HEALTH · Jun 2024–Ene 2025",
    copy: "Software para un proyecto de salud emocional en el municipio de Tolú. React + Express para apps escalables, en equipo cross-functional, con foco en calidad y features que sostuvieran iniciativas de bienestar. Una misión donde el producto tocaba personas fuera de la pantalla.",
    loadout: "React · Express · Cross-functional",
    unlocks: ["Health tech", "Community product", "Team delivery", "Reliable shipping"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "Infinity Tech Consulting",
    quest: "Fullstack Craft on AWS & Vercel",
    hudLabel: "CLEAR // AGENCY · Abr 2022–Jun 2024",
    copy: "Agency fullstack (Next/Flask/Prisma/AWS/Vercel). Pieza central: Commodo — fidelización tipo puntos que sigue viva; front en las 3 plataformas web del cliente. POS desde cero en ~1 mes (APIs Commodo + Siigo + lookups externos). Al inicio aprendí React en días para desbloquear un proyecto lento del equipo.",
    loadout: "Next.js · Flask · Prisma · Siigo · AWS · Vercel",
    unlocks: ["Commodo live", "3 web platforms", "POS in 1 month", "React ramp-up"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT · ONGOING",
    copy: "Mismo empleador, dos capítulos: soporte inicial (Nov 2021–Ene 2022) y retorno freelance con MIOBOX — modificar/extender código C#/.NET existente + puente NestJS SOAP/ERP ↔ órdenes ↔ consumo/entrega. Métrica: ciclo ERP ~40 min → ~2 min (−95%). Lore laboral: sin IP del cliente.",
    loadout: "C# · .NET · NestJS · SOAP · REST",
    unlocks: ["40min→2min", "C#/.NET legacy", "Backend integration", "API design"],
    accent: "#264653",
    status: "ONGOING",
  },
  {
    title: "Sofin SAS · Support",
    quest: "Stabilizing the Invoice Gate",
    hudLabel: "CLEAR // OPS SUPPORT · Nov 2021–Ene 2022",
    copy: "Primer clear corporativo: soporte sobre facturación electrónica y pruebas de código ERP para mejorar estabilidad. Ahí aprendí que un sistema en producción también se cuida desde los tickets, no solo desde el editor. Capítulo temprano del mismo empleador SofinSaS.",
    loadout: "ERP · E-invoicing · QA",
    unlocks: ["Production ops", "Support mindset", "ERP context"],
    accent: "#6f8199",
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
    hudLabel: "CLEAR // HACKATHON · BARRANQUILLIA 2026",
    copy: "Hackathon BarranquillIA 2026: agente de voz que conecta inventario, fórmula y paciente. Stack de voz caro (Vapi/Deepgram/ElevenLabs) — en portfolio vive como lore + demo degradada. Participación de equipo — sin premio.",
    loadout: "Next · Vapi · Supabase · Voice stack",
    unlocks: ["Hackathon run", "Voice agents", "Team product pitch"],
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
    title: "EduNova",
    quest: "Rebuild the Learning Stack",
    hudLabel: "CLEAR // BARRANQUILLIA 2025 · SHADAI · 4TH",
    copy: "BarranquillIA 2025: premio a mejor proyecto usando ShadAI (tecnología USA) y 4.º lugar general. Misión actual: recuperar el producto completo (back + front) y volver a poner en pie la plataforma educativa — sin inventar lo que aún no está en repo.",
    loadout: "ShadAI · Fullstack · Product rebuild",
    unlocks: ["ShadAI award", "4th overall", "Product recovery"],
    accent: "#ffb020",
    status: "ONGOING",
  },
  {
    title: "BioAlert+",
    quest: "WhatsApp Alerts for School Cafeterias",
    hudLabel: "CLEAR // HACKATHON · CARIBE ARENA",
    copy: "Caribe Arena: agente serverless que convierte transacciones de cafetería en alertas e insights para padres y operadores. Participación de equipo — sin premio. Lore + repo del equipo — demos S3 ya no públicas.",
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
    title: "Ledger One",
    quest: "Open Payments Under Pressure",
    hudLabel: "CLEAR // HACKATHON · 1ST PLACE",
    copy: "Hackathon Interledger: primer puesto con Ledger One. Proyecto de equipo alrededor de open payments / Interledger — pitch + camino técnico en competencia, con follow-up de build en portafolio.",
    loadout: "TypeScript · Nest/Node · Open Payments",
    unlocks: ["1st place", "Open payments", "Team product pitch"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "Hold the Box",
    quest: "Don't Drop the Box",
    hudLabel: "CLEAR // GAME JAM · 2ND · BEST DESIGN",
    copy: "Game Jam 2026 (48h): coop local 2P. Lead + deploy. 2.º lugar general y Mejor diseño. Demo viva en GitHub Pages.",
    loadout: "PlayCanvas · Vite · TypeScript · Pages",
    unlocks: ["2nd overall", "Best Design", "Lead + deploy", "Live demo"],
    accent: "#e9c46a",
    status: "CLEARED",
  },
];

const clearsEn: PlayerClear[] = [
  {
    title: "Ministry of Mines",
    quest: "Multi-Track Institutional Ops",
    hudLabel: "CLEAR // PUBLIC SECTOR · Sep 2025–present",
    copy: "Current mission across several tracks: Service Integrator (APISIX/FastAPI/Vue, VUT↔ARGO/REDAM/RUES/VUCE interoperability), SIVEEIC (unified dosimetry on Angular/Node/SQL Server), corporate Taiga (LDAP, Kanban, alerts), and stakeholder mapping (matrix — only sanitized public demo). Not just the matrix.",
    loadout: "FastAPI · APISIX · Vue · Angular · Node · SQL Server · React",
    unlocks: ["Interoperability gateway", "Energy surveillance", "DevOps docs", "Public-sector delivery"],
    accent: "#0d7377",
    status: "ONGOING",
  },
  {
    title: "Service Integrator",
    quest: "One Gateway to Hide the Wire",
    hudLabel: "CLEAR // INTEROP · ONGOING",
    copy: "HTTP facade: APISIX gateway + FastAPI/Vue admin. REST↔SOAP, token broker, credential vaulting, app RBAC. Sanitized Vercel demo (Interop Gateway) via MSW — fictional systems. Majority authorship on transversales/integrador.",
    loadout: "FastAPI · Vue · APISIX · PostgreSQL · K8s · MSW demo",
    unlocks: ["API gateway", "SOAP↔JSON", "RBAC", "Sanitized demo"],
    accent: "#1d3557",
    status: "ONGOING",
  },
  {
    title: "SIVEEIC",
    quest: "Unify the Dosimetry Ledger",
    hudLabel: "CLEAR // ENERGY SURVEILLANCE · ONGOING",
    copy: "Multi-repo energy-surveillance ecosystem. Focus: unified dosimetry — SPs + dual-write, NR/NP flags, multi-filter Consultar and reports. Sanitized Dose Ledger demo on Vercel (MSW) with fictional workers.",
    loadout: "Angular · Node · SQL Server · Docker · MSW demo",
    unlocks: ["Unified dosimetry", "Dual-write", "Sanitized demo"],
    accent: "#2a9d8f",
    status: "ONGOING",
  },
  {
    title: "Taiga MME",
    quest: "Patch the Board, Not the Process",
    hudLabel: "CLEAR // TOOLING · CLEARED",
    copy: "Customizations on dockerized Taiga 6.8: Kanban tag filter/search, due-date validation, and email alerts. Documented in the 2025–2026 update manual.",
    loadout: "Taiga · Docker · JS patches · Python notify · LDAP",
    unlocks: ["Product customization", "Kanban UX", "Due-date alerts"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    quest: "Building Tools for the Internal Map",
    hudLabel: "CLEAR // INTERNAL TOOLS · Jun–Sep 2025",
    copy: "At Guarapo Labs I supported international clients and a new product (front, back, AI). After joining, we accelerated delivery and caught up to the schedule; on the visual track I kept UI tasks current (Next + Supabase). Lore only: no client code.",
    loadout: "Next · Supabase · Internal UI · AI concepts",
    unlocks: ["Schedule catch-up", "Front ownership", "Internal tools", "Client delivery"],
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Clazz Dev",
    quest: "Fine-Tuning the Assistant Pipeline",
    hudLabel: "CLEAR // AI AUTOMATION · Feb–May 2025",
    copy: "AI automation (OpenAI, n8n, FastAPI, Python) inside real sales/ops workflows. Agent workflows that cut human ops from ~7 to ~2 people by owning the sales cycle. Lore: failed flagship and unrecalled dashboard metrics stay unpublished.",
    loadout: "OpenAI · n8n · FastAPI · Python",
    unlocks: ["7→2 ops", "Sales agent", "Automation pipelines", "API orchestration"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    quest: "Deploying the Operational Interface",
    hudLabel: "CLEAR // FREELANCE · Dec 2024–Jan 2025",
    copy: "Freelance (~2 months) before Clazz, with the same circle: operational interface (React, tables, flows) shipped to a real Vercel deploy. Freelance bridge into the startup. Client business details omitted.",
    loadout: "React · TanStack · Redux · Vercel",
    unlocks: ["Freelance ship", "Dense UI", "Client delivery"],
    accent: "#457b9d",
    status: "CLEARED",
  },
  {
    title: "I-Cluster",
    quest: "Shipping Care for Tolú",
    hudLabel: "CLEAR // HEALTH · Jun 2024–Jan 2025",
    copy: "Software for an emotional-health project in Tolú. React + Express for scalable apps, cross-functional delivery, and features that supported wellbeing initiatives. A mission where the product reached people beyond the screen.",
    loadout: "React · Express · Cross-functional",
    unlocks: ["Health tech", "Community product", "Team delivery", "Reliable shipping"],
    accent: "#2a9d8f",
    status: "CLEARED",
  },
  {
    title: "Infinity Tech Consulting",
    quest: "Fullstack Craft on AWS & Vercel",
    hudLabel: "CLEAR // AGENCY · Apr 2022–Jun 2024",
    copy: "Agency fullstack (Next/Flask/Prisma/AWS/Vercel). Core piece: Commodo — points-style loyalty still live; front across the client's 3 web platforms. POS from scratch in ~1 month (Commodo APIs + Siigo + external lookups). Early on, learned React in days to unblock a slow team project.",
    loadout: "Next.js · Flask · Prisma · Siigo · AWS · Vercel",
    unlocks: ["Commodo live", "3 web platforms", "POS in 1 month", "React ramp-up"],
    accent: "#1d3557",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    quest: "The Bridge Between ERP and Production",
    hudLabel: "CLEAR // ERP ↔ PLANT · ONGOING",
    copy: "Same employer, two chapters: early support (Nov 2021–Jan 2022) and freelance return with MIOBOX — modify/extend existing C#/.NET plus NestJS SOAP/ERP ↔ orders ↔ consumption/delivery bridge. Metric: ERP cycle ~40 min → ~2 min (−95%). Labor lore: no client IP.",
    loadout: "C# · .NET · NestJS · SOAP · REST",
    unlocks: ["40min→2min", "C#/.NET legacy", "Backend integration", "API design"],
    accent: "#264653",
    status: "ONGOING",
  },
  {
    title: "Sofin SAS · Support",
    quest: "Stabilizing the Invoice Gate",
    hudLabel: "CLEAR // OPS SUPPORT · Nov 2021–Jan 2022",
    copy: "First corporate clear: support on electronic invoicing and ERP code testing for stability. Learned that production systems are also cared for from tickets — not only from the editor. Early chapter under the same SofinSaS employer.",
    loadout: "ERP · E-invoicing · QA",
    unlocks: ["Production ops", "Support mindset", "ERP context"],
    accent: "#6f8199",
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
    hudLabel: "CLEAR // HACKATHON · BARRANQUILLIA 2026",
    copy: "BarranquillIA 2026 hackathon: voice agent connecting inventory, prescription, and patient. Expensive voice stack — portfolio ships as lore + degraded demo. Team participation — no award.",
    loadout: "Next · Vapi · Supabase · Voice stack",
    unlocks: ["Hackathon run", "Voice agents", "Team product pitch"],
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
    title: "EduNova",
    quest: "Rebuild the Learning Stack",
    hudLabel: "CLEAR // BARRANQUILLIA 2025 · SHADAI · 4TH",
    copy: "BarranquillIA 2025: award for best project using ShadAI (USA technology) and 4th place overall. Current mission: recover the full product (back + front) and stand the learning platform up again — without inventing what isn't in a repo yet.",
    loadout: "ShadAI · Fullstack · Product rebuild",
    unlocks: ["ShadAI award", "4th overall", "Product recovery"],
    accent: "#ffb020",
    status: "ONGOING",
  },
  {
    title: "BioAlert+",
    quest: "WhatsApp Alerts for School Cafeterias",
    hudLabel: "CLEAR // HACKATHON · CARIBE ARENA",
    copy: "Caribe Arena: serverless agent turning cafeteria transactions into alerts and insights for parents and operators. Team participation — no award. Lore + team repo — S3 demos no longer public.",
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
    title: "Ledger One",
    quest: "Open Payments Under Pressure",
    hudLabel: "CLEAR // HACKATHON · 1ST PLACE",
    copy: "Interledger hackathon: first place with Ledger One. Team project around open payments / Interledger — competition pitch + technical path, with portfolio follow-up build.",
    loadout: "TypeScript · Nest/Node · Open Payments",
    unlocks: ["1st place", "Open payments", "Team product pitch"],
    accent: "#6a4c93",
    status: "CLEARED",
  },
  {
    title: "Hold the Box",
    quest: "Don't Drop the Box",
    hudLabel: "CLEAR // GAME JAM · 2ND · BEST DESIGN",
    copy: "Game Jam 2026 (48h): local 2P co-op. Lead + deploy. 2nd place overall and Best Design. Live demo on GitHub Pages.",
    loadout: "PlayCanvas · Vite · TypeScript · Pages",
    unlocks: ["2nd overall", "Best Design", "Lead + deploy", "Live demo"],
    accent: "#e9c46a",
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
    homeEyebrow: "RETRO PORTFOLIO · SELECT DESTINATION",
    homeLine: "Conoce a Jose. ¿Qué quieres ver? Misiones realizadas, o información del jugador.",
    catalogPortal: {
      label: "CATALOG",
      title: "Mission board",
      live: "06 LIVE",
      hint: "Catálogo de misiones realizadas.",
      cta: "ENTER CATALOG",
    },
    playerPortal: {
      label: "PLAYER",
      title: "Dossier file",
      hint: "Historia, misiones completadas y logros del jugador.",
      cta: "LOAD DOSSIER",
      acts: "Origins · Clears · Trophies",
    },
    sysHint: "SYS · SETTINGS · ES / EN",
    acts: { origin: "ORIGINS", clears: "CLEARS", trophies: "TROPHIES" },
    dossierStatus: "PLAYER DOSSIER",
    dossierOnline: "ONLINE",
    loadoutTitle: "LOADOUT",
    loadoutExpand: "EXPANDIR",
    loadoutExpandEyebrow: "LOADOUT // FULL SCAN",
    loadoutExpandTitle: "Stack completo",
    loadoutExpandIntro:
      "Todas las skills detectadas en misiones del catálogo, con estimado de exposición y proyectos vinculados.",
    loadoutClose: "CERRAR",
    loadoutCount: "SKILLS",
    loadoutEstimateNote: "Estimado por overlap de misiones · no es un % de dominio",
    loadoutProject: "misión",
    loadoutProjects: "misiones",
    loadoutRepo: "repo",
    loadoutRepos: "repos",
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
      sub: "Idioma y colorimetría del catálogo.",
      language: "LANGUAGE",
      colorimetry: "COLORIMETRÍA",
      close: "CLOSE",
    },
    ctas: {
      catalog: { ...sharedCtas.catalog, label: "ENTER CATALOG" },
      player: { ...sharedCtas.player, label: "LOAD DOSSIER" },
      cv: { ...sharedCtas.cv },
      github: { ...sharedCtas.github },
      pro: { ...sharedCtas.pro, label: "PORTAFOLIO PRO" },
    },
    avatar: sharedAvatar,
  },
  en: {
    name: "José Gabriel Maza Mendoza",
    classTitle: "Fullstack Product Engineer",
    classSub: "Problem → UI → API → Deploy",
    tagline: "Build useful things. Keep exploring.",
    identityLine: "Code is part of the build. Not the whole player.",
    homeEyebrow: "RETRO PORTFOLIO · SELECT DESTINATION",
    homeLine: "Meet Jose. What do you want to see? Missions cleared, or player dossier.",
    catalogPortal: {
      label: "CATALOG",
      title: "Mission board",
      live: "06 LIVE",
      hint: "Catalog of missions cleared.",
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
    loadoutExpand: "EXPAND",
    loadoutExpandEyebrow: "LOADOUT // FULL SCAN",
    loadoutExpandTitle: "Full stack map",
    loadoutExpandIntro:
      "Every skill detected across catalog missions, with estimated exposure and linked projects.",
    loadoutClose: "CLOSE",
    loadoutCount: "SKILLS",
    loadoutEstimateNote: "Estimated from mission overlap · not a mastery %",
    loadoutProject: "mission",
    loadoutProjects: "missions",
    loadoutRepo: "repo",
    loadoutRepos: "repos",
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
      sub: "Catalog language and colorimetry.",
      language: "LANGUAGE",
      colorimetry: "COLORIMETRY",
      close: "CLOSE",
    },
    ctas: {
      catalog: { ...sharedCtas.catalog },
      player: { ...sharedCtas.player },
      cv: { ...sharedCtas.cv },
      github: { ...sharedCtas.github },
      pro: { ...sharedCtas.pro },
    },
    avatar: sharedAvatar,
  },
};

/** @deprecated use playerByLocale + LocaleProvider */
export const player = playerByLocale.es;
