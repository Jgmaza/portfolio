export const THEME_IDS = ["arcade", "amber", "ice", "rose"] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export function isThemeId(value: string | null): value is ThemeId {
  return THEME_IDS.includes(value as ThemeId);
}

/** Compact dual-tone chips: accent + its negative (on-accent / panel dark). */
export const THEME_SWATCHES: Record<
  ThemeId,
  { accent: string; negative: string; label: { es: string; en: string } }
> = {
  arcade: {
    accent: "#3dff9a",
    negative: "#04110a",
    label: { es: "Arcade", en: "Arcade" },
  },
  amber: {
    accent: "#ffb020",
    negative: "#1a1004",
    label: { es: "Ámbar", en: "Amber" },
  },
  ice: {
    accent: "#5ec8ff",
    negative: "#041018",
    label: { es: "Hielo", en: "Ice" },
  },
  rose: {
    accent: "#ff5d7a",
    negative: "#1a040a",
    label: { es: "Rosa", en: "Rose" },
  },
};
