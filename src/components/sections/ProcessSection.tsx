"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We learn your story, your people, and what this event truly means to you.",
  },
  {
    number: "02",
    title: "PLAN",
    description:
      "We map every service you need — coverage, design, delivery — into one plan.",
  },
  {
    number: "03",
    title: "CAPTURE",
    description:
      "On the day, our team disappears into the background and captures everything.",
  },
  {
    number: "04",
    title: "CREATE",
    description:
      "Raw footage becomes films, photos become frames, moments become design.",
  },
  {
    number: "05",
    title: "DELIVER",
    description:
      "Your gallery goes live. Every photo and film, organised and ready.",
  },
  {
    number: "06",
    title: "PRESERVE",
    description:
      "Albums, prints and frames — the physical memories that outlast the screen.",
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading eyebrow="How We Work" title={"THE STUDIO\nPROCESS."} className="mb-16" />

        <div className="grid md:grid-cols-6 gap-2 md:gap-0 mb-12">
          {steps.map((step, i) => (
            <button
              key={step.number}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "text-left border-t md:border-t-2 pt-5 pr-4 transition-colors duration-300",
                active === i ? "border-gold" : "border-white/15"
              )}
            >
              <span
                className={cn(
                  "block text-xs mb-3 tracking-widest2",
                  active === i ? "text-gold" : "text-muted"
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "font-serif text-lg md:text-xl",
                  active === i ? "text-ink" : "text-ink/60"
                )}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted max-w-xl leading-relaxed text-lg"
          >
            {steps[active].description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
