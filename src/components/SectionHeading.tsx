import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] whitespace-pre-line text-balance">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
