"use client";

import { cn } from "@/lib/utils";

interface EventSelectorProps<T extends string> {
  options: T[];
  active: T;
  onChange: (value: T) => void;
}

export default function EventSelector<T extends string>({
  options,
  active,
  onChange,
}: EventSelectorProps<T>) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-5 py-2.5 text-xs tracking-widest2 uppercase border transition-all duration-300",
            active === option
              ? "bg-gold text-bg border-gold"
              : "border-white/20 text-muted hover:border-gold hover:text-gold"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
