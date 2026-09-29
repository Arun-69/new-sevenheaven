import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PortfolioCard from "@/components/PortfolioCard";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Reveal from "@/components/Reveal";

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
    title: "Event Poster",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media Design",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CreativeSection() {
  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="Design & Editing"
            title={"YOUR EVENT STARTS\nBEFORE THE EVENT."}
          />
          <Reveal delay={0.15}>
            <Link
              href="/creative"
              className="text-xs tracking-widest2 uppercase text-gold gold-underline"
            >
              See Creative Work →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {creativeItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <PortfolioCard image={item.image} title={item.title} aspect="aspect-[4/5]" />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-xs tracking-widest2 uppercase text-gold mb-6">
            From Raw To Final
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop&sat=-100"
            afterImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop"
            beforeLabel="Original"
            afterLabel="Final Design"
          />
        </Reveal>
      </div>
    </section>
  );
}
