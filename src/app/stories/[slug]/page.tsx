import type { Metadata } from "next";
import ImageWithLoader from "@/components/ImageWithLoader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { stories as seedStories } from "@/data/stories";
import { siteConfig } from "@/config/site";
import { getStories, getStoryBySlug } from "@/lib/content";

export function generateStaticParams() {
  return seedStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return { title: `Story — ${siteConfig.name}` };
  return {
    title: `${story.clientNames} — ${story.eventType} Photography`,
    description: story.excerpt,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      title: `${story.clientNames} — ${story.eventType} Photography`,
      description: story.excerpt,
      type: "article",
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStoryBySlug(params.slug);
  if (!story) notFound();

  return (
    <>
      <section className="relative h-[85vh] w-full flex items-end">
        <ImageWithLoader
          src={story.coverImage}
          alt={`${story.clientNames} hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10" />
        <div className="container-edit relative z-10 pb-16">
          <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
            THE STORY
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-balance">
            {story.clientNames}
          </h1>
          <div className="flex gap-8 text-sm text-muted">
            <span>{story.eventType}</span>
            <span>{story.location}</span>
            <span>{story.year}</span>
          </div>
        </div>
      </section>

      <div className="container-edit py-20 md:py-28 space-y-24 md:space-y-32">
        {story.sections.map((section, i) => (
          <div key={section.key}>
            <Reveal>
              <p className="text-gold text-xs tracking-widest2 uppercase mb-8">
                {section.title}
              </p>
            </Reveal>
            <div
              className={`grid gap-4 ${
                section.images.length > 1 ? "md:grid-cols-2" : ""
              }`}
            >
              {section.images.map((img, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ImageWithLoader
                      src={img}
                      alt={`${story.clientNames} — ${section.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container-edit pb-20">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-ink gold-underline"
        >
          <ArrowLeft size={14} /> Back To Stories
        </Link>
      </div>

      <CTA
        title="WANT A STORY LIKE THIS?"
        description="Every event we cover gets this same care, start to finish."
        primaryLabel="Request a Quote"
        primaryHref="/packages"
      />
    </>
  );
}