# jgmaza-hub — Supabase unificado

**Proyecto:** `jgmaza-hub`  
**Ref:** `pnzkrbdlrtukthyrvdri`  
**URL:** `https://pnzkrbdlrtukthyrvdri.supabase.co`  
**Región:** `us-east-1`  
**Org:** Maza projects  

Auth es **compartido** (`auth.users`). El perfil de producto vive en `public.profiles` y se va extendiendo cuando se une una app.

---

## Perfil compartido (`public.profiles`)

| Columna | Uso |
|---------|-----|
| `user_id` | FK → `auth.users` |
| `display_name`, `email` | Identidad |
| `spotify_*` | Mussistant |
| **`apps` (jsonb)** | Flags: `{"mussistant":true,"splitia":true,"mediagent":true}` |
| **`gmail_access_token`** | Splitia (Gmail); RLS solo owner |

Ejemplo:

```json
{ "mussistant": true, "splitia": true, "mediagent": true }
```

---

## Schemas por app

| Schema | App | Tablas | Acceso desde PostgREST |
|--------|-----|--------|-------------------------|
| `public` (mussistant) | Mussistant | `profiles`, `spotify_access_requests` | directo |
| `splitia` | Splitia | `categories`, `friends`, `expenses`, `expense_participants`, `email_expenses` | vistas en `public.*` |
| `mediagent` | MediAgent | `patients`, `medications`, `prescriptions`, `prescription_items`, `appointments`, `call_logs` | vistas en `public.*` |

Las apps siguen usando `.from('expenses')` / `.from('patients')` gracias a **views** en `public` con `security_invoker`.

---

## Apps conectadas

| App | Estado en hub | Notas |
|-----|---------------|-------|
| **Mussistant** | Live | Env Vercel + local → hub. Legacy SB pausado. |
| **Splitia** | Schema + datos migrados | `NEXT_PUBLIC_DEMO_USER_ID` = Jose (`ef982ede-…`). SB SplitIA legacy pausado. Demo RLS anon temporal hasta Auth real. |
| **MediAgent** | Schema + seed demo | `.env` local apuntando al hub. Sin voz paga. |

---

## Proyectos Supabase legacy

| Ref | Nombre | Status |
|-----|--------|--------|
| `crejfguldfbjwztmctwt` | Mussistant | PAUSED |
| `bzdbgmzxxgeubguhbdjs` | SplitIA | PAUSED (tras dump) |
| `exmfigfxzqpibrvensak` | turnos-agent | INACTIVE |
| `pnzkrbdlrtukthyrvdri` | **jgmaza-hub** | ACTIVE |

---

## Cómo unir otra app

1. Añadir flag en `profiles.apps` (y columnas si hace falta).  
2. Crear schema `nombre_app` + tablas con `user_id → auth.users` cuando aplique.  
3. Exponer con views en `public` **o** `supabase.schema('nombre_app')`.  
4. RLS: preferir `auth.uid()`; demos anon solo temporales.  
5. Apuntar env de la app al hub; pausar SB viejo.

---

## Pendiente

- Splitia: Auth real (quitar DEMO_USER + políticas anon).  
- Edunova: schema cuando llegue el front.  
- Redeploy Splitia en Vercel si hace falta recoger env nuevas.
