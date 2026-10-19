# Inventario y clasificación de proyectos

Documento de trabajo para priorizar demos, sanitización, lore-only y migración a **jgmaza-hub** (Supabase unificado, auth compartido).

Última actualización: 2026-10-07 (respuestas del owner)  
Fuente: workspace `Propios/`, otros roots (`Guarapo/`, `SofinSaS/`, `Freelance/`), portafolio, Vercel, Supabase.

---

## Decisiones cerradas (2026-10-07)

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | Guarapo / Cata | **Sin acceso.** Solo **LORE** en dossier. No sanitizar ni clonar. |
| 2 | Hermes | **Sí demo**, pero hay que reconstruir/completar **backend de validación** y flujos. |
| 3a | Edunova | **Recuperar producto completo** (back + front). Front: buscar / pedir acceso a org `appEdunova`. |
| 3b | pruebaDani | Es **VerificaCol** (carpeta mal nombrada). Ya está en catálogo como verificacol. |
| 4 | Hub Supabase | Crear proyecto nuevo **`jgmaza-hub`**, migrar Mussistant, apuntar app a hub, **pausar** proyecto viejo. |
| 5a | Splitia | **Terminar producto** (no solo migrar): core tipo Splitwise + bot gastos diarios (agente correos) + arreglar errores lógicos de DB. |
| 5b | MediAgent | **Principal en portafolio** (mejor hackathon). Stack caro (Vapi/Deepgram/ElevenLabs). Definir versión “mía” sin depender de todo el stack pago — ver sección MediAgent. |
| PD | Empresas faltantes | Añadir clears: **Infinity Tech**, **Clazz Dev**, **iCluster**. |

---

## Leyenda

| Código | Significado |
|--------|-------------|
| **PROPIO** | Tuyos |
| **EMPRESA** | Trabajo / cliente |
| **HACK** | Hackathon |
| **DEMO_OK** | Demo viva o casi |
| **SANITIZE** | Clonar + limpiar → demo |
| **LORE** | Solo narración |
| **BUILD** | Hay que terminar / reconstruir |
| **DB_UNIFY** | Schema en `jgmaza-hub` |

### Estado Supabase

| Proyecto | Ref | Status |
|----------|-----|--------|
| **jgmaza-hub** | `pnzkrbdlrtukthyrvdri` | **ACTIVE** — Mussistant ya vive aquí (migrado 2026-10-07) |
| Mussistant (legacy) | `crejfguldfbjwztmctwt` | **PAUSED** tras migración |
| SplitIA | `bzdbgmzxxgeubguhbdjs` | INACTIVE → consolidar en hub cuando esté el core |
| turnos-agent | `exmfigfxzqpibrvensak` | INACTIVE → schema demo en hub (sin voz paga) |
| legacy personal | `subyeogtbicmhkkmkmbz` | INACTIVE |

> Free tier: ~2 proyectos activos. Hoy: hub + Mussistant. Tras migrar Mussistant, pausar el legacy.

---

## A. Catálogo portafolio — estado actualizado

| Proyecto | Origen | Acción | Prioridad |
|----------|--------|--------|-----------|
| **Mussistant** | PROPIO | DEMO_OK + migrar a **jgmaza-hub** | **P0** (hub) |
| **Splitia** | PROPIO | **BUILD** core Splitwise + agente correos + DB_UNIFY | **P0** (producto) |
| **MediAgent** | HACK | **DEMO_OK lore + demo degradada** (ver plan) | **P0** (vitrina) |
| **Edunova** | PROPIO/startup | **BUILD** producto completo back+front | **P0/P1** |
| **VerificaCol** (`pruebaDani/`) | PROPIO | DEMO_OK — ya es este producto | P1 |
| **Stakeholder Matrix** | EMPRESA (sector público) | DEMO_OK sanitizado | P1 |
| **Hermes** | EMPRESA freelance | **BUILD** demo + API validación | P1 |
| **Rhythm Elegance** | PROPIO | DEMO_OK estático | P3 |
| **BioAlert+** | HACK | SANITIZE demos / lore | P2 |
| **MIOBOX** | EMPRESA SofinSaS | **LORE** | — |
| **Interledger Agent** | PROPIO | SANITIZE o lore | P2 |
| **Guarapo / Cata** | EMPRESA | **LORE only** (sin acceso) | — |

---

## B. Empresas / clears del dossier

| Empresa | Destino en catálogo / dossier | Notas |
|---------|-------------------------------|-------|
| Sector público / energía | Stakeholder Matrix (demo) | Ya sanitizado |
| SofinSaS / MIOBOX | MIOBOX Bridge | LORE |
| Guarapo / Cata | Clear lore | Sin acceso a código |
| Hermes (freelance) | Hermes demo | Completar backend |
| **Infinity Tech** | Clear lore (pendiente redactar) | Añadir a `player.ts` |
| **Clazz Dev** | Clear lore (pendiente redactar) | Añadir a `player.ts` |
| **iCluster** | Clear lore (pendiente redactar) | Añadir a `player.ts` |

---

## C. Plan `jgmaza-hub` (Supabase unificado)

### Objetivo

Un solo proyecto Supabase: **un Auth**, schemas por app, RLS por `auth.uid()`, apps en Vercel apuntando al mismo URL/keys.

### Pasos técnicos

1. Crear proyecto **`jgmaza-hub`** (región cercana, p.ej. `us-east-1` o `us-west-2`).
2. Migrar schema + datos de Mussistant (`profiles`, `spotify_access_requests`, RPCs, storage si aplica) → schema `mussistant` o `public` con prefijos claros.
3. Actualizar Mussistant (`.env` local + Vercel env + MCP `project_ref`) al hub.
4. Verificar login, confirm email, Spotify allowlist flow.
5. **Pausar** `crejfguldfbjwztmctwt` (Mussistant viejo).
6. Después: schemas `splitia`, `mediagent_demo`, `edunova`, etc.

### Convención sugerida

```
auth.users          ← compartido
public / mussistant_*   ← ya migrado
splitia.*               ← cuando el core exista
mediagent.*             ← seed demo sin Vapi
edunova.*               ← al reconstruir
```

---

## D. Splitia — qué falta (no es “solo migrar”)

Propuesta de valor: botón / flujo de **gastos diarios** (agente que revisa correos).

Mínimo para que valga la pena el hub:

1. **Core tipo Splitwise**
   - Grupos, miembros, gastos, splits (igual / porcentajes / montos)
   - Balances y “quién le debe a quién” (simplificación de deudas)
   - Corregir errores lógicos actuales de DB en gastos compartidos
2. **Gastos diarios + agente de correo**
   - Ingesta desde email (o simulación en demo)
   - Clasificación → gasto → asignación a grupo/persona
3. Auth vía **jgmaza-hub**

Orden: arreglar **core Splitwise** → luego agente correos → luego unificar DB.

---

## E. MediAgent — qué hacer sin quebrarse con APIs pagas

**Realidad:** el producto “completo” (Vapi + Twilio + Deepgram + ElevenLabs Valentina + GPT-4o) es caro para demo siempre-on.

**Sí conviene:** mantenerlo como **pieza principal del catálogo** (pitch + scope + UI + story).

### Opciones (recomendada = híbrido)

| Opción | Qué muestra | Costo | Esfuerzo |
|--------|-------------|-------|----------|
| **A. Lore + UI + seed** | Landing + dashboard + agenda con datos ficticios; sin llamadas reales | Bajo | Bajo |
| **B. Demo voz “press to play”** | Un audio/video pregrabado o Web Speech API mock en español | Bajo | Medio |
| **C. Voice on-demand con credits** | Vapi solo en demos controladas (warmup script); apagado el resto | Medio (créditos) | Medio |
| **D. Rebuild open-source** | Whisper local / OpenAI solo + TTS barato; pierde acento CO | Medio | Alto |

**Decisión (2026-10-07):** **A + B** como versión pública (UI + seed + mock/video). **C** opcional solo para demos en vivo. Portafolio: legendary + disclaimer “demo operativa sin telefonía 24/7”.

No mezclar MediAgent con Splitia (productos distintos).

---

## F. Edunova — recuperación

| Pieza | Estado |
|-------|--------|
| Backend | Local: `Propios/EdunovaBack` · remote `appEdunova/EdunovaBack` |
| Frontend | **No encontrado** en disco ni en repos de `Jgmaza`. Org `appEdunova` solo lista el back desde esta cuenta. |

**Acción owner:** pedirlo al compañero (confirmado 2026-10-07). Sin el front no arrancamos UI; el back local sigue en `EdunovaBack`.

---

## G. Prioridad de trabajo revisada

### P0

1. Crear **jgmaza-hub** + migrar Mussistant + pausar SB viejo  
2. **Splitia** — core Splitwise + fix DB (luego agente correos)  
3. **MediAgent** — empaquetar demo A+B + ficha portfolio fuerte  
4. **Edunova** — ubicar front + plan reconstrucción producto  

### P1

5. Hermes — API validación + demo estable  
6. VerificaCol — mantener / pulir  
7. Stakeholder Matrix — mantener  
8. Redactar clears: Infinity Tech, Clazz Dev, iCluster en `player.ts`  

### P2

BioAlert, Interledger, Rhythm polish  

### Fuera / LORE only

Guarapo/Cata código, MIOBOX código, vault-accounts, taller AWS keys  

---

## H. Preguntas — estado

| # | Tema | Estado |
|---|------|--------|
| 1 | Edunova front | Owner lo pedirá a un compañero. Bloquea reconstrucción UI hasta tener repo. |
| 2 | Infinity Tech / Clazz Dev / iCluster | Confirmado: redactar clears (pendiente texto del owner). |
| 3 | MediAgent demo | **Confirmado: híbrido A+B** (UI + seed + mock/video; sin voz paga 24/7). |
| 4 | Hub | Creado: `pnzkrbdlrtukthyrvdri` · `us-east-1` · Maza projects. |

### Hecho (2026-10-07)

1. Migración Mussistant → `jgmaza-hub` (users, profiles, allowlist, env, deploy; legacy pausado).  
2. **Hub multi-app:** `profiles.apps` + `gmail_access_token`; schemas `splitia` + `mediagent` + views públicas; datos Splitia remapeados a Jose; seed MediAgent; env Splitia/MediAgent → hub; SplitIA SB pausado.  
   Detalle: [`JGMAZA_HUB.md`](./JGMAZA_HUB.md).

### Próximo paso técnico sugerido

Terminar Splitia core (Auth real, quitar DEMO anon) / empacar MediAgent A+B en Vercel / recibir Edunova front.

---

## I. Relacionado

- Catálogo: `src/content/projects.ts`  
- Dossier: `src/content/player.ts`  
- Spotify público: `Mussistant/docs/SPOTIFY_ACCESO_PUBLICO.md`  
