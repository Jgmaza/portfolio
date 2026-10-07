# Prompts para Pencil (fallback + diseño faltante)

Usar en el chat **con** MCP Pencil activo (canvas abierto). Si el Agent de Cursor no tiene tools, pégalos en el panel de Pencil / Agent con el `.pen` abierto.

---

## Prompt A — Verificar MCP

```text
Confirma que el MCP de Pencil está activo en este documento portfolio-game.pen.
Lista tus tools disponibles. Luego TakeScreenshot del componente reusable "Build card" (id buildCard) y descríbelo brevemente.
```

---

## Prompt B — Pedir frame de detalle + START (falta en el mock)

```text
En portfolio-game.pen, crea un frame desktop 1440×1024 llamado:

"06 PROJECT DETAIL — Quest + START"

Debe ser coherente con el sistema HUD / Build Catalog (mismas variables de color, Chakra Petch + Sora, accent #3dff9a, hud #5ec8ff).

Layout:
- HUD Header (ref hudHeader) arriba + signal bar
- Columna izquierda: eyebrow categoría+año+rarity, título del proyecto, tagline, summary, CTAs
- CTA primario: botón "START" (fill accent, texto onAccent) — representa launch demo
- CTA secundario: "SOURCE" (panel + stroke line)
- Link texto "← BACK TO CATALOG"
- Columna derecha: preview cartridge (mismo lenguaje visual que buildCard preview: notches, chrome fake, label del proyecto, badges LEGENDARY/LIVE) — SIN imagen externa
- Debajo o en sheets: secciones QUEST, LOADOUT DECISIONS, CLEAR + aside Role/Stack

Usa como ejemplo de contenido el proyecto "Stakeholder Matrix" (accent #0d7377, stack React/FastAPI/TypeScript/MSW).

Haz el frame reusable-friendly: labels claros para que luego se traduzca a /projects/[slug] en Next.js.
Cuando termines: TakeScreenshot del frame completo.
```

---

## Prompt C — Export code gate (después de diseñar)

```text
Siguiendo pen-dev guide/code.md: extrae SOLO el componente reusable buildCard con Print(Get("buildCard", {depth:5})) y TakeScreenshot.
No implementes toda la home. Devuelve estructura + medidas clave (padding, radius, fontSizes, fills) para portar a React/Tailwind en el repo portfolio.
```

---

## Prompt D — Si Cursor Agent no ve el MCP

Pega esto en un **chat nuevo** de Cursor Agent (con `.pen` abierto):

```text
Gate check build-catalog-pen:
1) Abre/usa portfolio-game.pen vía MCP Pencil.
2) Si no tienes tools de Pencil, deten te y dime exactamente qué ves en Customize → MCPs para extension-pencil.
3) Si sí tienes tools: TakeScreenshot de buildCard y no toques código todavía.
```

---

## Prompt E — Rediseño 07 PLAYER → tablet dossier (decisiones locked)

Decisiones del usuario:
1. Avatar fijo siempre (opción A)
2. Skills solo en columna fija (sin tab SKILLS)
3. Tiers CORE · STRONG · FAMILIAR (no %)
4. Tabs verticales junto al avatar (izquierda)
5. Rediseñar frames existentes `07` / `07b` / `07c` (no crear frame nuevo)

```text
En portfolio-game.pen, REDISEÑA (no crees frame nuevo) los frames existentes:

- J3Jq6s  "07 PLAYER — Origin"
- dsavG   "07b PLAYER — Clears"
- EZ41A   "07c PLAYER — Trophies"

Objetivo: ficha de personaje tipo TABLET TECNOLÓGICA / expediente HUD, coherente con Build Catalog.

TOKENS (usar variables del doc, no inventar paleta):
- bg #0b1220, elevated #121a2b, panel #162033
- ink #e8eef8, inkSoft #a8b6cc, muted #6f8199
- accent #3dff9a, hud #5ec8ff, legendary #ffb020, onAccent #04110a
- Tipografía: Chakra Petch (HUD / labels) + Sora (body), como el resto del .pen

CONSTRAINTS:
- Desktop 1440×1024 cada frame
- Mantén instancia de hudHeader arriba + signal bar (mismo patrón que otros frames)
- NO cards flotantes, NO badges encima del avatar, NO glow purple, NO pills redondeadas excesivas
- Un bisel de tablet + un glow sutil máximo — no overbuild
- Labels claros para portar luego a /player en Next.js

LAYOUT INTERIOR (pantalla de la tablet, bajo el HUD):

┌─ TABLET BEZEL (centrada, ~1280–1360 wide, radius suave, stroke hud/line) ─┐
│ status bar: PLAYER DOSSIER · JM-0030 · LVL 30 · ONLINE                     │
│ ┌─ FIXED COL (~300px) ─┐ ┌─ TABS ─┐ ┌─ CONTENT PANEL (fill) ────────────┐ │
│ │ Avatar 360 slot      │ │ORIGINS │ │ (cambia por frame)                │ │
│ │ (círculo / frame CRT │ │CLEARS  │ │                                   │ │
│ │ placeholder portrait)│ │TROPHIES│ │                                   │ │
│ │ JOSE MAZA            │ └────────┘ │                                   │ │
│ │ LVL 30 · FULLSTACK   │            │                                   │ │
│ │ ID JM-0030           │            │                                   │ │
│ │ ── LOADOUT ──        │            │                                   │ │
│ │ skill bars (tiers)   │            │                                   │ │
│ └──────────────────────┘            └───────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘

COLUMNA FIJA (idéntica en Origin / Clears / Trophies — copiar layout):
- Avatar siempre visible (slot ~220–260px). Placeholder: iniciales JM o portrait; label "360 TURNTABLE"
- Meta: nombre, LVL 30, class "Fullstack Product Engineer", agent ID JM-0030
- Skill bars debajo (siempre visibles). Máx 7. Sin porcentajes.
  Usar ticks 1–5 + label de tier:

  Next / React     █████  CORE
  TypeScript       █████  CORE
  NestJS           ████░  STRONG
  FastAPI          ███░░  STRONG
  Supabase         ███░░  STRONG
  Vercel           ███░░  STRONG
  AI / Agents      ██░░░  FAMILIAR

  Track = panel/line; fill = accent. Gap compacto. Título sección: LOADOUT

TABS VERTICALES (junto al avatar, izquierda del content):
- Estilo file-tab / expediente, no wizard
- ORIGINS | CLEARS | TROPHIES (sin tab SKILLS)
- Activo: fill accent + texto onAccent
- Inactivo: panel + stroke line + inkSoft
- En cada frame marca activo el tab correspondiente

CONTENT PANEL por frame:

A) 07 Origin (activo ORIGINS):
- Eyebrow: ACT 01 · ORIGINS
- Quote corta del dossier
- 2–3 párrafos (usa copy real del sitio si la conoces; si no, slots claros ORIGIN_P1/P2/P3)
- Bloque LOADOUT PERSONAL + lista inventory chips (stroke, no pills gordas)
- CTAs: DESCARGAR CV (accent fill) + GITHUB (panel stroke)
- Link next: → CLEARS

B) 07b Clears (activo CLEARS):
- Eyebrow ACT 02 · CLEARS + intro corta
- Lista de 3–4 clear rows (título quest, status CLEARED/ONGOING, loadout, 1 línea copy)
- Link → TROPHIES

C) 07c Trophies (activo TROPHIES):
- Eyebrow ACT 03 · TROPHIES + intro
- Grid 2×2 o lista de trophy marks (title, category, stat, detail corto)
- Link ← ORIGINS / back

ANIMACIÓN (solo anotar en noteSystem o labels; no simular motion en Pencil):
1. Tab switch: panel fade 120–200ms
2. Skill bars: fill on mount, stagger 40–60ms
3. Soft tablet idle glow (el 360 ya es motion fuerte)

AL TERMINAR:
1) TakeScreenshot de J3Jq6s, dsavG, EZ41A
2) Print estructura depth 2 de la columna fija + tabs + content
3) No toques código Next.js
```
