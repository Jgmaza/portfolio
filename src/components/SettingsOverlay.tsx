"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/content/player";
import { THEME_IDS, THEME_SWATCHES, type ThemeId } from "@/lib/themes";

export function SettingsOverlay() {
  const {
    t,
    locale,
    setLocale,
    theme,
    setTheme,
    settingsOpen,
    closeSettings,
  } = useLocale();

  if (!settingsOpen) return null;

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

        <div className="settings-overlay__row">
          <div className="settings-overlay__group">
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
                  onClick={() => setLocale(code as Locale)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-overlay__group">
            <p className="settings-overlay__lab">{t.settings.colorimetry}</p>
            <div
              className="settings-overlay__palettes"
              role="listbox"
              aria-label={t.settings.colorimetry}
            >
              {THEME_IDS.map((id) => {
                const swatch = THEME_SWATCHES[id];
                const on = theme === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="option"
                    aria-selected={on}
                    aria-label={swatch.label[locale]}
                    title={swatch.label[locale]}
                    className={
                      on
                        ? "settings-overlay__palette settings-overlay__palette--on"
                        : "settings-overlay__palette"
                    }
                    onClick={() => setTheme(id as ThemeId)}
                  >
                    <span
                      className="settings-overlay__palette-half"
                      style={{ background: swatch.accent }}
                    />
                    <span
                      className="settings-overlay__palette-half"
                      style={{ background: swatch.negative }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
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
