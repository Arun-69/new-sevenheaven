import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PortfolioCard from "@/components/PortfolioCard";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CTA from "@/components/CTA";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Creative Design — ${siteConfig.name}`,
  description:
    "Invitations, posters, social media design and photo editing — the visual language of your event.",
};

const creativeItems = [
  {
    title: "Wedding Invitation",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Digital Invitation",
    image:
      "https://images.unsplash.com/photo-1607190074257-dd4b7af0309b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Birthday Invitation",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Event Poster",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media Design",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Album Design",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
  },
];

const editingStages = [
  "Color Grading",
  "Retouching",
  "Lighting",
  "Composition",
  "Creative Editing",
];

export default function CreativePage() {
  return (
    <>
      <section className="pt-40 md:pt-52 pb-16 container-edit">
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            Design & Editing
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl">
            YOUR EVENT STARTS BEFORE THE EVENT.
          </h1>
        </Reveal>
      </section>

      <section className="container-edit pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {creativeItems.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.05}>
              <PortfolioCard image={item.image} title={item.title} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-edit pb-28">
        <SectionHeading eyebrow="Editing Quality" title={"FROM RAW\nTO WOW."} className="mb-10" />
        <Reveal delay={0.1}>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop&sat=-100"
            afterImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop"
            beforeLabel="Raw Photo"
            afterLabel="Final Photo"
          />
        </Reveal>
        <div className="flex flex-wrap gap-3 mt-8">
          {editingStages.map((stage) => (
            <span
              key={stage}
              className="text-xs tracking-widest2 uppercase border border-white/15 px-4 py-2 text-muted"
            >
              {stage}
            </span>
          ))}
        </div>
      </section>

      <CTA
        title="LET'S DESIGN YOUR EVENT IDENTITY."
        description="Invitations, posters and social content that set the tone before anyone arrives."
        primaryLabel="Request a Quote"
        primaryHref="/packages"
      />
    </>
  );
}
