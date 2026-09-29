"use client";

import { useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Loader2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  X,
  Link2,
} from "lucide-react";
import ImageWithLoader from "@/components/ImageWithLoader";
import type { StorySection } from "@/data/stories";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url as string;
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export default function StorySectionsEditor({
  sections,
  onChange,
}: {
  sections: StorySection[];
  onChange: (next: StorySection[]) => void;
}) {
  const updateSection = (i: number, patch: Partial<StorySection>) =>
    onChange(sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const addSection = () =>
    onChange([
      ...sections,
      {
        key: `section-${Date.now().toString(36)}`,
        title: "NEW SECTION",
        images: [],
      },
    ]);

  const removeSection = (i: number) => {
    if (!confirm("Remove this whole section and its photos from the story?")) return;
    onChange(sections.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs text-slate-400">
          Story Sections &amp; Photos ({sections.length})
        </label>
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200"
        >
          <Plus size={13} /> Add Section
        </button>
      </div>

      {sections.length === 0 && (
        <p className="text-xs text-slate-600 border border-dashed border-white/10 rounded-md p-4 text-center">
          No sections yet. Click “Add Section” to add photos to this story.
        </p>
      )}

      <div className="space-y-4">
        {sections.map((section, i) => (
          <SectionCard
            key={section.key}
            section={section}
            index={i}
            total={sections.length}
            onTitle={(title) => updateSection(i, { title })}
            onImages={(images) => updateSection(i, { images })}
            onUp={() => onChange(move(sections, i, i - 1))}
            onDown={() => onChange(move(sections, i, i + 1))}
            onRemove={() => removeSection(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  section,
  index,
  total,
  onTitle,
  onImages,
  onUp,
  onDown,
  onRemove,
}: {
  section: StorySection;
  index: number;
  total: number;
  onTitle: (t: string) => void;
  onImages: (imgs: string[]) => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  const addInput = useRef<HTMLInputElement | null>(null);
  const replaceInput = useRef<HTMLInputElement | null>(null);
  const replaceIndex = useRef<number>(-1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [urlOpen, setUrlOpen] = useState(false);
  const [url, setUrl] = useState("");

  const addFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) {
        added.push(await uploadImage(file));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      // keep whatever uploaded successfully
      if (added.length) onImages([...section.images, ...added]);
      setBusy(false);
      if (addInput.current) addInput.current.value = "";
    }
  };

  const replaceFile = async (file: File | undefined) => {
    const idx = replaceIndex.current;
    if (!file || idx < 0) return;
    setBusy(true);
    setError("");
    try {
      const newUrl = await uploadImage(file);
      onImages(section.images.map((img, i) => (i === idx ? newUrl : img)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      replaceIndex.current = -1;
      if (replaceInput.current) replaceInput.current.value = "";
    }
  };

  const addUrl = () => {
    const u = url.trim();
    if (!/^(https?:\/\/|\/)/.test(u)) {
      setError("Enter a valid image URL (https://… or /uploads/…).");
      return;
    }
    setError("");
    onImages([...section.images, u]);
    setUrl("");
    setUrlOpen(false);
  };

  const iconBtn =
    "p-1.5 rounded bg-black/70 text-slate-200 hover:text-white hover:bg-indigo-500 transition-colors disabled:opacity-30";

  return (
    <div className="border border-white/10 rounded-lg p-4 bg-black/20">
      <div className="flex items-center gap-2 mb-4">
        <input
          value={section.title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="Section title (e.g. THE ARRIVAL)"
          className="input"
        />
        <button type="button" onClick={onUp} disabled={index === 0} className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30" aria-label="Move section up">
          <ArrowUp size={15} />
        </button>
        <button type="button" onClick={onDown} disabled={index === total - 1} className="p-2 text-slate-400 hover:text-slate-100 disabled:opacity-30" aria-label="Move section down">
          <ArrowDown size={15} />
        </button>
        <button type="button" onClick={onRemove} className="p-2 text-slate-400 hover:text-red-400" aria-label="Remove section">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {section.images.map((img, i) => (
          <div
            key={`${img}-${i}`}
            className="group relative aspect-square rounded-md overflow-hidden bg-black/40 border border-white/10"
          >
            <ImageWithLoader
              src={img}
              alt={`${section.title} photo ${i + 1}`}
              fill
              sizes="160px"
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
            <div className="absolute top-1 right-1 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                className={iconBtn}
                title="Replace photo"
                onClick={() => {
                  replaceIndex.current = i;
                  replaceInput.current?.click();
                }}
              >
                <Upload size={12} />
              </button>
              <button
                type="button"
                className={`${iconBtn} hover:!bg-red-500`}
                title="Remove photo"
                onClick={() => onImages(section.images.filter((_, idx) => idx !== i))}
              >
                <X size={12} />
              </button>
            </div>
            <div className="absolute bottom-1 left-1 flex gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button type="button" className={iconBtn} disabled={i === 0} title="Move left" onClick={() => onImages(move(section.images, i, i - 1))}>
                <ArrowLeft size={12} />
              </button>
              <button type="button" className={iconBtn} disabled={i === section.images.length - 1} title="Move right" onClick={() => onImages(move(section.images, i, i + 1))}>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addInput.current?.click()}
          disabled={busy}
          className="aspect-square rounded-md border border-dashed border-white/20 text-slate-400 hover:text-indigo-300 hover:border-indigo-400 flex flex-col items-center justify-center gap-1 text-[11px] transition-colors disabled:opacity-50"
        >
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
          {busy ? "Uploading…" : "Add photos"}
        </button>
      </div>

      <input
        ref={addInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
      <input
        ref={replaceInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => replaceFile(e.target.files?.[0])}
      />

      <div className="mt-3">
        {urlOpen ? (
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
              placeholder="https://…/photo.jpg"
              className="input"
            />
            <button type="button" onClick={addUrl} className="text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-3 rounded-md">
              Add
            </button>
            <button type="button" onClick={() => setUrlOpen(false)} className="text-xs text-slate-400 px-2">
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setUrlOpen(true)} className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300">
            <Link2 size={12} /> Add photo by URL
          </button>
        )}
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
}
