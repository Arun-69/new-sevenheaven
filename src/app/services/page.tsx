import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTA from "@/components/CTA";
import { serviceCategories } from "@/data/services";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wedding Photography, Videography & Event Services",
  description:
    "Candid wedding photography, pre-wedding shoots, cinematic wedding films, albums and event media services in Perambalur and across Tamil Nadu.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="pt-40 md:pt-52 pb-20 container-edit">
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            What We Offer
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl">
            EVERYTHING UNDER ONE ROOF.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted mt-6 max-w-lg leading-relaxed">
            One studio for the entire lifecycle of your event — from the first
            invitation to the final album.
          </p>
        </Reveal>
      </section>

      <section className="container-edit pb-28 space-y-24">
        {serviceCategories.map((cat, catIdx) => (
          <div key={cat.key} id={cat.key.toLowerCase()}>
            <SectionHeading eyebrow={cat.subheading} title={cat.heading} className="mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {services.filter((s) => s.category === cat.key).map((service, i) => (
                <Reveal key={service.id} delay={i * 0.04}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CTA
        title="NOT SURE WHAT YOU NEED?"
        description="Tell us about your event and we'll build a package around it."
        primaryLabel="Build Your Package"
        primaryHref="/packages"
      />
    </>
  );
}