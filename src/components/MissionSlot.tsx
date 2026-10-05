import Link from "next/link";

type MissionSlotProps = {
  index: number;
  title: string;
  tag: string;
  accent?: string;
  href: string;
  live?: boolean;
};

export function MissionSlot({
  index,
  title,
  tag,
  accent = "#0d7377",
  href,
  live = true,
}: MissionSlotProps) {
  return (
    <Link href={href} className="mission-slot">
      <span className="mission-slot__idx">
        {String(index).padStart(2, "0")}
      </span>
      <span
        className="mission-slot__pip"
        style={{ background: accent }}
        aria-hidden
      />
      <span className="mission-slot__copy">
        <span className="mission-slot__title">{title}</span>
        <span className="mission-slot__tag">{tag}</span>
      </span>
      {live ? <span className="mission-slot__live">LIVE</span> : null}
    </Link>
  );
}
