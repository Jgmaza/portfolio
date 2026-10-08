"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterLoreProps = {
  quote: string;
  paragraphs: string[];
  onDone?: () => void;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TypewriterLore({
  quote,
  paragraphs,
  onDone,
}: TypewriterLoreProps) {
  const paraKey = paragraphs.join("\0");
  const blocks = useMemo(
    () => [
      { kind: "quote" as const, text: quote },
      ...paragraphs.map((text) => ({ kind: "line" as const, text })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by paraKey
    [quote, paraKey],
  );

  const [blockIndex, setBlockIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setBlockIndex(0);
    setCharIndex(0);
    setDone(false);

    if (prefersReducedMotion()) {
      setDone(true);
      onDone?.();
    }
  }, [quote, paraKey, onDone]);

  useEffect(() => {
    if (done) return;

    if (blockIndex >= blocks.length) {
      setDone(true);
      onDone?.();
      return;
    }

    const current = blocks[blockIndex].text;
    if (charIndex >= current.length) {
      const pause = window.setTimeout(() => {
        setBlockIndex((i) => i + 1);
        setCharIndex(0);
      }, blockIndex === 0 ? 420 : 260);
      return () => window.clearTimeout(pause);
    }

    const ch = current[charIndex];
    const delay = ch === " " ? 16 : ch === "." || ch === "," ? 50 : 26;
    const tick = window.setTimeout(() => setCharIndex((c) => c + 1), delay);
    return () => window.clearTimeout(tick);
  }, [blockIndex, blocks, charIndex, done, onDone]);

  const finishNow = () => {
    setDone(true);
    onDone?.();
  };

  if (done) {
    return (
      <div className="cmd-lore">
        <p className="cmd-lore__quote">&ldquo;{quote}&rdquo;</p>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)} className="cmd-lore__line cmd-lore__line--muted">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="cmd-lore" aria-live="polite">
      {blocks.slice(0, blockIndex).map((block, i) =>
        block.kind === "quote" ? (
          <p key={`q-${i}`} className="cmd-lore__quote">
            &ldquo;{block.text}&rdquo;
          </p>
        ) : (
          <p key={`l-${i}`} className="cmd-lore__line cmd-lore__line--muted">
            {block.text}
          </p>
        ),
      )}
      {blockIndex < blocks.length ? (
        <p
          className={
            blocks[blockIndex].kind === "quote"
              ? "cmd-lore__quote"
              : "cmd-lore__line cmd-lore__line--muted"
          }
        >
          {blocks[blockIndex].kind === "quote" ? (
            <>
              &ldquo;{blocks[blockIndex].text.slice(0, charIndex)}
            </>
          ) : (
            blocks[blockIndex].text.slice(0, charIndex)
          )}
          <span className="cmd-lore__cursor" aria-hidden />
        </p>
      ) : null}
      <button type="button" className="cmd-lore__skip" onClick={finishNow}>
        SKIP_ ▶
      </button>
    </div>
  );
}
