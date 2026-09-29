import Link from "next/link";
import Reveal from "./Reveal";

interface CTAProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA({
  title,
  description,
  primaryLabel = "Request a Quote",
  primaryHref = "/packages",
  secondaryLabel = "View Our Work",
  secondaryHref = "/stories",
}: CTAProps) {
  return (
    <section className="py-28 md:py-36 border-t border-white/10">
      <div className="container-edit text-center">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight text-balance max-w-3xl mx-auto">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="text-muted mt-6 max-w-xl mx-auto">{description}</p>
          </Reveal>
        )}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={primaryHref}
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest2 uppercase"
            >
              {primaryLabel} →
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 border border-ink/30 px-8 py-4 text-xs tracking-widest2 uppercase hover:border-gold hover:text-gold transition-colors"
            >
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
