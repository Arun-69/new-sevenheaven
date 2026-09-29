"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/config/site";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink("Hi! I'd like to know more about planning my event.")}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-bg px-4 py-3.5 rounded-full shadow-lg shadow-black/40"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={20} fill="currentColor" />
      <span className="hidden sm:inline text-xs font-medium tracking-wide">
        Chat With Us
      </span>
    </motion.a>
  );
}
