import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { serviceCategories } from "@/data/services";
import { getServices } from "@/lib/content";

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section className="py-28 md:py-40 border-t border-white/10" id="services">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading eyebrow="What We Offer" title={"EVERYTHING\nUNDER ONE ROOF."} />
          <Reveal delay={0.15}>
            <Link
              href="/services"
              className="text-xs tracking-widest2 uppercase text-gold gold-underline"
            >
              View All Services →
            </Link>
          </Reveal>
        </div>

        <div className="space-y-20">
          {serviceCategories.map((cat, catIdx) => {
            const items = services.filter((s) => s.category === cat.key).slice(0, 4);
            return (
              <div key={cat.key} id={cat.key.toLowerCase()}>
                <Reveal delay={catIdx * 0.05}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-serif text-3xl md:text-4xl text-ink">
                      {cat.heading}
                    </span>
                    <span className="text-muted text-sm">{cat.subheading}</span>
                  </div>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {items.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
