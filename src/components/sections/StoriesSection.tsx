import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StoryCard from "@/components/StoryCard";
import Reveal from "@/components/Reveal";
import { getStories } from "@/lib/content";

export default async function StoriesSection() {
  const stories = await getStories();

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading eyebrow="Portfolio" title={"STORIES\nWE'VE CAPTURED."} />
          <Reveal delay={0.15}>
            <Link
              href="/stories"
              className="text-xs tracking-widest2 uppercase text-gold gold-underline"
            >
              View All Stories →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {stories.slice(0, 6).map((story, i) => (
            <Reveal key={story.slug} delay={i * 0.05}>
              <StoryCard story={story} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
