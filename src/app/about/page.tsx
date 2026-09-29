import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/CTA";
import { siteConfig } from "@/config/site";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: "The people behind the memories.",
};

export default async function AboutPage() {
  const resolvedTeam = await getTeam();

  return (
    <>
      <section className="pt-40 md:pt-52 pb-20 container-edit">
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            Who&apos;s Behind It
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl">
            PEOPLE BEHIND THE MEMORIES.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted mt-6 max-w-lg leading-relaxed">
            We started because we kept noticing the same thing: the moments
            that mattered most were the ones nobody planned for. So we built a
            studio around noticing them, and everything else — the design, the
            albums, the delivery — grew from there.
          </p>
        </Reveal>
      </section>

      <section className="container-edit pb-28">
        <SectionHeading eyebrow="The Team" title={"THE HANDS\nBEHIND YOUR STORY."} className="mb-14" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {resolvedTeam.map((member, i) => (
            <Reveal key={member.id} delay={(i % 5) * 0.05}>
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <p className="font-serif text-lg text-ink">{member.name}</p>
              <p className="text-xs text-gold mt-1 tracking-wide">
                {member.role}
              </p>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                {member.bio}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="LET'S MEET IN PERSON."
        description="Tell us about your event, and we'll take it from there."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
