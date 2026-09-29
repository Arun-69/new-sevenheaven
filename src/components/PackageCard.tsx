"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PackageCardProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  variant?: "radio" | "checkbox";
}

export default function PackageCard({
  label,
  selected,
  onToggle,
  variant = "checkbox",
}: PackageCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between gap-3 border px-5 py-4 text-left transition-all duration-300 w-full",
        selected
          ? "border-gold bg-gold/10 text-ink"
          : "border-white/15 text-muted hover:border-white/30"
      )}
    >
      <span className="text-sm md:text-base">{label}</span>
      <span
        className={cn(
          "w-5 h-5 flex items-center justify-center border shrink-0",
          variant === "radio" ? "rounded-full" : "rounded-sm",
          selected ? "bg-gold border-gold text-bg" : "border-white/30"
        )}
      >
        {selected && <Check size={12} strokeWidth={3} />}
      </span>
    </button>
  );
}
