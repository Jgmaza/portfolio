import type { Metadata } from "next";
import { PlayerDossier } from "@/components/PlayerDossier";

export const metadata: Metadata = {
  title: "Player",
  description: "Player dossier — origin, mission clears, and trophies.",
};

export default function PlayerPage() {
  return <PlayerDossier />;
}
