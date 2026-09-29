import Link from "next/link";
import { Lock, Images } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ImageWithLoader from "@/components/ImageWithLoader";
import { galleries } from "@/data/galleries";

export default function GalleryPreviewSection() {
  const gallery = galleries[0];

  return (
    <section className="py-28 md:py-40 border-t border-white/10">
      <div className="container-edit">
        <SectionHeading eyebrow="After The Event" title={"YOUR\nMEMORIES."} className="mb-16" />

        <Reveal>
          <div className="grid md:grid-cols-2 border border-white/10">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <ImageWithLoader
                src={gallery.photos[0].url}
                alt={gallery.clientNames}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              {gallery.passwordProtected && (
                <div className="flex items-center gap-2 text-muted text-xs tracking-widest2 uppercase mb-4">
                  <Lock size={12} /> Password Protected
                </div>
              )}
              <h3 className="font-serif text-3xl md:text-4xl mb-2">
                {gallery.clientNames}
              </h3>
              <p className="text-muted text-sm mb-8">
                {gallery.eventType} · {gallery.year}
              </p>
              <div className="flex gap-8 mb-10">
                <div>
                  <p className="font-serif text-2xl text-gold">{gallery.photoCount}</p>
                  <p className="text-xs tracking-widest2 uppercase text-muted mt-1">
                    Photos
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-gold">{gallery.videoCount}</p>
                  <p className="text-xs tracking-widest2 uppercase text-muted mt-1">
                    Videos
                  </p>
                </div>
              </div>
              <Link
                href={`/gallery/${gallery.slug}`}
                className="inline-flex items-center gap-2 bg-ink text-bg px-6 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold transition-colors w-fit"
              >
                <Images size={14} /> Open Gallery
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
