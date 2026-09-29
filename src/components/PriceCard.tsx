"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/data/pricing";

export default function PriceCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full border p-8 md:p-9 transition-all duration-300",
        tier.highlighted
          ? "border-gold bg-gold/[0.06] md:-translate-y-3 shadow-[0_0_60px_-15px_rgba(184,155,94,0.35)]"
          : "border-white/15 hover:border-white/30"
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg text-[10px] tracking-widest2 uppercase px-4 py-1.5">
          Most Popular
        </span>
      )}

      <p className="text-xs tracking-widest2 uppercase text-gold mb-3">
        {tier.name}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-4xl md:text-5xl text-ink">
          {tier.price}
        </span>
      </div>
      <p className="text-[11px] tracking-wide uppercase text-muted mt-1.5">
        {tier.priceNote}
      </p>

      <p className="text-sm text-muted leading-relaxed mt-5 min-h-[3rem]">
        {tier.description}
      </p>

      <ul className="flex-1 space-y-3 mt-7 mb-9">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/90">
            <Check size={15} className="text-gold shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/contact?package=${tier.id}`}
        className={cn(
          "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-widest2 uppercase transition-all duration-300 w-full",
          tier.highlighted
            ? "btn-gold"
            : "border border-ink/40 text-ink hover:border-gold hover:text-gold"
        )}
      >
        Enquire Now
      </Link>
    </div>
  );
}
