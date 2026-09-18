import type { Metadata } from "next";
import { Chakra_Petch, Sora } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nine-sand-57.vercel.app"),
  title: {
    default: "José Maza — Build Catalog",
    template: "%s · José Maza",
  },
  description:
    "Catálogo estilo videojuego de productos, agentes AI e integraciones — demos vivas con preview.",
  openGraph: {
    title: "José Maza — Build Catalog",
    description:
      "Productos, agentes AI e integraciones con demos desplegadas.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${chakra.variable} ${sora.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]: "var(--font-chakra)",
            ["--font-body" as string]: "var(--font-sora)",
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
