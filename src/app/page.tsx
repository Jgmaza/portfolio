import type { Metadata } from "next";
import { HomePortals } from "@/components/HomePortals";

export const metadata: Metadata = {
  title: {
    absolute: "José Maza — Build Catalog",
  },
  description:
    "Select destination: mission board catalog or player dossier.",
};

export default function HomePage() {
  return <HomePortals />;
}
