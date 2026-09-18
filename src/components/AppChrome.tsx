"use client";

import { LocaleProvider } from "@/components/LocaleProvider";
import { SettingsOverlay } from "@/components/SettingsOverlay";
import { SiteHeader } from "@/components/SiteHeader";
import { ConditionalFooter } from "@/components/ConditionalFooter";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="app-shell">
        <SiteHeader />
        <main className="app-shell__main viewport-main">{children}</main>
        <ConditionalFooter />
      </div>
      <SettingsOverlay />
    </LocaleProvider>
  );
}
