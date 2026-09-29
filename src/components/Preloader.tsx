"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CameraLoader from "@/components/CameraLoader";

type Phase = "loading" | "flash" | "done";

/**
 * Full-screen loading screen shown on every fresh visit / full page load.
 * It is part of the server-rendered HTML (starts visible), so the site UI
 * never flashes before it. When the page + hero image have loaded, a camera
 * "flash" fires and the screen fades away to reveal the UI.
 */
export default function Preloader({ logoUrl }: { logoUrl?: string } = {}) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    // Lock scrolling while the splash is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Show the animation for at least 1.6s so it feels intentional.
    const minDisplay = new Promise((r) => setTimeout(r, 1600));
    const pageLoad = new Promise((r) => {
      if (document.readyState === "complete") r(true);
      else window.addEventListener("load", () => r(true), { once: true });
    });
    // Never block the site for more than 5s on a very slow connection.
    const maxWait = new Promise((r) => setTimeout(r, 5000));

    Promise.all([minDisplay, Promise.race([pageLoad, maxWait])]).then(() =>
      setPhase("flash")
    );

    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Depends on a boolean (not `phase`) so moving flash -> done does not
  // cancel the timer that finally removes the overlay.
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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg ${
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
