export type SpaceBattleHandle = {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
  setLocale: (locale: SpaceBattleLocale) => void;
};

export type SpaceBattleLocale = "es" | "en";

const ALLY = "#3dff9a";
const FOE = "#5ec8ff";
const ALERT = "#ff5f57";
const HUD = "#6f8199";
const SPACE = "#070d18";

type Team = "ally" | "foe" | "courier";

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
  role: "courier" | "hunter" | "wing";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  fireCd: number;
  fireEvery: number;
  bank: number;
  hpFlash: number;
  lane: number;
};
type Boom = { x: number; y: number; life: number; max: number; color: string };
type Beat = { kicker: string; line: string };

const BEATS: Record<SpaceBattleLocale, Beat[]> = {
  es: [
    {
      kicker: "OPS // CANAL 7",
      line: "Courier bajo fuego. Lleva el build al hub.",
    },
    {
      kicker: "ALERTA · WING HOSTIL",
      line: "Tres cazas a popa. No los dejes cerrar.",
    },
    {
      kicker: "ESCORT ONLINE",
      line: "Aliado entra por babordo. Cubre la retirada.",
    },
    {
      kicker: "OBJETIVO",
      line: "Sobrevive la persecución. El catálogo te espera.",
    },
    {
      kicker: "SALTO EN CARGA",
      line: "Ventana de escape abriéndose… aguanta.",
    },
  ],
  en: [
    {
      kicker: "OPS // CHANNEL 7",
      line: "Courier under fire. Get the build to the hub.",
    },
    {
      kicker: "ALERT · HOSTILE WING",
      line: "Three fighters on your six. Don't let them close.",
    },
    {
      kicker: "ESCORT ONLINE",
      line: "Ally inbound port-side. Cover the retreat.",
    },
    {
      kicker: "OBJECTIVE",
      line: "Outrun the chase. The catalog is waiting.",
    },
    {
      kicker: "JUMP CHARGING",
      line: "Escape window opening… hold the line.",
    },
  ],
};

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export type SpaceBattleOptions = {
  locale?: SpaceBattleLocale;
};

/**
 * Full-bleed retro 2D pursuit — a courier fleeing hunters,
 * with short story beats so the home lobby feels alive.
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
    };
  }

  let locale: SpaceBattleLocale = opts.locale ?? "es";
  const setLocale = (next: SpaceBattleLocale) => {
    if (next === locale) return;
    locale = next;
    beatAge = 0;
  };
  let w = 0;
  let h = 0;
  let dpr = 1;
  let running = true;
  let raf = 0;
  let last = performance.now();
  let t = 0;

  const stars: Star[] = [];
  const ships: Ship[] = [];
  const bullets: Bullet[] = [];
  const booms: Boom[] = [];

  let beatIndex = 0;
  let beatAge = 0;
  const BEAT_HOLD = 4.2;

  // Courier path: uses full height including the bottom third
  let courierY = 0.55;
  let courierTargetY = 0.7;
  let retargetIn = 1.2;

  const syncSize = () => {
    const parent = canvas.parentElement;
    const cssW = parent?.clientWidth || window.innerWidth;
    const cssH = parent?.clientHeight || window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = cssW;
    h = cssH;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  };

  const seedStars = () => {
    stars.length = 0;
    const count = Math.floor((w * h) / 2200);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        s: Math.random() > 0.82 ? 2 : 1,
        tw: Math.random() * Math.PI * 2,
        layer: Math.random() < 0.3 ? 0 : Math.random() < 0.65 ? 1 : 2,
      });
    }
  };

  const boom = (x: number, y: number, color: string) => {
    booms.push({ x, y, life: 0.5, max: 0.5, color });
  };

  const fire = (ship: Ship, toward: "right" | "left", colorTeam: Team) => {
    const dir = toward === "right" ? 1 : -1;
    const speed = rand(400, 620);
    bullets.push({
      x: ship.x + dir * ship.size * 0.85,
      y: ship.y + rand(-3, 3),
      vx: dir * speed,
      vy: ship.vy * 0.2 + rand(-40, 40),
      life: rand(0.55, 1.0),
      team: colorTeam,
      w: ship.role === "courier" ? 16 : 11,
    });
  };

  const resetFleet = () => {
    ships.length = 0;
    bullets.length = 0;
    booms.length = 0;

    // Courier — story focus, lives in the lower half under the lobby cards
    ships.push({
      role: "courier",
      x: w * 0.26,
      y: h * 0.72,
      vx: 0,
      vy: 0,
      size: 36,
      fireCd: 0.25,
      fireEvery: 0.32,
      bank: 0,
      hpFlash: 0,
      lane: 0,
    });

    // Hunter pack across full height, denser near the bottom chase lane
    for (let i = 0; i < 7; i++) {
      ships.push({
        role: "hunter",
        x: w * (0.55 + i * 0.07),
        y: h * (0.14 + i * 0.11),
        vx: -rand(40, 90),
        vy: 0,
        size: rand(20, 28),
        fireCd: rand(0.05, 0.45),
        fireEvery: rand(0.22, 0.4),
        bank: 0,
        hpFlash: 0,
        lane: i,
      });
    }

    // Two wingmen — one low, one high — so the frame never feels empty
    ships.push({
      role: "wing",
      x: w * 0.1,
      y: h * 0.9,
      vx: 20,
      vy: 0,
      size: 22,
      fireCd: 0.15,
      fireEvery: 0.36,
      bank: 0,
      hpFlash: 0,
      lane: 0,
    });
    ships.push({
      role: "wing",
      x: w * 0.16,
      y: h * 0.22,
      vx: 16,
      vy: 0,
      size: 20,
      fireCd: 0.3,
      fireEvery: 0.4,
      bank: 0,
      hpFlash: 0,
      lane: 1,
    });
  };

  const drawShip = (s: Ship) => {
    const isCourier = s.role === "courier";
    const isHunter = s.role === "hunter";
    const dir = isHunter ? -1 : 1;
    const col = isHunter ? FOE : ALLY;
    const body = s.hpFlash > 0 ? ALERT : col;
    const px = Math.round(s.x);
    const py = Math.round(s.y);
    const sz = Math.round(s.size);

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(s.bank);
    ctx.scale(dir, 1);

    // engine trail (chase feel)
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = isHunter ? ALERT : ALLY;
    ctx.fillRect(-sz - (isCourier ? 14 : 8), -2, isCourier ? 14 : 8, 4);
    ctx.globalAlpha = 0.25;
    ctx.fillRect(-sz - (isCourier ? 22 : 14), -3, isCourier ? 12 : 8, 6);
    ctx.globalAlpha = 1;

    // Filled body + bright outline so the chase reads at a glance
    ctx.fillStyle = isHunter ? "#1a2740" : "#10241c";
    ctx.beginPath();
    ctx.moveTo(sz, 0);
    ctx.lineTo(-sz * 0.75, -sz * 0.55);
    ctx.lineTo(-sz * 0.4, 0);
    ctx.lineTo(-sz * 0.75, sz * 0.55);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = body;
    ctx.lineWidth = isCourier ? 3 : 2.5;
    ctx.shadowColor = body;
    ctx.shadowBlur = isCourier ? 12 : 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = body;
    ctx.fillRect(Math.round(sz * 0.05), -2, isCourier ? 7 : 5, 4);
    ctx.fillRect(-Math.round(sz * 0.2), -Math.round(sz * 0.72), 3, Math.round(sz * 0.38));
    ctx.fillRect(-Math.round(sz * 0.2), Math.round(sz * 0.34), 3, Math.round(sz * 0.38));

    if (isCourier) {
      // cargo pod — the "build" being delivered
      ctx.fillStyle = ALLY;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(-Math.round(sz * 0.15), -5, 8, 10);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.strokeRect(-Math.round(sz * 0.15), -5, 8, 10);
    }

    ctx.restore();
  };

  const drawBullet = (b: Bullet) => {
    const c = b.team === "foe" ? ALERT : ALLY;
    const x = Math.round(b.x);
    const y = Math.round(b.y);
    const len = Math.round(b.w);
    const goingRight = b.vx >= 0;
    ctx.fillStyle = c;
    ctx.globalAlpha = 0.95;
    ctx.fillRect(goingRight ? x : x - len, y - 1, len, 2);
    ctx.globalAlpha = 0.3;
    ctx.fillRect(goingRight ? x - 6 : x - len + 6, y - 2, len + 8, 4);
    ctx.globalAlpha = 1;
  };

  const drawBoom = (b: Boom) => {
    const p = 1 - b.life / b.max;
    const r = Math.round(8 + p * 26);
    ctx.save();
    ctx.translate(Math.round(b.x), Math.round(b.y));
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = 1 - p;
    ctx.lineWidth = 2;
    ctx.strokeRect(-r, -r, r * 2, r * 2);
    ctx.fillStyle = b.color;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + p;
      const d = r * (0.55 + p * 0.4);
      ctx.fillRect(Math.round(Math.cos(a) * d) - 1, Math.round(Math.sin(a) * d) - 1, 2, 2);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const drawStory = () => {
    const beats = BEATS[locale];
    const beat = beats[beatIndex % beats.length];
    // Fade in/out within hold window
    const fade = Math.min(1, beatAge * 2, Math.max(0, (BEAT_HOLD - beatAge) * 2));
    const stripH = Math.max(64, Math.min(88, h * 0.1));
    const y0 = h - stripH - 10;

    ctx.fillStyle = "rgba(7,13,24,0.72)";
    ctx.fillRect(0, y0, w, stripH + 10);

    // top rule
    ctx.fillStyle = ALLY;
    ctx.globalAlpha = 0.55 * fade;
    ctx.fillRect(16, y0, Math.min(220, w * 0.22), 2);

    ctx.globalAlpha = fade;
    ctx.fillStyle = FOE;
    ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(beat.kicker, 18, y0 + 22);

    ctx.fillStyle = "#e8eef8";
    ctx.font = "600 15px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(beat.line, 18, y0 + 46);

    // chase meter on the right of the strip
    const meterW = Math.min(180, w * 0.18);
    const meterX = w - meterW - 20;
    const courier = ships.find((s) => s.role === "courier");
    const hunter = ships.find((s) => s.role === "hunter");
    let pressure = 0.45;
    if (courier && hunter) {
      pressure = Math.max(0.08, Math.min(0.95, 1 - (hunter.x - courier.x) / (w * 0.55)));
    }
    ctx.globalAlpha = 0.9 * fade;
    ctx.fillStyle = HUD;
    ctx.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(locale === "es" ? "PRESIÓN HOSTIL" : "HOSTILE PRESSURE", meterX, y0 + 20);
    ctx.fillStyle = "#121a2b";
    ctx.fillRect(meterX, y0 + 28, meterW, 8);
    ctx.fillStyle = pressure > 0.7 ? ALERT : pressure > 0.4 ? FOE : ALLY;
    ctx.fillRect(meterX, y0 + 28, Math.round(meterW * pressure), 8);
    ctx.strokeStyle = ALLY;
    ctx.globalAlpha = 0.5 * fade;
    ctx.strokeRect(meterX + 0.5, y0 + 28.5, meterW - 1, 7);

    ctx.globalAlpha = 1;
  };

  const tick = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    t += dt;
    beatAge += dt;
    if (beatAge >= BEAT_HOLD) {
      beatAge = 0;
      beatIndex = (beatIndex + 1) % BEATS[locale].length;
    }

    ctx.fillStyle = SPACE;
    ctx.fillRect(0, 0, w, h);

    // Fast parallax — chase speed
    for (const st of stars) {
      const speed = st.layer === 0 ? 40 : st.layer === 1 ? 110 : 220;
      st.x -= speed * dt;
      if (st.x < 0) st.x = w;
      st.tw += dt * 4;
      ctx.globalAlpha = 0.3 + st.layer * 0.22 + Math.sin(st.tw) * 0.1;
      ctx.fillStyle = st.layer === 2 ? ALLY : st.layer === 1 ? FOE : HUD;
      ctx.fillRect(Math.round(st.x), Math.round(st.y), st.s, st.s);
    }
    ctx.globalAlpha = 1;

    // Speed lines (pursuit)
    ctx.strokeStyle = "rgba(61,255,154,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 14; i++) {
      const y = ((t * 90 + i * 57) % h);
      const len = 40 + (i % 5) * 18;
      const x = w - ((t * 280 + i * 90) % (w + 80));
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
    }
    ctx.stroke();

    // Courier path retarget — weave through mid + bottom
    retargetIn -= dt;
    if (retargetIn <= 0) {
      retargetIn = rand(0.9, 1.8);
      // Strong bias to the band under the portal cards (where the lobby felt empty)
      courierTargetY =
        Math.random() < 0.72 ? rand(0.62, 0.86) : rand(0.22, 0.48);
    }
    courierY += (courierTargetY - courierY) * Math.min(1, dt * 1.6);

    const courier = ships.find((s) => s.role === "courier");
    if (courier) {
      const targetX = w * 0.3 + Math.sin(t * 0.7) * w * 0.04;
      courier.x += (targetX - courier.x) * Math.min(1, dt * 2);
      const targetPy = courierY * h;
      courier.vy = (targetPy - courier.y) * 3;
      courier.y += courier.vy * dt;
      courier.bank = courier.vy / 320;
      courier.fireCd -= dt;
      if (courier.fireCd <= 0) {
        courier.fireCd = courier.fireEvery;
        fire(courier, "right", "ally");
      }
    }

    // Flight corridor mark under the lobby cards (the previously empty band)
    {
      const bandY = h * 0.7;
      ctx.strokeStyle = "rgba(61,255,154,0.12)";
      ctx.setLineDash([8, 10]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, bandY);
      for (let x = 0; x <= w; x += 40) {
        ctx.lineTo(x, bandY + Math.sin(t * 2 + x * 0.02) * 18);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Hunters: pack chase — first 4 glued to the bottom corridor with the courier
    const hunters = ships.filter((s) => s.role === "hunter");
    hunters.forEach((s, i) => {
      const lowPack = i < 4;
      const laneY = lowPack
        ? h *
          (0.64 +
            (i / 3) * 0.2 +
            Math.sin(t * 1.4 + i) * 0.03)
        : h *
          (0.12 +
            ((i - 4) / Math.max(1, hunters.length - 5)) * 0.4 +
            Math.sin(t * 1.1 + i) * 0.04);
      const followX = (courier?.x ?? w * 0.3) + 110 + i * 48 + Math.sin(t + i) * 12;
      s.x += (followX - s.x) * Math.min(1, dt * 1.6);
      s.y += (laneY - s.y) * Math.min(1, dt * 2.4);
      s.bank = (laneY - s.y) / 200;
      s.hpFlash = Math.max(0, s.hpFlash - dt);
      s.fireCd -= dt;
      if (s.fireCd <= 0) {
        s.fireCd = s.fireEvery;
        fire(s, "left", "foe");
      }
      if (s.x > w + 40) s.x = w * 0.7;

      // Pursuit lock line — sells the chase story
      if (courier && i < 4) {
        ctx.strokeStyle = "rgba(255,95,87,0.22)";
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.round(s.x), Math.round(s.y));
        ctx.lineTo(Math.round(courier.x + 20), Math.round(courier.y));
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Wingmen: one glued under courier (fills bottom), one above
    const wings = ships.filter((s) => s.role === "wing");
    wings.forEach((wing, wi) => {
      if (!courier) return;
      const wx = courier.x - 80 + Math.sin(t * 1.3 + wi) * 24;
      const wy =
        wi === 0
          ? Math.min(h * 0.92, courier.y + 78 + Math.sin(t * 0.9) * 24)
          : Math.max(h * 0.1, courier.y - 90 + Math.cos(t * 1.1) * 20);
      wing.x += (wx - wing.x) * Math.min(1, dt * 2.2);
      wing.y += (wy - wing.y) * Math.min(1, dt * 2.2);
      wing.bank = (wy - wing.y) / 180;
      wing.fireCd -= dt;
      if (wing.fireCd <= 0) {
        wing.fireCd = wing.fireEvery;
        fire(wing, "right", "ally");
      }
    });

    // Bullets + hits
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      if (b.life <= 0 || b.x < -50 || b.x > w + 50 || b.y < -20 || b.y > h + 20) {
        bullets.splice(i, 1);
        continue;
      }

      let hit = false;
      for (const s of ships) {
        const bulletHostile = b.team === "foe";
        const shipHostile = s.role === "hunter";
        if (bulletHostile === shipHostile) continue;
        // allies don't kill courier; hunters take hits from ally fire
        if (s.role === "courier" && !bulletHostile) continue;
        if (s.role === "wing" && !bulletHostile) continue;
        const dx = s.x - b.x;
        const dy = s.y - b.y;
        if (dx * dx + dy * dy < s.size * s.size * 0.65) {
          s.hpFlash = 0.25;
          boom(s.x, s.y, bulletHostile ? ALERT : ALLY);
          bullets.splice(i, 1);
          hit = true;
          // knock hunter back instead of removing — keeps the chase going
          if (s.role === "hunter") {
            s.x += 50;
            s.y += rand(-30, 30);
          }
          break;
        }
      }
      if (!hit) drawBullet(b);
    }

    for (const s of ships) drawShip(s);

    for (let i = booms.length - 1; i >= 0; i--) {
      const b = booms[i];
      b.life -= dt;
      if (b.life <= 0) {
        booms.splice(i, 1);
        continue;
      }
      drawBoom(b);
    }

    // Bottom radar ticks so the lower edge always has motion markers
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = ALLY;
    for (let x = 20; x < w; x += 64) {
      const pulse = (Math.sin(t * 6 + x) + 1) * 0.5;
      ctx.fillRect(x, h - 6, 10, 3 + pulse * 3);
    }
    ctx.fillStyle = FOE;
    for (let x = 40; x < w; x += 64) {
      ctx.fillRect(x, h - 14, 6, 2);
    }
    ctx.globalAlpha = 1;

    // scanlines
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);

    drawStory();

    raf = requestAnimationFrame(tick);
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
  last = performance.now();
  raf = requestAnimationFrame(tick);

  return {
    setLocale,
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
    },
  };
}
