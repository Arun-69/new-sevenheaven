import SectionHeading from "@/components/SectionHeading";
import PriceCard from "@/components/PriceCard";
import Reveal from "@/components/Reveal";
import { getPricingTiers } from "@/lib/content";

export default async function PricingSection() {
  const pricingTiers = await getPricingTiers();

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading
          eyebrow="Pricing"
          title={"SIMPLE, TRANSPARENT\nPACKAGES."}
          align="center"
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto items-stretch">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <PriceCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-10">
          Prices vary by location, guest count and season. Need something custom?{" "}
          <a href="#builder" className="text-gold hover:underline">
            Build your own package below
          </a>
          .
        </p>
      </div>
    </section>
  );
}
