"use client";

import ImageWithLoader from "@/components/ImageWithLoader";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import StorySectionsEditor from "./StorySectionsEditor";
import type { Story, EventType, StorySection } from "@/data/stories";

const EVENT_TYPES: EventType[] = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Baby Shower",
  "Corporate",
  "Pre-Wedding",
  "Graduation",
  "Other",
];

const emptyForm = {
  clientNames: "",
  eventType: "Wedding" as EventType,
  location: "",
  year: new Date().getFullYear(),
  coverImage: "",
  excerpt: "",
};

export default function StoriesManager({ initialStories }: { initialStories: Story[] }) {
  const [stories, setStories] = useState(initialStories);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sections, setSections] = useState<StorySection[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startCreate = () => {
    setForm(emptyForm);
    setSections([]);
    setCreating(true);
    setEditingSlug(null);
  };

  const startEdit = (story: Story) => {
    setForm({
      clientNames: story.clientNames,
      eventType: story.eventType,
      location: story.location,
      year: story.year,
      coverImage: story.coverImage,
      excerpt: story.excerpt,
    });
    setSections(story.sections.map((s) => ({ ...s, images: [...s.images] })));
    setEditingSlug(story.slug);
    setCreating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancel = () => {
    setCreating(false);
    setEditingSlug(null);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (creating) {
        const res = await fetch("/api/admin/stories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, sections }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not create story.");
        setStories((prev) => [data.story, ...prev]);
        setCreating(false);
      } else if (editingSlug) {
        const res = await fetch(`/api/admin/stories/${editingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, sections }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not save changes.");
        setStories((prev) => prev.map((s) => (s.slug === editingSlug ? data.story : s)));
        setEditingSlug(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this story? This can't be undone.")) return;
    const res = await fetch(`/api/admin/stories/${slug}`, { method: "DELETE" });
    if (res.ok) setStories((prev) => prev.filter((s) => s.slug !== slug));
  };

  const isFormOpen = creating || editingSlug !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{stories.length} stories</p>
        {!isFormOpen && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2.5 rounded-md transition-colors"
          >
            <Plus size={14} /> Add Story
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-[#111318] border border-white/5 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white font-medium">
              {creating ? "New Story" : "Edit Story"}
            </p>
            <button onClick={cancel} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Client Names">
              <input
                value={form.clientNames}
                onChange={(e) => setForm({ ...form, clientNames: e.target.value })}
                placeholder="Arun × Priya"
                className="input"
              />
            </Field>
            <Field label="Event Type">
              <select
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value as EventType })}
                className="input"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Chennai"
                className="input"
              />
            </Field>
            <Field label="Year">
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                className="input"
              />
            </Field>
          </div>

          <Field label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              placeholder="A one-line summary shown on the story card."
              className="input resize-none"
            />
          </Field>

          <ImageUploadField
            label="Cover Photo"
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
          />

          <StorySectionsEditor sections={sections} onChange={setSections} />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.clientNames}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs px-5 py-2.5 rounded-md transition-colors"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {creating ? "Create Story" : "Save Changes"}
            </button>
            <button
              onClick={cancel}
              className="text-xs text-slate-400 hover:text-slate-200 px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {stories.map((story) => (
          <div
            key={story.slug}
            className="flex items-center gap-4 bg-[#111318] border border-white/5 rounded-lg p-3"
          >
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-black/40 shrink-0">
              {story.coverImage && (
                <ImageWithLoader
                  src={story.coverImage}
                  alt={story.clientNames}
                  fill
                  sizes="56px"
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{story.clientNames}</p>
              <p className="text-xs text-slate-500">
                {story.eventType} · {story.location} · {story.year}
              </p>
            </div>
            <button
              onClick={() => startEdit(story)}
              className="p-2 text-slate-400 hover:text-indigo-300 transition-colors"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => handleDelete(story.slug)}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: #e2e8f0;
          outline: none;
        }
        .input:focus {
          border-color: #818cf8;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
