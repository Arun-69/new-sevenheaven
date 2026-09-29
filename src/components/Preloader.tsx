"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CameraLoader from "@/components/CameraLoader";

type Phase = "loading" | "flash" | "done";

export default function Preloader({ logoUrl }: { logoUrl?: string } = {}) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ✅ UDANE flash-க்கு போ — 1.6s wait இல்ல
    // Loader animation CSS-ல இருக்கு, அது instantly start ஆகும்.
    // Camera animation-ஐ முழுசா பாக்க 1.8s குடு (feels intentional).
    const t1 = setTimeout(() => setPhase("flash"), 1800);

    // Safety: max 2.5s-ல force flash (slow connections-க்கு)
    const t2 = setTimeout(() => setPhase("flash"), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, []);

  // flash → done → remove
  const flashed = phase !== "loading";
  useEffect(() => {
    if (!flashed) return;
    const t1 = setTimeout(() => setPhase("done"), 250);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [flashed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "done" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg1 ${
            flashed ? "pointer-events-none" : ""
          }`}
          aria-hidden="true"
        >
          <CameraLoader logoUrl={logoUrl} size={176} />

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="mt-8 text-gold text-[10px] tracking-widest2 uppercase"
          >
            Capturing moments
          </motion.p>

          {/* Camera flash */}
          {phase !== "loading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.5, times: [0, 0.2, 1] }}
              className="absolute inset-0 bg-white pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}