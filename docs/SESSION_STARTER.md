# Session starter — portafolio retro

Copia el bloque de abajo al abrir un **chat agentico nuevo** en este repo.

---

```text
Contexto
- Repo: portfolio (retro / Build Catalog) en
  /Users/jgmaza/Documents/Proyectos/Propios/portfolio
- Stack: Next.js App Router, TypeScript, CSS HUD arcade
- Home atmosphere: Canvas 2D en src/lib/space-battle.ts + SpaceBattleBg.tsx
  (persecución mensajero vs cazas por los bordes visibles)
- Referencia PlayCanvas (craft 3D / jam, NO el home actual):
  /Users/jgmaza/Documents/Proyectos/Propios/no-sueltes-la-caja-gamejam-kit
  Docs: https://developer.playcanvas.com/
- Prod: push main → GitHub Actions → Vercel
  https://portfolio-nine-sand-57.vercel.app

Cómo trabajar (obligatorio)
1. CLI/local > MCP (git, gh, npm, npx vercel, Playwright).
2. Si MCP needsAuth: avísame en una línea y sigue con CLI. No te bloquees.
3. No existe MCP de PlayCanvas aquí → usa el jam kit + docs oficiales.
4. No commit / push / deploy sin que yo lo pida.
5. Dev en puerto libre si 3000 está ocupado (ej. 3001).
6. Respuestas cortas; pregunta solo si bloquea.

Reglas del home (chase)
- Un solo layout `.home-portals` responsive (no home-mobile separado).
- Canvas 2D en todos los anchos; `density: lite` en mobile. Off con prefers-reduced-motion.
- Persecución por gutters visibles, no detrás de los portales.
- Movimiento orgánico (no circuito cuadrado rígido).
- Pause en tab oculta.

PlayCanvas (si esta sesión toca 3D)
- Seguir patrones del jam: Application, Entity+render, materiales, destroy limpio.
- En Next: solo client components; DPR cap; mount/unmount seguro.
- No sustituir el chase 2D del home por PlayCanvas salvo que yo lo pida.

Primera tarea de esta sesión
[EDITA ESTO]
Ejemplo: “Sigue puliendo la persecución del home: más fluida, historia más clara,
ruta solo por espacio visible. Correr en localhost y no subir a prod hasta que diga ok.”
```

---

## Checklist rápido antes de cerrar sesión

- [ ] `npm run dev` en puerto libre y hard-refresh desktop
- [ ] Chase legible fuera de los botones
- [ ] Copy de historia comprensible sin jerga
- [ ] Si pediste deploy: push a `main` y Actions en verde
