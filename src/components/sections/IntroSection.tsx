"use client";

import { useState } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

const words = [
  {
    label: "CAPTURE",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
  },
  {
    label: "CREATE",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    label: "PRESERVE",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function IntroSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-edit relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
              Who We Are
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
              MORE THAN
              <br />A PHOTO STUDIO.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted mt-6 max-w-md leading-relaxed">
              We capture the moments, create the visuals, and preserve the
              memories that make your event yours.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col gap-1">
              {words.map((word, i) => (
                <button
                  key={word.label}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="text-left border-b border-white/10 py-5 group"
                >
                  <span
                    className={`font-serif text-3xl md:text-5xl tracking-tight transition-colors duration-300 ${
                      hovered === i ? "text-gold" : "text-ink/80"
                    }`}
                  >
                    {word.label}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative aspect-[4/5] hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={hovered ?? "default"}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ImageWithLoader
                src={words[hovered ?? 0].image}
                alt={words[hovered ?? 0].label}
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
