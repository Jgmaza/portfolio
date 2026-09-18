import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jgmaza-portfolio.vercel.app"),
  title: {
    default: "José Maza — Fullstack Product Engineer",
    template: "%s · José Maza",
  },
  description:
    "Portafolio de José Maza (Jgmaza): productos fullstack, agentes AI e integraciones — demos vivas y case studies.",
  openGraph: {
    title: "José Maza — Fullstack Product Engineer",
    description:
      "Productos, agentes AI e integraciones con demos desplegadas.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "José Maza — Fullstack Product Engineer",
    description:
      "Productos, agentes AI e integraciones con demos desplegadas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${outfit.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]: "var(--font-fraunces)",
            ["--font-body" as string]: "var(--font-outfit)",
          } as React.CSSProperties
        }
      >
        <div className="noise" aria-hidden />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
