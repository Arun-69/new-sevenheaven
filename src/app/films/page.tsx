import type { Metadata } from "next";
import FilmsGallery from "@/components/FilmsGallery";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Films — ${siteConfig.name}`,
  description: `Cinematic wedding and event films by ${siteConfig.name} — motion that feels like a memory.`,
};

export default function FilmsPage() {
  return <FilmsGallery />;
}
