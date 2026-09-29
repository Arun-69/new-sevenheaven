"use client";

import { useState } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Modal from "@/components/Modal";
import { films } from "@/data/films";

export default function FilmsSection() {
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const featured = films.slice(0, 4);
  const activeFilmData = films.find((f) => f.id === activeFilm);

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading eyebrow="In Motion" title={"MOTION THAT\nFEELS LIKE A MEMORY."} />
          <Reveal delay={0.15}>
            <Link
              href="/films"
              className="text-xs tracking-widest2 uppercase text-gold gold-underline"
            >
              Watch All Films →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featured.map((film, i) => (
            <Reveal key={film.id} delay={i * 0.05}>
              <button
                onClick={() => setActiveFilm(film.id)}
                className="group relative aspect-[3/4] w-full overflow-hidden block text-left"
              >
                <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                  <ImageWithLoader
                    src={film.thumbnail}
                    alt={film.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-bg/30 group-hover:bg-bg/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full border border-ink/60 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-colors">
                    <Play size={18} className="text-ink group-hover:text-bg" fill="currentColor" />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-xs tracking-widest2 uppercase text-gold mb-1">
                    {film.category}
                  </p>
                  <p className="font-serif text-lg text-ink">{film.title}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal isOpen={!!activeFilm} onClose={() => setActiveFilm(null)}>
        {activeFilmData && (
          <div className="relative aspect-video w-full bg-black/40 flex items-center justify-center border border-white/10">
            <ImageWithLoader
              src={activeFilmData.thumbnail}
              alt={activeFilmData.title}
              fill
              sizes="90vw"
              className="object-cover opacity-40"
            />
            <div className="relative z-10 text-center px-6">
              <p className="text-gold text-xs tracking-widest2 uppercase mb-2">
                {activeFilmData.category}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-ink mb-2">
                {activeFilmData.title}
              </p>
              <p className="text-muted text-sm">
                Video player placeholder · {activeFilmData.duration}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
