# Pencil MCP setup (paso a paso)

Objetivo: que `extension-pencil` pase de **0 tools** a **N tools > 0** y que el Agent las vea en el chat.

## Cómo saber si está bien

| Señal | Mal | Bien |
| --- | --- | --- |
| Customize → MCPs → `extension-pencil` | Green + **0 tools enabled** | Green + **N tools enabled** (N ≥ 1) |
| Agent en este chat | Solo github / spotify / supabase / cursor | Aparece namespace Pencil / `execute` / screenshot tools |
| Canvas | `.pen` solo en el tree | `.pen` abierto con editor Pencil visible |

Si Customize dice conectado pero 0 tools, **no está listo** para fidelidad 1:1.

## Pasos (en orden)

### 1. Extensión Pencil instalada y activa

1. Extensions (`Cmd+Shift+X`) → busca **Pencil** / **pen.dev** / **highagency**.
2. Debe estar **Enabled**.
3. Command Palette (`Cmd+Shift+P`) → escribe `Pencil` → deben aparecer comandos Pencil.

### 2. Abrir el diseño en el canvas (crítico)

1. En el repo, abre `portfolio-game.pen`.
2. Confirma que se abre el **canvas Pencil**, no un JSON crudo.
3. Deja ese tab abierto mientras trabajas con el Agent.

Sin canvas abierto, el MCP local suele quedar en 0 tools.

### 3. Activar / refrescar MCP

1. Sidebar → **Customize** → filtro **MCPs**.
2. Localiza `extension-pencil`.
3. Si hay toggle, apágalo y vuélvelo a encender.
4. Espera a que el contador de tools deje de ser `0`.
5. Si sigue en 0: Command Palette → **Developer: Reload Window**.
6. Vuelve a abrir `portfolio-game.pen` y revisa Customize otra vez.

### 4. Auth / login Pencil (si aplica)

1. Si Pencil pide login o activation code, complétalo.
2. Docs útiles: https://docs.pencil.dev/troubleshooting y https://docs.pencil.dev/getting-started/installation

### 5. Nuevo chat Agent (obligatorio)

Los MCP no siempre se refrescan mid-conversation.

1. Cierra este chat o abre uno **nuevo**.
2. Pregunta: *“Lista los tools del MCP de Pencil / extension-pencil”*.
3. Debe poder llamar tools reales (p. ej. `execute`, screenshot). Si solo dice “no tengo acceso”, el gate sigue fallando.

### 6. Verificación rápida en Agent

Pide exactamente:

```text
Usa el MCP de Pencil. Abre portfolio-game.pen si hace falta.
1) Confirma qué tools tienes disponibles.
2) Haz TakeScreenshot (o equivalente) del frame reusable "Build card" / buildCard.
3) Devuélveme el resultado o describe lo que ves.
```

- Si responde con imagen/descripción del canvas → **listo**.
- Si falla o dice 0 tools → repite pasos 2–5 o usa [pencil-prompts.md](pencil-prompts.md) en el chat de Pencil IDE.

## Fallos comunes

| Síntoma | Qué hacer |
| --- | --- |
| 0 tools con punto verde | Abrir `.pen` en canvas + Reload Window |
| Customize: `error=Client closed` al arrancar | **Condición de carrera**: Cursor intenta MCP antes de que pen.dev levante el socket. Ver [Recuperación “Client closed”](#recuperación-client-closed) |
| Dos ventanas de Cursor abiertas | Cierra extras; solo una ventana con el repo + `.pen` en canvas |
| Tools en Customize pero Agent no los ve | Chat **nuevo** (no refresca mid-conversation) |
| MCP blocked / auth | Login Pencil + reiniciar Cursor |
| Agent traduce “a ojo” desde JSON | Detenerlo; no aceptar ese modo hasta gate OK |
| Extensión duplicada (p. ej. 0.6.73 y 0.6.74) | Desinstala la versión vieja en Extensions; deja solo la más reciente |

### Recuperación “Client closed”

En logs de Cursor (`mcp-server-user-highagency.pencildev-extension-pencil*.log`) suele verse:

- `error=Client closed` justo al abrir la ventana
- Luego, si pen.dev ya está activo: `Successfully connected to stdio server` y `TransportClient connected to ~/.pencil/socket/pencil-cursor.sock`

Orden que funciona:

1. **Una sola ventana** de Cursor con el repo `portfolio`.
2. Abre `portfolio-game.pen` en el **editor de diseño** (no “Open as Text”).
3. **Developer: Reload Window** (`Cmd+Shift+P`).
4. Espera ~10 s (Output → **pen.dev**: `Transport server ready`, `New MCP client connected`).
5. **Customize → MCPs → `extension-pencil`**: apaga y enciende; deben listarse **4 tools** (`execute`, `get_app_state`, `get_style`, `read_skill`).
6. **Nuevo chat Agent** y pide listar tools de Pencil.

Verificación local desde terminal (en el repo):

```bash
chmod +x scripts/verify-pencil-mcp.sh
./scripts/verify-pencil-mcp.sh
```

## Relación con skills

- **MCP** = tools en vivo (leer/editar canvas, screenshots).
- **Skill `pen-dev`** = instrucciones de la extensión (cómo diseñar / exportar).
- **Skill `build-catalog-pen`** (esta) = plan del portafolio + orden de frames + rutas.

Los tres se necesitan; skill sola sin MCP ≠ fidelidad visual.
