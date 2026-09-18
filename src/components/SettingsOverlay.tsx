"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/content/player";

export function SettingsOverlay() {
  const { t, locale, setLocale, settingsOpen, closeSettings } = useLocale();

  if (!settingsOpen) return null;

  const pick = (next: Locale) => {
    setLocale(next);
  };

  return (
    <div className="settings-overlay" role="dialog" aria-modal="true">
      <button
        type="button"
        className="settings-overlay__backdrop"
        aria-label={t.settings.close}
        onClick={closeSettings}
      />
      <div className="settings-overlay__panel">
        <p className="settings-overlay__title">{t.settings.title}</p>
        <p className="settings-overlay__sub">{t.settings.sub}</p>
        <p className="settings-overlay__lab">{t.settings.language}</p>
        <div className="settings-overlay__langs">
          {(["es", "en"] as const).map((code) => (
            <button
              key={code}
              type="button"
              className={
                locale === code
                  ? "settings-overlay__lang settings-overlay__lang--on"
                  : "settings-overlay__lang"
              }
              onClick={() => pick(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="settings-overlay__close"
          onClick={closeSettings}
        >
          {t.settings.close}
        </button>
      </div>
    </div>
  );
}
