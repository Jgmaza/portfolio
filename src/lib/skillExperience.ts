import { playerSkills, type Locale, type SkillTier } from "@/content/player";
import { projects } from "@/content/projects";

const ALIASES: Record<string, string> = {
  "Supabase Auth": "Supabase",
  "Nest/Node": "NestJS",
  "Node/Express": "Node.js",
  "Vue 3": "Vue",
  "AI concepts": "AI / Agents",
  Tailwind: "Tailwind CSS",
  OpenAI: "AI / Agents",
  Claude: "AI / Agents",
  Vapi: "AI / Agents",
  "TanStack Table": "TanStack",
  "TanStack Query": "TanStack",
  "React Query": "TanStack",
  "TanStack Router": "TanStack",
  "TanStack Form": "TanStack",
  "AWS Lambda": "AWS",
  Amplify: "AWS",
  "AWS Amplify": "AWS",
  DynamoDB: "AWS",
  Serverless: "AWS",
  S3: "AWS",
};

const SKIP = new Set([
  // roles / product fluff
  "Fullstack",
  "Product rebuild",
  "APIs",
  "Commodo",
  "E-invoicing",
  "Clean Architecture",
  "MSW",
  "Cross-functional",
  "QA",
  "Internal UI",
  "JS patches",
  "Python notify",
  "LDAP",
  "Balances",
  "Voice stack",
  "WhatsApp",
  "Pages",
  "Motion",
  "OCR",
  "Spotify",
  "Siigo",
  "SOAP",
  "REST",
  "ERP",
  // one-off vendors / niche libs — not loadout-worthy
  "Deepgram",
  "ElevenLabs",
  "GitHub Pages",
  "Interledger",
  "Open Payments",
  "PlayCanvas",
  "MySQL",
  "ShadAI",
  "Spotify API",
]);

/**
 * Career knobs — Next.js has been the default product choice since Infinity
 * (Apr 2022 → present). React is used when a SPA/Vite fit makes more sense,
 * not as equal tenure to Next. AWS: Amplify/Lambda since Infinity + infra
 * calls at I-Cluster + serverless hackathons (~2.5–3y practical).
 */
const SKILL_FLOOR: Record<string, number> = {
  "Next.js": 3.5,
  TypeScript: 3.5,
  AWS: 2.5,
  React: 2,
};

const SKILL_WEIGHT: Record<string, number> = {
  "Next.js": 1.15,
  TypeScript: 1.05,
  React: 0.75,
};

const SKILL_CAP: Record<string, number> = {
  "Next.js": 4,
  AWS: 3,
};

const MAX_YEARS = 6;

export type SkillProjectRef = {
  slug: string;
  title: string;
  year: string;
  featured: boolean;
  hasRepo: boolean;
};

export type SkillExperience = {
  label: string;
  projectCount: number;
  repoCount: number;
  estimatedYears: number;
  yearSpan: string;
  tier: SkillTier;
  ticks: 1 | 2 | 3 | 4 | 5;
  projects: SkillProjectRef[];
};

function canonicalize(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || SKIP.has(trimmed)) return null;
  return ALIASES[trimmed] ?? trimmed;
}

function yearsFromText(text: string): number[] {
  const matches = text.match(/\d{4}/g);
  if (!matches) return [];
  return matches.map(Number).filter((y) => y >= 2018 && y <= 2030);
}

function estimateYears(opts: {
  years: number[];
  projectCount: number;
  featuredCount: number;
}): number {
  const { years, projectCount, featuredCount } = opts;
  const unique = [...new Set(years)].sort((a, b) => a - b);
  const span =
    unique.length >= 2
      ? unique[unique.length - 1] - unique[0] + 1
      : unique.length === 1
        ? 1
        : 0;

  const weighted =
    span * 0.55 + projectCount * 0.4 + featuredCount * 0.25;
  const rounded =
    Math.round(
      Math.max(weighted, projectCount > 0 ? 0.5 : 0) * 2,
    ) / 2;
  return Math.min(MAX_YEARS, Math.max(0.5, rounded));
}

function finalizeYears(label: string, raw: number): number {
  const weighted = raw * (SKILL_WEIGHT[label] ?? 1);
  const floored = Math.max(weighted, SKILL_FLOOR[label] ?? 0);
  const cap = SKILL_CAP[label] ?? MAX_YEARS;
  return Math.min(cap, MAX_YEARS, Math.round(floored * 2) / 2);
}

function tierFromScore(score: number, profileTier?: SkillTier): SkillTier {
  if (profileTier) return profileTier;
  if (score >= 4.2) return "CORE";
  if (score >= 2.2) return "STRONG";
  return "FAMILIAR";
}

function ticksFromYears(
  years: number,
  profileTicks?: 1 | 2 | 3 | 4 | 5,
): 1 | 2 | 3 | 4 | 5 {
  if (profileTicks) return profileTicks;
  if (years >= 4) return 5;
  if (years >= 3) return 4;
  if (years >= 2) return 3;
  if (years >= 1) return 2;
  return 1;
}

export function buildSkillExperience(): SkillExperience[] {
  type Acc = {
    projects: Map<string, SkillProjectRef>;
    years: number[];
  };

  const map = new Map<string, Acc>();

  const touch = (raw: string, mutate: (acc: Acc) => void) => {
    const key = canonicalize(raw);
    if (!key) return;
    let acc = map.get(key);
    if (!acc) {
      acc = { projects: new Map(), years: [] };
      map.set(key, acc);
    }
    mutate(acc);
  };

  for (const p of projects) {
    const years = yearsFromText(p.year);
    const keys = p.stack
      .map((s) => canonicalize(s))
      .filter((k): k is string => Boolean(k));
    const hasNext = keys.includes("Next.js");
    for (const key of keys) {
      // React under a Next app is the runtime — credit Next, not twin React tenure
      if (hasNext && key === "React") continue;
      touch(key, (acc) => {
        acc.projects.set(p.slug, {
          slug: p.slug,
          title: p.title,
          year: p.year,
          featured: p.featured,
          hasRepo: Boolean(p.repoUrl),
        });
        acc.years.push(...years);
      });
    }
  }

  // Ensure Next always appears even if a catalog miss-tags stacks
  if (!map.has("Next.js")) {
    map.set("Next.js", { projects: new Map(), years: [2022, 2026] });
  } else {
    map.get("Next.js")!.years.push(2022, 2026);
  }

  // AWS tenure: Infinity (Amplify/Lambda) → I-Cluster infra → hackathon serverless
  if (!map.has("AWS")) {
    map.set("AWS", { projects: new Map(), years: [2022, 2026] });
  } else {
    map.get("AWS")!.years.push(2022, 2026);
  }

  const profileByLabel = new Map(playerSkills.map((s) => [s.label, s]));

  const rows: SkillExperience[] = [...map.entries()].map(([label, acc]) => {
    const projectList = [...acc.projects.values()].sort((a, b) =>
      b.featured === a.featured
        ? a.title.localeCompare(b.title)
        : Number(b.featured) - Number(a.featured),
    );
    const featuredCount = projectList.filter((p) => p.featured).length;
    const yearList = [...new Set(acc.years)].sort((a, b) => a - b);
    const estimatedYears = finalizeYears(
      label,
      estimateYears({
        years: yearList,
        projectCount: projectList.length,
        featuredCount,
      }),
    );
    const profile = profileByLabel.get(label);
    const yearSpan =
      (label === "Next.js" || label === "AWS") && yearList.length > 0
        ? `${Math.min(...yearList, 2022)}–${Math.max(...yearList, 2026)}`
        : yearList.length >= 2
          ? `${yearList[0]}–${yearList[yearList.length - 1]}`
          : yearList.length === 1
            ? String(yearList[0])
            : "—";

    return {
      label,
      projectCount: projectList.length,
      repoCount: projectList.filter((p) => p.hasRepo).length,
      estimatedYears,
      yearSpan,
      tier: tierFromScore(
        estimatedYears + projectList.length * 0.25,
        profile?.tier,
      ),
      ticks: ticksFromYears(estimatedYears, profile?.ticks),
      projects: projectList,
    };
  });

  return rows.sort(
    (a, b) =>
      b.estimatedYears - a.estimatedYears ||
      b.projectCount - a.projectCount ||
      a.label.localeCompare(b.label),
  );
}

export function formatEstimatedYears(years: number, locale: Locale): string {
  const n = years % 1 === 0 ? String(years) : years.toFixed(1);
  if (locale === "es") {
    return years === 1 ? `~${n} año` : `~${n} años`;
  }
  return years === 1 ? `~${n} yr` : `~${n} yrs`;
}
