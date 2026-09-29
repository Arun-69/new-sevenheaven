import Link from "next/link";
import ImageWithLoader from "@/components/ImageWithLoader";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getTeam } from "@/lib/content";

export default async function AboutPreviewSection() {
  const resolvedTeam = await getTeam();

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading eyebrow="Who's Behind It" title={"PEOPLE BEHIND\nTHE MEMORIES."} />
          <Reveal delay={0.15}>
            <Link
              href="/about"
              className="text-xs tracking-widest2 uppercase text-gold gold-underline"
            >
              Meet The Studio →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {resolvedTeam.map((member, i) => (
            <Reveal key={member.id} delay={i * 0.05}>
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <ImageWithLoader
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-serif text-lg text-ink">{member.name}</p>
              <p className="text-xs text-muted mt-1">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
