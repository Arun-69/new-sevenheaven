"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "RAW",
  afterLabel = "FINAL",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize border border-white/10"
      onMouseDown={(e) => {
        dragging.current = true;
        updatePosition(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updatePosition(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
    >
      <Image
        src={afterImage}
        alt={afterLabel}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover"
      />
      <span className="absolute top-4 right-4 text-[10px] tracking-widest2 uppercase bg-bg/70 text-ink px-2 py-1">
        {afterLabel}
      </span>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 text-[10px] tracking-widest2 uppercase bg-bg/70 text-ink px-2 py-1">
          {beforeLabel}
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-gold"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold flex items-center justify-center text-bg">
          <MoveHorizontal size={16} />
        </div>
      </div>
    </div>
  );
}
