"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a stat like "500+", "100K+" or "100%" counting up from 0 the
 * first time it scrolls into view. The numeric part animates; any prefix/
 * suffix characters (+, K, %) stay put.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  const match = value.match(/^([\d,.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : "";
  const prefix = match ? "" : value;

  useEffect(() => {
    if (!isInView || !match) return;
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        setDisplay(Math.round(v).toLocaleString());
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <p ref={ref} className="font-serif text-4xl md:text-6xl text-gold">
      {prefix}
      {match ? display : null}
      {suffix}
    </p>
  );
}
