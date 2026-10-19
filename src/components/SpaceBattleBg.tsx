"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { SpaceBattleHandle } from "@/lib/space-battle";

const DESKTOP_MQ = "(min-width: 720px)";
const MOTION_MQ = "(prefers-reduced-motion: reduce)";

/**
 * Desktop-only retro 2D pursuit behind HomePortals (full-bleed canvas + story beats).
 */
export function SpaceBattleBg() {
  const { locale } = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<SpaceBattleHandle | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_MQ);
    const reduce = window.matchMedia(MOTION_MQ);

    const sync = () => {
      setEnabled(desktop.matches && !reduce.matches);
    };
    sync();

    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let handle: SpaceBattleHandle | null = null;

    void import("@/lib/space-battle").then(({ createSpaceBattle }) => {
      if (cancelled || !canvasRef.current) return;
      handle = createSpaceBattle(canvasRef.current, { locale });
      handleRef.current = handle;
    });

    const onVisibility = () => {
      const h = handleRef.current;
      if (!h) return;
      if (document.hidden) h.pause();
      else h.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      const h = handleRef.current ?? handle;
      handleRef.current = null;
      h?.destroy();
    };
    // locale changes use setLocale below — don't remount the whole scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    handleRef.current?.setLocale(locale);
  }, [locale]);

  if (!enabled) return null;

  return (
    <div className="home-space-bg" aria-hidden>
      <canvas ref={canvasRef} className="home-space-bg__canvas" />
      <div className="home-space-bg__scrim" />
    </div>
  );
}
