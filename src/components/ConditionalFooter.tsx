"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";

/** Hide footer on single-viewport routes (home / player). */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/player" || pathname === "/about") {
    return null;
  }
  return <SiteFooter />;
}
