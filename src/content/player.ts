/** Player dossier — Build Catalog HUD */

export type Locale = "es" | "en";

export type PlayerClear = {
  title: string;
  copy: string;
  accent: string;
  status: "CLEARED";
};

export type PlayerTrophy = {
  id: string;
  title: string;
  stat: string;
  detail: string;
  mark: string;
};

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
  originEyebrow: string;
  originP1: string;
  originP2: string;
  originNext: string;
  clearsEyebrow: string;
  clearsTitle: string;
  clearsNext: string;
  trophiesEyebrow: string;
  trophiesTitle: string;
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
  photo: null as string | null,
};

const clearsEs: PlayerClear[] = [
  {
    title: "Sector público / energía",
    copy: "Interoperabilidad y stakeholders en operación institucional.",
    accent: "#0d7377",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    copy: "Puente NestJS ERP ↔ planta y procesos de producción.",
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    copy: "Tools internas Next + Supabase para operación.",
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    copy: "UI operativa freelance desplegada en Vercel.",
    accent: "#457b9d",
    status: "CLEARED",
  },
];

const clearsEn: PlayerClear[] = [
  {
    title: "Public sector / energy",
    copy: "Interoperability and stakeholders in institutional operations.",
    accent: "#0d7377",
    status: "CLEARED",
  },
  {
    title: "SofinSaS / MIOBOX",
    copy: "NestJS bridge ERP ↔ plant and production workflows.",
    accent: "#264653",
    status: "CLEARED",
  },
  {
    title: "Guarapo / Cata",
    copy: "Internal tools with Next + Supabase for operations.",
    accent: "#e85d04",
    status: "CLEARED",
  },
  {
    title: "Hermes",
    copy: "Freelance ops UI shipped on Vercel.",
    accent: "#457b9d",
    status: "CLEARED",
  },
];

export const playerByLocale: Record<Locale, PlayerCopy> = {
  es: {
    name: "José Gabriel Maza Mendoza",
    classTitle: "Fullstack Product Engineer",
    classSub: "Problem Solver · UI / API / Deploy",
    tagline: "From problem to deployed product.",
    identityLine: "Code is part of the build. Not the whole player.",
    homeEyebrow: "BUILD CATALOG · SELECT DESTINATION",
    homeLine: "Elige un camino. Builds para tocar, o el dossier del player.",
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
      hint: "Trasfondo, misiones cleared y trofeos personales.",
      cta: "LOAD DOSSIER",
      acts: "Origin · Clears · Trophies",
    },
    sysHint: "SYS · SETTINGS · ES / EN",
    acts: { origin: "ORIGIN", clears: "CLEARS", trophies: "TROPHIES" },
    originEyebrow: "ORIGIN · PLAYER LORE",
    originP1:
      "Cierro el ciclo completo: entender el problema, diseñar la UI, construir la API y llevar el producto a producción. El código es parte del build — no el jugador entero.",
    originP2:
      "He recorrido sector público y energía, puentes ERP↔planta, tools internas y freelance. Este dossier cuenta el trasfondo; el catálogo muestra lo que se puede tocar.",
    originNext: "→ CLEARS · misiones ya completadas",
    clearsEyebrow: "MISSION CLEARS · EXPERIENCE LOG",
    clearsTitle: "Misiones ya completadas",
    clearsNext: "→ TROPHIES · logros personales",
    trophiesEyebrow: "TROPHY CASE · PERSONAL LOADOUT",
    trophiesTitle: "Logros fuera del build",
    trophiesBack: "← ORIGIN · volver al trasfondo",
    clears: clearsEs,
    trophies: [
      {
        id: "chess",
        title: "CHESS",
        stat: "~1800 ELO",
        detail: "Strategy · Patience · Ranked play",
        mark: "CH",
      },
      {
        id: "percussion",
        title: "PERCUSSION",
        stat: "MULTI-KIT",
        detail: "Batería · Congas · Bongós",
        mark: "PR",
      },
      {
        id: "gym",
        title: "GYM",
        stat: "5 YEARS",
        detail: "Training · Progression · Consistency",
        mark: "GY",
      },
    ],
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
    classSub: "Problem Solver · UI / API / Deploy",
    tagline: "From problem to deployed product.",
    identityLine: "Code is part of the build. Not the whole player.",
    homeEyebrow: "BUILD CATALOG · SELECT DESTINATION",
    homeLine: "Pick a path. Builds you can touch, or the player dossier.",
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
      hint: "Origin story, cleared missions, and personal trophies.",
      cta: "LOAD DOSSIER",
      acts: "Origin · Clears · Trophies",
    },
    sysHint: "SYS · SETTINGS · ES / EN",
    acts: { origin: "ORIGIN", clears: "CLEARS", trophies: "TROPHIES" },
    originEyebrow: "ORIGIN · PLAYER LORE",
    originP1:
      "I close the full loop: understand the problem, design the UI, build the API, and ship to production. Code is part of the build — not the whole player.",
    originP2:
      "I've worked public sector and energy, ERP↔plant bridges, internal tools, and freelance. This dossier is the lore; the catalog is what you can touch.",
    originNext: "→ CLEARS · missions already completed",
    clearsEyebrow: "MISSION CLEARS · EXPERIENCE LOG",
    clearsTitle: "Missions already cleared",
    clearsNext: "→ TROPHIES · personal achievements",
    trophiesEyebrow: "TROPHY CASE · PERSONAL LOADOUT",
    trophiesTitle: "Achievements outside the build",
    trophiesBack: "← ORIGIN · back to lore",
    clears: clearsEn,
    trophies: [
      {
        id: "chess",
        title: "CHESS",
        stat: "~1800 ELO",
        detail: "Strategy · Patience · Ranked play",
        mark: "CH",
      },
      {
        id: "percussion",
        title: "PERCUSSION",
        stat: "MULTI-KIT",
        detail: "Drums · Congas · Bongos",
        mark: "PR",
      },
      {
        id: "gym",
        title: "GYM",
        stat: "5 YEARS",
        detail: "Training · Progression · Consistency",
        mark: "GY",
      },
    ],
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
