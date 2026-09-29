"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Lock, Download, Heart, Film } from "lucide-react";
import Gallery from "@/components/Gallery";
import { getGalleryBySlug } from "@/data/galleries";

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = getGalleryBySlug(params.slug);
  const [tab, setTab] = useState<"photos" | "videos" | "favorites">("photos");
  const [unlocked, setUnlocked] = useState(!gallery?.passwordProtected);
  const [passwordInput, setPasswordInput] = useState("");

  if (!gallery) notFound();

  const visiblePhotos =
    tab === "favorites"
      ? gallery.photos.filter((p) => p.isFavorite)
      : gallery.photos;

  if (!unlocked) {
    return (
      <section className="pt-40 md:pt-52 pb-28 container-edit max-w-md mx-auto text-center">
        <Lock className="mx-auto text-gold mb-6" size={28} />
        <h1 className="font-serif text-3xl mb-3">{gallery.clientNames}</h1>
        <p className="text-muted text-sm mb-8">
          This gallery is password protected. Enter the password shared with
          you to view it.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Demo only — any non-empty password unlocks the mock gallery.
            if (passwordInput.trim()) setUnlocked(true);
          }}
          className="flex gap-3"
        >
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter password"
            className="flex-1 bg-transparent border border-white/15 focus:border-gold outline-none px-4 py-3 text-ink transition-colors"
          />
          <button
            type="submit"
            className="bg-gold text-bg px-6 py-3 text-xs tracking-widest2 uppercase hover:bg-gold-soft transition-colors"
          >
            Unlock
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="pt-40 md:pt-52 pb-28 container-edit">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-gold text-xs tracking-widest2 uppercase mb-3">
            {gallery.eventType} · {gallery.year}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl">
            {gallery.clientNames}
          </h1>
          <div className="flex gap-6 mt-4 text-sm text-muted">
            <span>{gallery.photoCount} Photos</span>
            <span>{gallery.videoCount} Videos</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 bg-ink text-bg px-6 py-3.5 text-xs tracking-widest2 uppercase hover:bg-gold transition-colors w-fit">
          <Download size={14} /> Download All
        </button>
      </div>

      <div className="flex gap-3 mb-10 border-b border-white/10">
        {(["photos", "videos", "favorites"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-xs tracking-widest2 uppercase border-b-2 transition-colors ${
              tab === t
                ? "border-gold text-gold"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t === "favorites" && <Heart size={12} className="inline mr-1.5 -mt-0.5" />}
            {t}
          </button>
        ))}
      </div>

      {tab === "videos" ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted gap-3">
          <Film size={28} />
          <p className="text-sm">
            {gallery.videoCount} videos ready — full video delivery connects
            here once the backend is live.
          </p>
        </div>
      ) : (
        <Gallery photos={visiblePhotos} />
      )}
    </section>
  );
}
