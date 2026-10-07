---
name: build-catalog-pen
description: >-
  Translates the Build Catalog portfolio from portfolio-game.pen into Next.js
  frame-by-frame with Pencil MCP fidelity (TakeScreenshot loop). Use when the
  user mentions Pencil, .pen, build-catalog-pen, pen-dev code export, mission
  board UI, or pixel-faithful portfolio implementation.
---

# Build Catalog · Pencil → Next.js

Project skill for José Maza's portfolio. Complements the extension skill
`pen-dev` (bundled with Pencil). Prefer this skill for **code implementation**;
prefer `pen-dev` for **canvas design** edits.

## Prerequisites (hard gate)

Before writing UI code from the `.pen`:

1. Read [mcp-setup.md](mcp-setup.md) and confirm Pencil MCP reports **N tools > 0**.
2. Confirm `portfolio-game.pen` is open in the Pencil canvas (not just in the file tree).
3. If MCP is unavailable, stop coding approximations. Use prompts in [pencil-prompts.md](pencil-prompts.md) instead, then retry.

## Official references (read when needed)

Extension path (version may differ):

`~/.cursor/extensions/highagency.pencildev-*/out/skills/pen-dev/`

| Need | File |
| --- | --- |
| Design on canvas | `SKILL.md`, `execute.md` |
| Schema | `pen-schema.md` |
| **Code export** | `guide/code.md` |
| Tailwind mapping | `guide/tailwind.md` |

## Stack lock (this repo)

- Next.js App Router + React + TypeScript
- Tailwind v4 + CSS variables in `src/app/globals.css`
- Content: `src/content/projects.ts`
- Design source: `portfolio-game.pen`
- Dev: `npm run dev` (often `http://localhost:3001` if 3000 is taken)

Update existing components; do not invent parallel design systems.

## Route ↔ mock map

See [frames-and-routes.md](frames-and-routes.md). Summary:

| Route | Pencil frame(s) | Job |
| --- | --- | --- |
| `/` | `01 HOME`, `02 Featured` | Player select + mission board + legendary cards |
| `/about` | `03 ABOUT` | Player profile / lore |
| `/projects` | `04 PROJECTS` | Full inventory + filters |
| `/projects/[slug]` | *(ask Pencil to add if missing)* | Quest detail + **START / LAUNCH DEMO** |

## Implementation order (never all at once)

Copy and tick in the chat:

```
Build Catalog fidelity:
- [ ] Gate: Pencil MCP tools > 0
- [ ] A. Tokens / globals from .pen variables
- [ ] B. Reusable: Build card (buildCard)
- [ ] C. Reusable: Dense card (denseCard)
- [ ] D. Reusable: Mission slot (missionSlot)
- [ ] E. Reusable: Stat cell + HUD header
- [ ] F. Frame: HOME hero + mission board
- [ ] G. Frame: Featured drops
- [ ] H. Frame: ABOUT
- [ ] I. Frame: PROJECTS inventory
- [ ] J. Frame: PROJECT DETAIL (+ START CTA) — design in Pencil first if missing
- [ ] K. Mobile home pass
```

### Per-component loop (from pen-dev `guide/code.md`)

1. Extract one reusable with Pencil MCP `execute` → `Print(Get(id, {depth: 5}))`.
2. Implement / update one React component.
3. `TakeScreenshot` on the design instance; compare to localhost.
4. Fix diffs (spacing, radius, type, colors) until match is acceptable.
5. Only then move to the next checklist item.

Rules:

- Match labels, gaps, radii, and fonts from the design — do not “improve” copy.
- No screenshot PNGs in cards unless the `.pen` uses image fills; prefer cartridge chrome.
- Dead demos (e.g. missing S3) → `LORE` + repo, never a broken LIVE link.
- One PR/commit-sized chunk per frame when possible.

## When user says “continue”

Resume from the first unchecked item. Re-open `.pen`, re-check MCP tools count, re-read the target node (canvas may have changed).

## Anti-patterns

- Parsing `.pen` with ad-hoc scripts instead of MCP when tools are available
- Implementing the whole site in one pass
- Approximate Tailwind “vibes” without screenshot comparison
- Creating new markdown docs mid-implementation (except updating this skill’s progress notes if asked)
