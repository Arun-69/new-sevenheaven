"use client";

import { useMemo, useRef, useState } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import { Upload, Check, Loader2 } from "lucide-react";
import type { MediaSlot } from "@/lib/media-slots";
import { cn } from "@/lib/utils";

export default function MediaLibraryClient({
  initialSlots,
}: {
  initialSlots: MediaSlot[];
}) {
  const [slots, setSlots] = useState(initialSlots);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [doneKey, setDoneKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const grouped = useMemo(() => {
    const map = new Map<string, MediaSlot[]>();
    for (const slot of slots) {
      if (!map.has(slot.group)) map.set(slot.group, []);
      map.get(slot.group)!.push(slot);
    }
    return Array.from(map.entries());
  }, [slots]);

  const handleReplace = async (key: string, file: File) => {
    setBusyKey(key);
    setErrorKey(null);
    setDoneKey(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed.");

      const updateRes = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, url: uploadData.url }),
      });
      if (!updateRes.ok) throw new Error("Could not save the change.");

      setSlots((prev) =>
        prev.map((s) => (s.key === key ? { ...s, currentUrl: uploadData.url } : s))
      );
      setDoneKey(key);
      setTimeout(() => setDoneKey((k) => (k === key ? null : k)), 2000);
    } catch (err) {
      setErrorKey(key);
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div className="space-y-10">
      {grouped.map(([group, groupSlots]) => (
        <div key={group}>
          <p className="text-xs tracking-wide uppercase text-slate-500 mb-4">{group}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupSlots.map((slot) => (
              <div
                key={slot.key}
                className="bg-[#111318] border border-white/5 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-video bg-black/40">
                  <ImageWithLoader
                    src={slot.currentUrl}
                    alt={slot.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized={slot.currentUrl.startsWith("/uploads/")}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-200 mb-3 truncate" title={slot.label}>
                    {slot.label}
                  </p>
                  <input
                    ref={(el) => {
                      fileInputs.current[slot.key] = el;
                    }}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleReplace(slot.key, file);
                      e.target.value = "";
                    }}
                  />
                  <button
                    onClick={() => fileInputs.current[slot.key]?.click()}
                    disabled={busyKey === slot.key}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 text-xs font-medium py-2.5 rounded-md transition-colors",
                      doneKey === slot.key
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-white/5 hover:bg-white/10 text-slate-200"
                    )}
                  >
                    {busyKey === slot.key ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Uploading…
                      </>
                    ) : doneKey === slot.key ? (
                      <>
                        <Check size={14} /> Updated
                      </>
                    ) : (
                      <>
                        <Upload size={14} /> Replace Image
                      </>
                    )}
                  </button>
                  {errorKey === slot.key && (
                    <p className="text-red-400 text-[11px] mt-2">
                      Couldn&apos;t save that image. Try again, or check your
                      hosting supports file writes (see README).
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
