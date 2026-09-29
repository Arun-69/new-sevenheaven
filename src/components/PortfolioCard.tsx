"use client";

import ImageWithLoader from "@/components/ImageWithLoader";
import { motion } from "framer-motion";

interface PortfolioCardProps {
  image: string;
  title: string;
  subtitle?: string;
  aspect?: string;
}

export default function PortfolioCard({
  image,
  title,
  subtitle,
  aspect = "aspect-[4/5]",
}: PortfolioCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`relative ${aspect} overflow-hidden border border-white/10`}>
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <ImageWithLoader
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
      <p className="font-serif text-lg mt-4 text-ink">{title}</p>
      {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
    </motion.div>
  );
}
