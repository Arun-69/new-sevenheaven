import type { Metadata } from "next";
import StoryCard from "@/components/StoryCard";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { siteConfig } from "@/config/site";
import { getStories } from "@/lib/content";

export const metadata: Metadata = {
  title: `Stories — ${siteConfig.name}`,
  description: "Real events, real stories — captured, created, and preserved.",
};

export default async function StoriesPage() {
  const resolvedStories = await getStories();

  return (
    <>
      <section className="pt-40 md:pt-52 pb-20 container-edit">
        <Reveal>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            Portfolio
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl">
            STORIES WE&apos;VE CAPTURED.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted mt-6 max-w-lg leading-relaxed">
            Every event is different. Every story deserves to be told that way.
          </p>
        </Reveal>
      </section>

      <section className="container-edit pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {resolvedStories.map((story, i) => (
            <Reveal key={story.slug} delay={(i % 3) * 0.05}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA
        title="YOUR STORY COULD BE NEXT."
        description="Let's talk about the event you're planning."
        primaryLabel="Plan Your Event"
        primaryHref="/packages"
      />
    </>
  );
}
