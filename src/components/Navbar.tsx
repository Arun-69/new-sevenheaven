"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Stories", href: "/stories" },
  { label: "Services", href: "/services" },
  { label: "Creative", href: "/creative" },
  { label: "Films", href: "/films" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ logoUrl }: { logoUrl?: string } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "bg-bg/80 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        <div className="container-edit flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoUrl || siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={42}
              height={42}
              priority
              className="rounded-full w-9 h-9 md:w-11 md:h-11"
            />
            <span className="font-serif text-lg md:text-xl tracking-[0.15em] text-ink">
              {siteConfig.shortName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="gold-underline text-sm tracking-wide text-ink/90 hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 border border-gold px-5 py-2.5 text-xs tracking-widest2 uppercase text-gold hover:bg-gold hover:text-bg transition-all duration-300"
            >
              Book Your Event →
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="lg:hidden text-ink"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-center items-center gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2"
            >
              <Image
                src={logoUrl || siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={64}
                height={64}
                className="rounded-full"
              />
            </motion.div>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl text-ink hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/packages"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center gap-2 border border-gold px-6 py-3 text-xs tracking-widest2 uppercase text-gold"
              >
                Book Your Event →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
