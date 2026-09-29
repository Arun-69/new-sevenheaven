"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/config/site";

/**
 * Centered studio logo with a camera "focus" animation: viewfinder brackets
 * that tighten and lock on, a rotating lens ring and a breathing logo.
 * Used by the full-screen Preloader and by route loading screens.
 */
export default function CameraLoader({
  logoUrl,
  size = 176,
}: {
  logoUrl?: string;
  size?: number;
}) {
  const corner = "absolute h-6 w-6 border-gold";
  const logoSize = Math.round(size * 0.5);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      {/* Viewfinder brackets: tighten -> lock focus -> release */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1.18, 1, 1, 1.18], opacity: [0.3, 1, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          times: [0, 0.4, 0.75, 1],
          ease: "easeInOut",
        }}
      >
        <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
        <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
        <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      </motion.div>

      {/* Lens ring */}
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute rounded-full border border-dashed border-gold/40"
        style={{ width: size * 0.78, height: size * 0.78 }}
      />
      <motion.span
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        className="absolute rounded-full border border-gold/15 border-t-gold"
        style={{ width: size * 0.66, height: size * 0.66 }}
      />

      {/* Centered logo */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <Image
          src={logoUrl || siteConfig.logo}
          alt={`${siteConfig.name} logo`}
          width={logoSize}
          height={logoSize}
          priority
          className="rounded-full object-contain"
          style={{ width: logoSize * 0.7, height: logoSize * 0.7 }}
        />
      </motion.div>
    </div>
  );
}
