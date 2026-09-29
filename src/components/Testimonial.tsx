"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Reveal from "./Reveal";

export default function Testimonial() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
      {testimonials.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.05} className="shrink-0 snap-start w-[85vw] md:w-[420px]">
          <div className="border border-white/10 p-8 md:p-10 h-full flex flex-col justify-between bg-white/[0.02]">
            <div>
              <div className="flex gap-1 mb-6 text-gold">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl leading-relaxed text-ink text-balance">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-8">
              <p className="text-ink text-sm tracking-wide">{t.clientNames}</p>
              <p className="text-muted text-xs mt-1">{t.eventType}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
