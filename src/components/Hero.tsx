"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DEFAULT_HERO_IMAGE } from "@/lib/hero-default";
import ImageWithLoader from "@/components/ImageWithLoader";

export default function Hero({ image }: { image?: string } = {}) {
  const heroImage = image || DEFAULT_HERO_IMAGE;
  return (
    <section className="relative h-[100vh] w-full overflow-hidden flex items-end">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute inset-0"
      >
        <ImageWithLoader
          src={heroImage}
          alt="Bride and groom in a candid embrace, cinematic wedding photography"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />
      <div className="grain-overlay" />

      <div className="container-edit relative z-10 pb-24 md:pb-28 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-gold text-xs md:text-sm tracking-widest2 uppercase mb-4"
        >
          Photography · Films · Design · Albums · Events
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
          className="font-serif text-[13vw] md:text-[7vw] leading-[0.95] tracking-tight text-ink text-balance"
        >
          YOUR MOMENT.
          <br />
          OUR STORY.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: "easeOut" }}
          className="mt-6 max-w-md text-muted text-base md:text-lg leading-relaxed"
        >
          From the first invitation to the final album, we create everything
          that makes your event unforgettable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 bg-ink text-bg px-7 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold transition-colors duration-300"
          >
            Explore Our Stories
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 border border-ink/40 text-ink px-7 py-3.5 text-xs tracking-widest2 uppercase hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Plan Your Event
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-12 z-10 flex flex-col items-center gap-2 text-ink/70"
      >
        <span className="text-[10px] tracking-widest2 uppercase [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-gold"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
