"use client";

import { useState, useMemo } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import EventSelector from "@/components/EventSelector";
import Reveal from "@/components/Reveal";
import { eventTypes, type EventType, type Story } from "@/data/stories";

export default function EventTypesSection({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState<EventType>("Wedding");

  const featured = useMemo(() => {
    const matches = stories.filter((s) => s.eventType === active);
    return matches[0] ?? stories[0];
  }, [active, stories]);

  if (!featured) return null;

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading eyebrow="Your Event" title={"WHAT ARE YOU\nCELEBRATING?"} className="mb-12" />

        <Reveal delay={0.15}>
          <EventSelector options={eventTypes} active={active} onChange={setActive} />
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <ImageWithLoader
                  src={featured.coverImage}
                  alt={featured.clientNames}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={featured.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gold text-xs tracking-widest2 uppercase mb-3">
                {featured.eventType} · {featured.location} · {featured.year}
              </p>
              <h3 className="font-serif text-3xl md:text-5xl mb-4">
                {featured.clientNames}
              </h3>
              <p className="text-muted leading-relaxed max-w-md mb-8">
                {featured.excerpt}
              </p>
              <Link
                href={`/stories/${featured.slug}`}
                className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 text-xs tracking-widest2 uppercase hover:bg-gold hover:text-bg transition-colors"
              >
                View Story →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
