import type { Metadata } from "next";
import FilmsGallery from "@/components/FilmsGallery";

export const metadata: Metadata = {
  title: "Cinematic Wedding Films & Videography",
  description:
    "Cinematic wedding films, teasers and event videography by Seven Heaven Photography, Perambalur — motion that feels like a memory.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  return <FilmsGallery />;
}