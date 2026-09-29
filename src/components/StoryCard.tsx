"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Story } from "@/data/stories";
import ImageWithLoader from "@/components/ImageWithLoader";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <motion.div
        whileHover="hover"
        initial="rest"
        className="relative aspect-[3/4] overflow-hidden"
      >
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.1 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <ImageWithLoader
            src={story.coverImage}
            alt={`${story.clientNames} — ${story.eventType} in ${story.location}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={{ rest: { opacity: 0.3 }, hover: { opacity: 0.65 } }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-bg"
        />

        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <p className="text-gold text-xs tracking-widest2 uppercase">
              {story.eventType}
            </p>
            <p className="text-muted text-xs mt-1">
              {story.location} · {story.year}
            </p>
          </div>

          <div>
            <motion.h3
              variants={{ rest: { y: 0 }, hover: { y: -6 } }}
              transition={{ duration: 0.4 }}
              className="font-serif text-2xl md:text-3xl text-ink mb-3"
            >
              {story.clientNames}
            </motion.h3>
            <motion.div
              variants={{
                rest: { opacity: 0, x: -8 },
                hover: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 text-xs tracking-widest2 uppercase text-ink"
            >
              View Story <ArrowUpRight size={14} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
