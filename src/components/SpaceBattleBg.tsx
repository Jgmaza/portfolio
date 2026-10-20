"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { SpaceBattleHandle } from "@/lib/space-battle";

const LITE_MQ = "(max-width: 719px)";
const MOTION_MQ = "(prefers-reduced-motion: reduce)";

/**
 * Full-bleed retro 2D atmosphere behind HomePortals.
 * Lite density on small viewports; off when reduced-motion is set.
 */
export function SpaceBattleBg() {
  const { locale, theme } = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<SpaceBattleHandle | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [density, setDensity] = useState<"full" | "lite">("full");

  useEffect(() => {
    const lite = window.matchMedia(LITE_MQ);
    const reduce = window.matchMedia(MOTION_MQ);

    const sync = () => {
      setEnabled(!reduce.matches);
      setDensity(lite.matches ? "lite" : "full");
    };
    sync();

    lite.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      lite.removeEventListener("change", sync);
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
      handle = createSpaceBattle(canvasRef.current, { locale, density });
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
    // density remounts a lighter / fuller fleet when crossing the breakpoint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, density]);

  useEffect(() => {
    handleRef.current?.setLocale(locale);
  }, [locale]);

  useEffect(() => {
    handleRef.current?.syncPalette();
  }, [theme]);

  if (!enabled) return null;

  return (
    <div className="home-space-bg" aria-hidden data-density={density}>
      <canvas ref={canvasRef} className="home-space-bg__canvas" />
      <div className="home-space-bg__scrim" />
    </div>
  );
}
