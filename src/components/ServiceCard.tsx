"use client";

import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import ImageWithLoader from "@/components/ImageWithLoader";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className="group relative aspect-[4/5] overflow-hidden border border-white/10"
    >
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <ImageWithLoader
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">
          {service.title}
        </h3>
        <motion.p
          variants={{
            rest: { opacity: 0, height: 0 },
            hover: { opacity: 1, height: "auto" },
          }}
          transition={{ duration: 0.4 }}
          className="text-sm text-muted overflow-hidden hidden md:block"
        >
          {service.description}
        </motion.p>
      </div>
    </motion.div>
  );
}
