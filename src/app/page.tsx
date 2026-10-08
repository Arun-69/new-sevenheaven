import type { Metadata } from "next";
import Hero from "@/components/Hero";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import EventTypesSection from "@/components/sections/EventTypesSection";
import StoriesSection from "@/components/sections/StoriesSection";
import FilmsSection from "@/components/sections/FilmsSection";
import CreativeSection from "@/components/sections/CreativeSection";
import AlbumSection from "@/components/sections/AlbumSection";
import ProcessSection from "@/components/sections/ProcessSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GalleryPreviewSection from "@/components/sections/GalleryPreviewSection";
import AboutPreviewSection from "@/components/sections/AboutPreviewSection";
import PricingSection from "@/components/sections/PricingSection";
import CTA from "@/components/CTA";
import { resolveImage } from "@/lib/media";
import { DEFAULT_HERO_IMAGE } from "@/lib/hero-default";
import { getStories } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const heroImage = await resolveImage("hero", DEFAULT_HERO_IMAGE);
  const stories = await getStories();

  return (
    <>
      <Hero image={heroImage} />
      <IntroSection />
      <ServicesSection />
      <EventTypesSection stories={stories} />
      <StoriesSection />
      <FilmsSection />
      <CreativeSection />
      <AlbumSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <GalleryPreviewSection />
      <AboutPreviewSection />
      <PricingSection />
      <CTA
        title="LET'S CREATE SOMETHING UNFORGETTABLE."
        description="Your event happens once. Your memories shouldn't."
        primaryLabel="Request a Quote"
        primaryHref="/packages"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}