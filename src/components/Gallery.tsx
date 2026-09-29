"use client";

import { useState } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Download } from "lucide-react";
import type { GalleryPhoto } from "@/data/galleries";

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square overflow-hidden group"
          >
            <ImageWithLoader
              src={photo.url}
              alt="Client gallery photo"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {photo.isFavorite && (
              <Heart
                size={16}
                className="absolute top-2 right-2 text-gold"
                fill="currentColor"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg/97 flex items-center justify-center"
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-ink hover:text-gold z-10"
              aria-label="Close viewer"
            >
              <X size={28} />
            </button>
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 text-ink hover:text-gold z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 text-ink hover:text-gold z-10"
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative w-[90vw] h-[80vh]"
            >
              <ImageWithLoader
                src={photos[activeIndex].url}
                alt="Client gallery photo, full view"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button className="absolute bottom-8 flex items-center gap-2 text-xs tracking-widest2 uppercase text-ink border border-ink/30 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors">
              <Download size={14} /> Download
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
