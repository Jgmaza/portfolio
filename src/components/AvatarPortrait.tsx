import { player } from "@/content/player";

type PortraitSize = "sm" | "select" | "xl";

type AvatarPortraitProps = {
  size?: PortraitSize;
  showMeta?: boolean;
  /** Slow Y-axis turntable — character-select vibe */
  spinning?: boolean;
};

function PortraitFace({
  photo,
  showMeta,
  face,
}: {
  photo: string | null;
  showMeta: boolean;
  face: "front" | "back";
}) {
  return (
    <div className={`avatar-portrait__face avatar-portrait__face--${face}`}>
      <div className="avatar-portrait__frame">
        {photo ? (
          <img
            src={photo}
            alt={face === "front" ? player.name : ""}
            className="avatar-portrait__img"
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export function AvatarPortrait({
  size = "select",
  showMeta = true,
  spinning = true,
}: AvatarPortraitProps) {
  const photo = player.avatar.photo;

  return (
    <div
      className={[
        "avatar-portrait",
        `avatar-portrait--${size}`,
        spinning ? "avatar-portrait--spin" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="avatar-portrait__stage">
        <div className="avatar-portrait__halo" aria-hidden />
        <div className="avatar-portrait__ring avatar-portrait__ring--outer" aria-hidden />
        <div className="avatar-portrait__ring avatar-portrait__ring--inner" aria-hidden />

        <div className="avatar-portrait__figure">
          <PortraitFace photo={photo} showMeta={showMeta} face="front" />
          <PortraitFace photo={photo} showMeta={showMeta} face="back" />
        </div>

        <div className="avatar-portrait__pedestal" aria-hidden>
          <span className="avatar-portrait__pedestal-glow" />
        </div>

        <span className="avatar-portrait__lvl">{player.avatar.level}</span>
      </div>
    </div>
  );
}
