# Inventario y clasificación de proyectos

Documento de trabajo para priorizar demos, sanitización, lore-only y migración a un **Supabase unificado** (auth compartido). Revisar y responder las preguntas del final antes de implementar.

Última actualización: 2026-10-07  
Fuente: workspace `Propios/`, `portfolio/src/content/projects.ts`, Vercel (`jose-mazas-projects`), Supabase Management API.

---

## Leyenda

| Código | Significado |
|--------|-------------|
| **PROPIO** | Tuyos, sin NDA de empresa |
| **EMPRESA** | Trabajo / cliente (código o datos sensibles) |
| **HACK** | Hackathon / equipo |
| **DEMO_OK** | Se puede mostrar en vivo (ya o fácil) |
| **SANITIZE** | Clonar + limpiar datos/nombres/IP → demo pública |
| **LORE** | Solo narración en portafolio (sin repo/demo real) |
| **DB_UNIFY** | Candidato a schema en el Supabase unificado (auth compartido) |

### Estado Supabase (al inventariar)

| Proyecto | Ref | Status |
|----------|-----|--------|
| Mussistant | `crejfguldfbjwztmctwt` | ACTIVE_HEALTHY |
| SplitIA | `bzdbgmzxxgeubguhbdjs` | INACTIVE |
| turnos-agent | `exmfigfxzqpibrvensak` | INACTIVE |
| mazamendoza123@gmail.com's Project | `subyeogtbicmhkkmkmbz` | INACTIVE |

---

## A. Ya en portafolio (`projects.ts`)

| Proyecto | Origen | Qué hacer | Vercel | Supabase | Prioridad sugerida |
|----------|--------|-----------|--------|----------|--------------------|
| **Mussistant** | PROPIO | DEMO_OK + ya en DB (referencia del hub) | Live (`mussistant.vercel.app`) | Active | — (hecho) |
| **Splitia** | PROPIO | DEMO_OK + **DB_UNIFY** (revive + migra schema) | Live (`splitia-xi.vercel.app`) | Inactive | **P0** |
| **Stakeholder Matrix** | EMPRESA (sector público/energía) | DEMO_OK sanitizado (MSW, ya) | Live | No DB real | P1 — mantener |
| **VerificaCol** | PROPIO / AI | DEMO_OK | Live | ¿sin SB propio? | P1 |
| **Rhythm Elegance** | PROPIO | DEMO_OK (landing, sin auth) | Live | No | P3 |
| **BioAlert+** | HACK | DEMO_OK parcial / SANITIZE demos | No en tu Vercel | No | P2 |
| **MediAgent** (`turnos-agent`) | HACK | SANITIZE + **DB_UNIFY** + Vercel | No | Inactive | **P0** |
| **Hermes** | EMPRESA (freelance) | DEMO_OK limitado / LORE ampliado | Live (viejo) | No | P2 — permiso cliente |
| **MIOBOX Bridge** | EMPRESA (SofinSaS) | **LORE** definitivo | — | — | — |
| **Interledger Agent** | PROPIO / exploratorio | SANITIZE + demo o LORE corto | No | Refs locales | P2 |

---

## B. En disco, poco o nada en portafolio

| Carpeta | Origen probable | Clasificación | Notas | Prioridad |
|---------|-----------------|---------------|-------|-----------|
| **portfolio** | PROPIO | DEMO_OK | El hub de presentación; no va a SB unificado como “app de producto” | Mantener |
| **LifeOS** | PROPIO | LORE / docs | Docs + prompts, no app shippable | P3 |
| **EdunovaBack** | EMPRESA? / propio educativo | LORE o SANITIZE backend | FastAPI; revisar NDA | P2 |
| **API-Agent-Marketplace-Interledger** | PROPIO | SANITIZE + posible demo | Relacionado a Interledger | P2 |
| **Interledger/openpayment-master** | Upstream / estudio | LORE / no publicar como tuyo | Código ajeno | — |
| **spotify-mcp** | PROPIO | LORE técnico / tool | MCP, no landing de producto | P3 |
| **vault-accounts** | PROPIO? | LORE / privado | Credenciales — **no** portafolio | — |
| **pdf_ages_extractor** | PROPIO / util | LORE o mini demo | Python util | P3 |
| **pruebaDani** | Prueba / freelance? | Revisar NDA → LORE o SANITIZE | En Vercel | P2 |
| **Prueba tecnica Naowee** | Prueba técnica | LORE / no priorizar | PDF + repo | — |
| **Taller AWS CUC** | Educativo | LORE | Keys en carpeta — no publicar | — |

---

## C. Empresa (clears del dossier) → destino en catálogo

| Empresa / clear | Proyecto en catálogo | Destino |
|-----------------|----------------------|---------|
| Sector público / energía | Stakeholder Matrix | Ya sanitizado (DEMO_OK) |
| SofinSaS / MIOBOX | MIOBOX Bridge | **LORE only** |
| Guarapo / Cata | *(no hay demo pública aún)* | **SANITIZE** si hay permiso → clonar tools internas; si no → LORE |
| Hermes (freelance) | Hermes | Demo con disclaimer **o** LORE más fuerte |

---

## D. Candidatos a la base unificada (auth único)

Orden propuesto de migración a un solo proyecto Supabase (schemas tipo `mussistant`, `splitia`, `mediagent`, …):

1. **Mussistant** — ya vive ahí (o será el seed del hub)
2. **Splitia** — revive + migra tablas
3. **MediAgent / turnos-agent** — revive + sanitiza + Vercel
4. **VerificaCol** — si usa auth/persistencia
5. **Guarapo/Cata clone** — solo si sanitizas algo con auth

**No unificar:** Rhythm (estático), Stakeholder (mocks), portfolio, vault, talleres, código con NDA sin sanitizar.

---

## E. Prioridad de trabajo (propuesta)

### P0 — hub + demos que usen auth compartido

1. Diseñar proyecto Supabase “hub” (schemas + RLS + auth)
2. Splitia → unificar + Vercel OK
3. MediAgent → sanitize + unificar + deploy

### P1 — portafolio fuerte sin tocar DB

4. VerificaCol estable
5. Stakeholder Matrix (ya OK)
6. Alinear disclaimers / links en `projects.ts`

### P2 — sanitizar o lorear con criterio

7. BioAlert demos
8. Interledger / Agent Marketplace
9. Hermes (permiso)
10. EdunovaBack / pruebaDani (decidir NDA)

### P3 — baja

Rhythm polish, LifeOS docs, spotify-mcp, pdf extractor

### Fuera

vault-accounts, taller AWS keys, openpayment upstream, MIOBOX código real

---

## F. Vercel (referencia)

Proyectos relevantes bajo `jose-mazas-projects`:

| Project Name | Production URL |
|--------------|----------------|
| mussistant | https://mussistant.vercel.app |
| portfolio | https://portfolio-nine-sand-57.vercel.app |
| verificacol | https://verificacol.vercel.app |
| splitia | https://splitia-xi.vercel.app |
| rhythm-elegance | https://rhythm-elegance.vercel.app |
| stakeholder-matrix-demo | https://stakeholder-matrix-demo.vercel.app |
| hermes | https://hermes-jose-mazas-projects.vercel.app |

---

## G. Preguntas abiertas (responder antes de implementar)

1. **Guarapo/Cata**: ¿hay algo clonable a demo o solo lore?
2. **Hermes**: ¿podemos dejar la demo o hay que bajarla a lore?
3. **EdunovaBack / pruebaDani**: ¿propios o cliente?
4. **Hub Supabase**: ¿creamos un proyecto nuevo `jgmaza-hub` o usamos el de Mussistant como base?
5. ¿Confirmas **P0 = Splitia + MediAgent** después del hub, o prefieres otra pareja?

Cuando estén respondidas, el siguiente paso es el plan técnico del schema unificado + checklist de migración proyecto por proyecto.

---

## H. Relacionado

- Mussistant — acceso público Spotify: `../Mussistant/docs/SPOTIFY_ACCESO_PUBLICO.md` (ruta relativa desde workspace Propios)
- Catálogo en código: `src/content/projects.ts`
- Dossier / clears laborales: `src/content/player.ts`
