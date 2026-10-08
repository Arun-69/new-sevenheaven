import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PricingSection from "@/components/sections/PricingSection";
import PackageBuilder from "@/components/PackageBuilder";

export const metadata: Metadata = {
  title: "Wedding Photography Packages & Pricing",
  description:
    "Affordable, transparent wedding photography and videography packages in Perambalur, Tamil Nadu — or build your own custom package.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <div className="pt-40 md:pt-52">
        <div className="container-edit text-center mb-4">
          <Reveal>
            <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
              Our Packages
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] text-balance">
              PLANS &amp; PRICING.
            </h1>
          </Reveal>
        </div>
        <PricingSection />
      </div>

      <PackageBuilder />
    </>
  );
}