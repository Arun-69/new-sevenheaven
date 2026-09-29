"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import EventSelector from "@/components/EventSelector";
import Modal from "@/components/Modal";
import CTA from "@/components/CTA";
import ImageWithLoader from "@/components/ImageWithLoader";
import { films, filmCategories, type FilmCategory } from "@/data/films";

export default function FilmsGallery() {
  const [activeCategory, setActiveCategory] = useState<FilmCategory | "All">(
    "All"
  );
  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? films
      : films.filter((f) => f.category === activeCategory);

  const activeFilmData = films.find((f) => f.id === activeFilm);

  return (
    <>
      <section className="pt-40 md:pt-52 pb-16 container-edit">
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            In Motion
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl">
            MOTION THAT FEELS LIKE A MEMORY.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <EventSelector
              options={["All", ...filmCategories]}
              active={activeCategory}
              onChange={(v) => setActiveCategory(v as FilmCategory | "All")}
            />
          </div>
        </Reveal>
      </section>

      <section className="container-edit pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((film, i) => (
            <Reveal key={film.id} delay={(i % 3) * 0.05}>
              <button
                onClick={() => setActiveFilm(film.id)}
                className="group relative aspect-video w-full overflow-hidden block text-left"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <ImageWithLoader
                    src={film.thumbnail}
                    alt={film.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
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
                  <p className="text-xs text-muted mt-1">{film.duration}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

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

      <CTA
        title="WANT A FILM LIKE THIS?"
        description="Every film is cut to feel like the day it captures."
        primaryLabel="Plan Your Event"
        primaryHref="/packages"
      />
    </>
  );
}
