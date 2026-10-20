export type SpaceBattleHandle = {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
  setLocale: (locale: SpaceBattleLocale) => void;
  syncPalette: () => void;
};

export type SpaceBattleLocale = "es" | "en";

const ALERT = "#ff5f57";
const SPACE = "#070d18";

type Team = "ally" | "foe";

type Star = { x: number; y: number; s: number; tw: number; layer: number };
type Bullet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  team: Team;
  w: number;
};
type Ship = {
  role: "courier" | "hunter" | "wing" | "skirmish";
  team: Team;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  fireCd: number;
  fireEvery: number;
  hpFlash: number;
  lag: number;
  phase: number;
  heading: number;
  /** Skirmish: dogfight partner */
  foeId?: number;
  /** Skirmish: home pocket they orbit */
  home: Pt;
  id: number;
};
type Boom = { x: number; y: number; life: number; max: number; color: string };
type Pulse = { x: number; y: number; life: number; max: number; r: number };
type Pt = { x: number; y: number };

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function lerpAngle(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

function isUiTarget(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return Boolean(
    el.closest(
      "a, button, input, textarea, select, [role='button'], [data-no-space-pulse]",
    ),
  );
}

export type SpaceBattleOptions = {
  locale?: SpaceBattleLocale;
  /** Lite = fewer skirmish pairs / lower DPR for small viewports */
  density?: "full" | "lite";
};

/**
 * Rim chase + stable map-wide dogfights + pointer scare / click pulse.
 */
export function createSpaceBattle(
  canvas: HTMLCanvasElement,
  opts: SpaceBattleOptions = {},
): SpaceBattleHandle {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    return {
      destroy: () => {},
      pause: () => {},
      resume: () => {},
      setLocale: () => {},
      syncPalette: () => {},
    };
  }

  // Locale API kept for SpaceBattleBg; atmosphere has no on-canvas copy.
  const setLocale = (_next: SpaceBattleLocale) => {};
  void opts.locale;
  const density = opts.density ?? "full";
  const isLite = density === "lite";

  let ALLY = "#3dff9a";
  let FOE = "#5ec8ff";
  let HUD = "#6f8199";

  const syncPalette = () => {
    const styles = getComputedStyle(document.documentElement);
    ALLY = styles.getPropertyValue("--accent").trim() || ALLY;
    FOE = styles.getPropertyValue("--hud").trim() || FOE;
    HUD = styles.getPropertyValue("--muted").trim() || HUD;
  };
  syncPalette();

  const allyAlpha = (a: number) => {
    const hex = ALLY.replace("#", "");
    if (hex.length !== 6) return `rgba(61,255,154,${a})`;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  };

  let w = 0;
  let h = 0;
  let dpr = 1;
  let running = true;
  let raf = 0;
  let last = performance.now();
  let t = 0;
  let nextId = 1;

  let pathT = 0;
  let pathSpeed = 0.05;

  // Pointer interaction (window-level — canvas stays pointer-events: none)
  let pointer = { x: 0, y: 0, on: false };
  const pulses: Pulse[] = [];

  const stars: Star[] = [];
  const ships: Ship[] = [];
  const bullets: Bullet[] = [];
  const booms: Boom[] = [];
  const trail: Pt[] = [];
  const TRAIL_MAX = isLite ? 60 : 120;
  const SKIRMISH_PAIRS = isLite ? 4 : 8;

  let loop: Pt[] = [];
  let loopLen = 0;
  let segLens: number[] = [];
  let segCurve: number[] = [];
  /** Hard keepout for chase (portal cards) */
  let keepout = { x0: 0, y0: 0, x1: 0, y1: 0 };
  /** Softer keepout for skirmish — can roam more of the map */
  let softKo = { x0: 0, y0: 0, x1: 0, y1: 0 };
  let rim = { left: 40, right: 0, top: 30, bottom: 0 };

  const syncSize = () => {
    const parent = canvas.parentElement;
    const cssW = parent?.clientWidth || window.innerWidth;
    const cssH = parent?.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, isLite ? 1.25 : 1.5);
    w = cssW;
    h = cssH;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    buildLoop();
  };

  const buildLoop = () => {
    const contentW = Math.min(1180, w - 32);
    const sideMargin = Math.max(0, (w - contentW) / 2);
    const r = Math.max(36, Math.min(56, sideMargin * 0.55 || 40));
    const left = r;
    const right = w - r;
    const top = Math.max(28, h * 0.045);
    const bottom = h - Math.max(48, h * 0.06);
    const radius = Math.min((right - left) * 0.28, (bottom - top) * 0.42, 140);

    rim = { left, right, top, bottom };

    const koPadX = Math.min(contentW * 0.42, w * 0.38);
    keepout = {
      x0: w * 0.5 - koPadX,
      y0: h * 0.14,
      x1: w * 0.5 + koPadX,
      y1: h * 0.72,
    };
    // Skirmish can cut closer to cards — just avoid the dense center
    softKo = {
      x0: w * 0.32,
      y0: h * 0.28,
      x1: w * 0.68,
      y1: h * 0.62,
    };

    const pts: Pt[] = [];
    const pushArc = (
      cx: number,
      cy: number,
      rad: number,
      a0: number,
      a1: number,
      steps: number,
    ) => {
      for (let i = 0; i <= steps; i++) {
        const a = lerp(a0, a1, i / steps);
        pts.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad });
      }
    };

    const step = 14;
    for (let x = left + radius; x <= right - radius; x += step) pts.push({ x, y: top });
    pushArc(right - radius, top + radius, radius, -Math.PI / 2, 0, 14);
    for (let y = top + radius; y <= bottom - radius; y += step) pts.push({ x: right, y });
    pushArc(right - radius, bottom - radius, radius, 0, Math.PI / 2, 14);
    for (let x = right - radius; x >= left + radius; x -= step) pts.push({ x, y: bottom });
    pushArc(left + radius, bottom - radius, radius, Math.PI / 2, Math.PI, 14);
    for (let y = bottom - radius; y >= top + radius; y -= step) pts.push({ x: left, y });
    pushArc(left + radius, top + radius, radius, Math.PI, (Math.PI * 3) / 2, 14);

    loop = pts;
    segLens = [];
    segCurve = [];
    loopLen = 0;
    for (let i = 0; i < loop.length; i++) {
      const a = loop[i];
      const b = loop[(i + 1) % loop.length];
      const c = loop[(i + 2) % loop.length];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segLens.push(len);
      loopLen += len;
      const ang0 = Math.atan2(b.y - a.y, b.x - a.x);
      const ang1 = Math.atan2(c.y - b.y, c.x - b.x);
      let dAng = Math.abs(ang1 - ang0);
      if (dAng > Math.PI) dAng = Math.PI * 2 - dAng;
      segCurve.push(clamp(dAng / (Math.PI / 2), 0, 1));
    }
  };

  const sampleLoop = (
    progress: number,
  ): { x: number; y: number; angle: number; curve: number } => {
    let d = ((((progress % 1) + 1) % 1) * loopLen);
    for (let i = 0; i < loop.length; i++) {
      const len = segLens[i];
      if (d <= len || i === loop.length - 1) {
        const a = loop[i];
        const b = loop[(i + 1) % loop.length];
        const u = len < 1e-6 ? 0 : d / len;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return {
          x: a.x + dx * u,
          y: a.y + dy * u,
          angle: Math.atan2(dy, dx),
          curve: segCurve[i] ?? 0,
        };
      }
      d -= len;
    }
    return { x: loop[0]?.x ?? 0, y: loop[0]?.y ?? 0, angle: 0, curve: 0 };
  };

  const avoidRect = (
    p: Pt,
    rect: { x0: number; y0: number; x1: number; y1: number },
    pad: number,
  ): Pt => {
    if (p.x <= rect.x0 - pad || p.x >= rect.x1 + pad || p.y <= rect.y0 - pad || p.y >= rect.y1 + pad) {
      return p;
    }
    const dl = Math.abs(p.x - rect.x0);
    const dr = Math.abs(rect.x1 - p.x);
    const dTop = Math.abs(p.y - rect.y0);
    const db = Math.abs(rect.y1 - p.y);
    const m = Math.min(dl, dr, dTop, db);
    const out = 10;
    if (m === dl) return { x: rect.x0 - pad - out, y: p.y };
    if (m === dr) return { x: rect.x1 + pad + out, y: p.y };
    if (m === dTop) return { x: p.x, y: rect.y0 - pad - out };
    return { x: p.x, y: rect.y1 + pad + out };
  };

  const softAvoidChase = (p: Pt) => avoidRect(p, keepout, 36);
  const softAvoidSkirmish = (p: Pt) => avoidRect(p, softKo, 18);

  /** Scatter homes across most of the viewport (stable wars). */
  const randomMapPt = (): Pt => {
    const margin = 28;
    let p = {
      x: rand(margin, w - margin),
      y: rand(margin, h - margin),
    };
    p = softAvoidSkirmish(p);
    return p;
  };

  /** Even coverage from frame one — jittered grid, then soft-avoid the portal core. */
  const spreadHomes = (count: number): Pt[] => {
    const marginX = Math.max(36, w * 0.04);
    const marginY = Math.max(36, h * 0.05);
    const cols = Math.ceil(Math.sqrt(count * (w / Math.max(h, 1))));
    const rows = Math.ceil(count / cols);
    const cellW = (w - marginX * 2) / cols;
    const cellH = (h - marginY * 2) / rows;
    const homes: Pt[] = [];
    let n = 0;
    for (let row = 0; row < rows && n < count; row++) {
      for (let col = 0; col < cols && n < count; col++) {
        const jitterX = (Math.random() - 0.5) * cellW * 0.55;
        const jitterY = (Math.random() - 0.5) * cellH * 0.55;
        let p = {
          x: marginX + (col + 0.5) * cellW + jitterX,
          y: marginY + (row + 0.5) * cellH + jitterY,
        };
        p = softAvoidSkirmish(p);
        p.x = clamp(p.x, marginX, w - marginX);
        p.y = clamp(p.y, marginY, h - marginY);
        homes.push(p);
        n++;
      }
    }
    return homes;
  };

  const springTo = (
    s: Ship,
    tx: number,
    ty: number,
    stiff: number,
    damp: number,
    dt: number,
  ) => {
    const ax = (tx - s.x) * stiff - s.vx * damp;
    const ay = (ty - s.y) * stiff - s.vy * damp;
    s.vx += ax * dt;
    s.vy += ay * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
  };

  /** Push ships away from pointer / pulse. */
  const applyScare = (s: Ship, strength: number, dt: number) => {
    if (!pointer.on && pulses.length === 0) return;

    if (pointer.on) {
      const dx = s.x - pointer.x;
      const dy = s.y - pointer.y;
      const dist = Math.hypot(dx, dy) || 1;
      const radius = s.role === "courier" ? 90 : 130;
      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        s.vx += (dx / dist) * force * dt;
        s.vy += (dy / dist) * force * dt;
      }
    }

    for (const p of pulses) {
      const dx = s.x - p.x;
      const dy = s.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < p.r) {
        const force = (1 - dist / p.r) * strength * 2.2;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
      }
    }
  };

  const seedStars = () => {
    stars.length = 0;
    const count = Math.floor((w * h) / 2400);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() > 0.85 ? 2 : 1,
        tw: Math.random() * Math.PI * 2,
        layer: Math.random() < 0.3 ? 0 : Math.random() < 0.65 ? 1 : 2,
      });
    }
  };

  const boom = (x: number, y: number, color: string) => {
    booms.push({ x, y, life: 0.4, max: 0.4, color });
  };

  const fireAt = (ship: Ship, ang: number, team: Team, wBullet = 8) => {
    const speed = rand(280, 460);
    const spread = (Math.random() - 0.5) * 0.4;
    const a = ang + spread;
    bullets.push({
      x: ship.x + Math.cos(a) * ship.size * 0.65,
      y: ship.y + Math.sin(a) * ship.size * 0.65,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      life: rand(0.28, 0.55),
      team,
      w: wBullet,
    });
  };

  const makeShip = (
    role: Ship["role"],
    team: Team,
    x: number,
    y: number,
    size: number,
    extra: Partial<Ship> = {},
  ): Ship => ({
    id: nextId++,
    role,
    team,
    x,
    y,
    vx: 0,
    vy: 0,
    size,
    fireCd: rand(0.1, 0.5),
    fireEvery: rand(0.35, 0.6),
    hpFlash: 0,
    lag: 0,
    phase: rand(0, Math.PI * 2),
    heading: 0,
    home: { x, y },
    ...extra,
  });

  const spawnStablePair = (home: Pt) => {
    const ang = rand(0, Math.PI * 2);
    const dist = rand(40, 90);
    const b = softAvoidSkirmish({
      x: home.x + Math.cos(ang) * dist,
      y: home.y + Math.sin(ang) * dist,
    });
    const ally = makeShip("skirmish", "ally", home.x, home.y, rand(12, 16), {
      home: { ...home },
      fireEvery: rand(0.22, 0.38),
    });
    const foe = makeShip("skirmish", "foe", b.x, b.y, rand(12, 16), {
      home: { ...b },
      fireEvery: rand(0.22, 0.38),
      foeId: ally.id,
    });
    ally.foeId = foe.id;
    ships.push(ally, foe);
  };

  const resetFleet = () => {
    ships.length = 0;
    bullets.length = 0;
    booms.length = 0;
    pulses.length = 0;
    trail.length = 0;
    pathT = 0.02;
    nextId = 1;

    const start = sampleLoop(pathT);
    ships.push(
      makeShip("courier", "ally", start.x, start.y, 30, {
        fireEvery: 0.48,
        fireCd: 0.4,
        heading: start.angle,
      }),
    );

    const hunterCount = isLite ? 2 : 3;
    for (let i = 0; i < hunterCount; i++) {
      ships.push(
        makeShip("hunter", "foe", start.x, start.y, rand(17, 22), {
          lag: 0.42 + i * 0.28,
          fireEvery: rand(0.48, 0.7),
          heading: start.angle,
        }),
      );
    }

    if (!isLite) {
      ships.push(
        makeShip("wing", "ally", start.x, start.y, 16, {
          lag: -0.1,
          fireEvery: 0.55,
          heading: start.angle,
        }),
      );
    }

    // Stable wars — even layout on first paint, then they roam slowly
    const homes = spreadHomes(SKIRMISH_PAIRS);
    for (const home of homes) spawnStablePair(home);
  };

  const trailAtLag = (lagSec: number): Pt => {
    if (trail.length < 2) {
      const c = ships.find((s) => s.role === "courier");
      return { x: c?.x ?? 0, y: c?.y ?? 0 };
    }
    const frames = Math.round(lagSec * 60);
    const idx = clamp(trail.length - 1 - frames, 0, trail.length - 1);
    return { ...trail[idx] };
  };

  const drawWake = () => {
    if (trail.length < 3) return;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    const n = Math.min(trail.length, 48);
    const start = trail.length - n;
    for (let i = 1; i < n; i++) {
      const a = trail[start + i - 1];
      const b = trail[start + i];
      ctx.strokeStyle = allyAlpha((i / n) * 0.2);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  };

  const drawLoopGuide = () => {
    if (loop.length < 2) return;
    ctx.strokeStyle = allyAlpha(0.045);
    ctx.setLineDash([4, 14]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(loop[0].x, loop[0].y);
    for (let i = 1; i < loop.length; i++) ctx.lineTo(loop[i].x, loop[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawPointerAura = () => {
    if (!pointer.on) return;
    const r = 56 + Math.sin(t * 4) * 4;
    ctx.strokeStyle = "rgba(232,238,248,0.18)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = allyAlpha(0.12);
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, r * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  };

  const drawShip = (s: Ship) => {
    const isCourier = s.role === "courier";
    const isSkirmish = s.role === "skirmish";
    const body = s.hpFlash > 0 ? ALERT : s.team === "foe" ? FOE : ALLY;
    const sz = Math.round(s.size);

    ctx.save();
    ctx.translate(Math.round(s.x), Math.round(s.y));
    ctx.rotate(s.heading);

    ctx.globalAlpha = isSkirmish ? 0.3 : 0.4;
    ctx.fillStyle = s.team === "foe" ? ALERT : ALLY;
    ctx.fillRect(-sz - (isCourier ? 10 : 8), -2, isCourier ? 10 : 8, 4);
    ctx.globalAlpha = isSkirmish ? 0.78 : 1;

    ctx.fillStyle = s.team === "foe" ? "#1a2740" : "#10241c";
    ctx.beginPath();
    ctx.moveTo(sz, 0);
    ctx.lineTo(-sz * 0.72, -sz * 0.52);
    ctx.lineTo(-sz * 0.38, 0);
    ctx.lineTo(-sz * 0.72, sz * 0.52);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = body;
    ctx.lineWidth = isCourier ? 3 : isSkirmish ? 1.7 : 2.2;
    ctx.shadowColor = body;
    ctx.shadowBlur = isCourier ? 11 : isSkirmish ? 3 : 5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (isCourier) {
      ctx.fillStyle = ALLY;
      ctx.fillRect(-4, -5, 8, 10);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.strokeRect(-4, -5, 8, 10);
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const drawBullet = (b: Bullet) => {
    const c = b.team === "foe" ? ALERT : ALLY;
    const ang = Math.atan2(b.vy, b.vx);
    ctx.save();
    ctx.translate(Math.round(b.x), Math.round(b.y));
    ctx.rotate(ang);
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(0, -1, Math.round(b.w), 2);
    ctx.globalAlpha = 0.2;
    ctx.fillRect(-3, -2, Math.round(b.w) + 5, 4);
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const drawBoom = (b: Boom) => {
    const p = 1 - b.life / b.max;
    const r = Math.round(6 + p * 18);
    ctx.save();
    ctx.translate(Math.round(b.x), Math.round(b.y));
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = 1 - p;
    ctx.lineWidth = 2;
    ctx.strokeRect(-r, -r, r * 2, r * 2);
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const drawPulse = (p: Pulse) => {
    const u = 1 - p.life / p.max;
    const r = p.r * (0.25 + u * 0.75);
    ctx.strokeStyle = allyAlpha((1 - u) * 0.45);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(94,200,255,${(1 - u) * 0.2})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.7, 0, Math.PI * 2);
    ctx.stroke();
  };

  const tickChase = (dt: number) => {
    const peek = sampleLoop(pathT);
    const curveSlow = 1 - peek.curve * 0.38;
    pathSpeed =
      (0.042 + Math.sin(t * 1.15) * 0.01 + Math.sin(t * 0.33) * 0.007) * curveSlow;
    const leadHunter = ships.find((s) => s.role === "hunter");
    const courierRef = ships.find((s) => s.role === "courier");
    if (courierRef && leadHunter) {
      const gap = Math.hypot(leadHunter.x - courierRef.x, leadHunter.y - courierRef.y);
      if (gap < 140) pathSpeed *= 1.35;
    }
    pathT += pathSpeed * dt;

    const courier = ships.find((s) => s.role === "courier");
    if (courier) {
      const base = sampleLoop(pathT);
      const sway =
        Math.sin(t * 1.55 + courier.phase) * 11 +
        Math.sin(t * 0.55 + courier.phase * 2) * 6;
      const nx = Math.cos(base.angle + Math.PI / 2);
      const ny = Math.sin(base.angle + Math.PI / 2);
      const cx = w * 0.5;
      const cy = h * 0.42;
      const outSign = (base.x - cx) * nx + (base.y - cy) * ny >= 0 ? 1 : -1;
      const avoided = softAvoidChase({
        x: base.x + nx * sway * outSign,
        y: base.y + ny * sway * outSign,
      });
      springTo(courier, avoided.x, avoided.y, 18, 7.5, dt);
      applyScare(courier, 380, dt);
      courier.hpFlash = Math.max(0, courier.hpFlash - dt);
      const spd = Math.hypot(courier.vx, courier.vy);
      courier.heading = lerpAngle(
        courier.heading,
        spd > 6 ? Math.atan2(courier.vy, courier.vx) : base.angle,
        Math.min(1, dt * (spd > 6 ? 8 : 5)),
      );
      trail.push({ x: courier.x, y: courier.y });
      if (trail.length > TRAIL_MAX) trail.shift();
      courier.fireCd -= dt;
      if (courier.fireCd <= 0) {
        courier.fireCd = courier.fireEvery;
        fireAt(courier, courier.heading, "ally", 12);
      }
    }

    for (const s of ships) {
      if (s.role === "courier" || s.role === "skirmish") continue;
      const target =
        s.role === "wing" && s.lag < 0
          ? sampleLoop(pathT + 0.035)
          : trailAtLag(Math.max(0.1, s.lag));
      const fan =
        s.role === "hunter"
          ? Math.sin(t * 0.95 + s.phase) * 18 + (s.phase - 2) * 3.5
          : Math.sin(t * 1.25 + s.phase) * 12;
      const angTo = Math.atan2(
        (courier?.y ?? target.y) - s.y,
        (courier?.x ?? target.x) - s.x,
      );
      const side = angTo + Math.PI / 2;
      const avoided = softAvoidChase({
        x: target.x + Math.cos(side) * fan * 0.4,
        y: target.y + Math.sin(side) * fan * 0.4,
      });
      springTo(
        s,
        avoided.x,
        avoided.y,
        s.role === "hunter" ? 11 : 14,
        s.role === "hunter" ? 5.2 : 6.2,
        dt,
      );
      applyScare(s, 520, dt);
      s.hpFlash = Math.max(0, s.hpFlash - dt);
      const spd = Math.hypot(s.vx, s.vy);
      if (spd > 6) {
        s.heading = lerpAngle(s.heading, Math.atan2(s.vy, s.vx), Math.min(1, dt * 7));
      }
      s.fireCd -= dt;
      if (s.fireCd <= 0) {
        s.fireCd = s.fireEvery;
        const aim = courier
          ? Math.atan2(courier.y - s.y, courier.x - s.x)
          : s.heading;
        fireAt(s, s.role === "hunter" ? aim : s.heading, s.team);
      }
    }

    if (courier) {
      for (const s of ships) {
        if (s.role !== "hunter") continue;
        const dist = Math.hypot(s.x - courier.x, s.y - courier.y);
        if (dist > 180) continue;
        ctx.strokeStyle = `rgba(255,95,87,${clamp(0.3 - dist / 900, 0.05, 0.24)})`;
        ctx.setLineDash([3, 8]);
        ctx.beginPath();
        ctx.moveTo(Math.round(s.x), Math.round(s.y));
        ctx.lineTo(Math.round(courier.x), Math.round(courier.y));
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  const tickSkirmish = (dt: number) => {
    for (const s of ships) {
      if (s.role !== "skirmish") continue;
      const foe = ships.find((o) => o.id === s.foeId);

      // Slowly drift home pocket so wars roam the map without vanishing
      if (Math.sin(t * 0.15 + s.phase) > 0.97) {
        const next = randomMapPt();
        s.home.x = lerp(s.home.x, next.x, 0.35);
        s.home.y = lerp(s.home.y, next.y, 0.35);
      }

      let tx: number;
      let ty: number;
      if (foe) {
        const ang = Math.atan2(foe.y - s.y, foe.x - s.x);
        const orbit = Math.sin(t * 2.1 + s.phase) * 48;
        tx = foe.x - Math.cos(ang) * 50 + Math.cos(ang + Math.PI / 2) * orbit;
        ty = foe.y - Math.sin(ang) * 50 + Math.sin(ang + Math.PI / 2) * orbit;
        // Pull fights toward their home so they stay spread
        tx = lerp(tx, s.home.x, 0.35);
        ty = lerp(ty, s.home.y, 0.35);
      } else {
        tx = s.home.x;
        ty = s.home.y;
      }

      const avoided = softAvoidSkirmish({ x: tx, y: ty });
      springTo(s, avoided.x, avoided.y, 14, 5.2, dt);
      applyScare(s, 600, dt);
      s.hpFlash = Math.max(0, s.hpFlash - dt);

      // Keep on-screen
      s.x = clamp(s.x, 16, w - 16);
      s.y = clamp(s.y, 16, h - 16);

      const spd = Math.hypot(s.vx, s.vy);
      if (spd > 4) {
        s.heading = lerpAngle(s.heading, Math.atan2(s.vy, s.vx), Math.min(1, dt * 9));
      }

      s.fireCd -= dt;
      if (s.fireCd <= 0 && foe) {
        s.fireCd = s.fireEvery;
        fireAt(s, Math.atan2(foe.y - s.y, foe.x - s.x), s.team, 7);
      }
    }
  };

  const tick = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    t += dt;

    ctx.fillStyle = SPACE;
    ctx.fillRect(0, 0, w, h);

    for (const st of stars) {
      const speed = st.layer === 0 ? 22 : st.layer === 1 ? 55 : 120;
      st.x -= speed * dt;
      if (st.x < 0) st.x = w;
      st.tw += dt * 3;
      ctx.globalAlpha = 0.28 + st.layer * 0.2 + Math.sin(st.tw) * 0.1;
      ctx.fillStyle = st.layer === 2 ? ALLY : st.layer === 1 ? FOE : HUD;
      ctx.fillRect(Math.round(st.x), Math.round(st.y), st.s, st.s);
    }
    ctx.globalAlpha = 1;

    drawLoopGuide();
    drawWake();
    drawPointerAura();

    tickChase(dt);
    tickSkirmish(dt);

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.life -= dt;
      if (p.life <= 0) {
        pulses.splice(i, 1);
        continue;
      }
      drawPulse(p);
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.life <= 0 || b.x < -40 || b.x > w + 40 || b.y < -40 || b.y > h + 40) {
        bullets.splice(i, 1);
        continue;
      }
      let hit = false;
      for (const s of ships) {
        const hostile = b.team === "foe";
        if (hostile ? s.team !== "ally" : s.team !== "foe") continue;
        const dx = s.x - b.x;
        const dy = s.y - b.y;
        if (dx * dx + dy * dy < s.size * s.size * 0.55) {
          s.hpFlash = 0.18;
          boom(b.x, b.y, hostile ? ALERT : ALLY);
          bullets.splice(i, 1);
          hit = true;
          if (s.role === "hunter") s.lag += 0.04;
          break;
        }
      }
      if (!hit) drawBullet(b);
    }

    for (const s of ships) if (s.role === "skirmish") drawShip(s);
    for (const s of ships) if (s.role !== "skirmish") drawShip(s);

    for (let i = booms.length - 1; i >= 0; i--) {
      const b = booms[i];
      b.life -= dt;
      if (b.life <= 0) {
        booms.splice(i, 1);
        continue;
      }
      drawBoom(b);
    }

    ctx.fillStyle = "rgba(0,0,0,0.1)";
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

    raf = requestAnimationFrame(tick);
  };

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.on = true;
  };

  const onPointerLeave = () => {
    pointer.on = false;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (isUiTarget(e.target)) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pulses.push({ x, y, life: 0.55, max: 0.55, r: 160 });
    boom(x, y, ALLY);
  };

  const onResize = () => {
    syncSize();
    seedStars();
    resetFleet();
  };

  syncSize();
  seedStars();
  resetFleet();
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown);
  document.documentElement.addEventListener("mouseleave", onPointerLeave);
  last = performance.now();
  raf = requestAnimationFrame(tick);

  return {
    setLocale,
    syncPalette,
    pause: () => {
      running = false;
      cancelAnimationFrame(raf);
    },
    resume: () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    },
    destroy: () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    },
  };
}
