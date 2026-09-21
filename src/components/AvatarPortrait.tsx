"use client";

import { useEffect, useState } from "react";
import { player } from "@/content/player";

type PortraitSize = "sm" | "select" | "xl";

type AvatarPortraitProps = {
  size?: PortraitSize;
  showMeta?: boolean;
  /** Sprite / Y-axis turntable — character-select vibe */
  spinning?: boolean;
};

function Placeholder({ showMeta }: { showMeta: boolean }) {
  return (
    <div className="avatar-portrait__placeholder">
      <span className="avatar-portrait__jm">{player.avatar.initials}</span>
      {showMeta ? (
        <>
          <span className="avatar-portrait__pending">
            {player.avatar.pendingLabel}
          </span>
          <span className="avatar-portrait__hint">
            {player.avatar.pendingHint}
          </span>
        </>
      ) : null}
    </div>
  );
}

function SpriteTurntable({
  frames,
  spinning,
  frameWidth,
  frameHeight,
}: {
  frames: string[];
  spinning: boolean;
  frameWidth: number;
  frameHeight: number;
}) {
  const n = frames.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!spinning || n < 2) return;
    const ms = 480; // ~0.48s per frame
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, ms);
    return () => window.clearInterval(id);
  }, [spinning, n]);

  const active = spinning ? index : 0;

  return (
    <div
      className="avatar-portrait__turntable"
      style={{
        ["--avatar-fw" as string]: frameWidth,
        ["--avatar-fh" as string]: frameHeight,
      }}
    >
      <div className="avatar-portrait__turntable-window">
        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            className={[
              "avatar-portrait__turntable-frame",
              i === active ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export function AvatarPortrait({
  size = "select",
  showMeta = true,
  spinning = true,
}: AvatarPortraitProps) {
  const { photo, turntable, level } = player.avatar;
  const hasTurntable = Boolean(turntable?.frames?.length);
  const hasPhoto = Boolean(photo);

  return (
    <div
      className={[
        "avatar-portrait",
        `avatar-portrait--${size}`,
        hasTurntable ? "avatar-portrait--sprite" : "",
        spinning && hasTurntable ? "avatar-portrait--spin" : "",
        spinning && !hasTurntable && hasPhoto ? "avatar-portrait--flip" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="avatar-portrait__stage">
        <div className="avatar-portrait__halo" aria-hidden />
        <div
          className="avatar-portrait__ring avatar-portrait__ring--outer"
          aria-hidden
        />
        <div
          className="avatar-portrait__ring avatar-portrait__ring--inner"
          aria-hidden
        />

        <div className="avatar-portrait__figure">
          <div className="avatar-portrait__frame">
            {hasTurntable && turntable ? (
              <SpriteTurntable
                frames={turntable.frames}
                frameWidth={turntable.frameWidth}
                frameHeight={turntable.frameHeight}
                spinning={spinning}
              />
            ) : hasPhoto && photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={player.name}
                className="avatar-portrait__img"
              />
            ) : (
              <Placeholder showMeta={showMeta} />
            )}
          </div>
        </div>

        <div className="avatar-portrait__pedestal" aria-hidden>
          <span className="avatar-portrait__pedestal-glow" />
        </div>

        <span className="avatar-portrait__lvl">{level}</span>
      </div>
    </div>
  );
}
