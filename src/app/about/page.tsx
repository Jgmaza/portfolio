import { redirect } from "next/navigation";

/** Alias: Player dossier vive en `/player` (frame 07). */
export default function AboutRedirect() {
  redirect("/player");
}
