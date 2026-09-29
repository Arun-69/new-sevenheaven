"use client";

import ImageWithLoader from "@/components/ImageWithLoader";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import type { TeamMember } from "@/data/team";

const emptyForm = { name: "", role: "", bio: "", image: "" };

export default function TeamManager({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [team, setTeam] = useState(initialTeam);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startCreate = () => {
    setForm(emptyForm);
    setCreating(true);
    setEditingId(null);
  };

  const startEdit = (m: TeamMember) => {
    setForm({ name: m.name, role: m.role, bio: m.bio, image: m.image });
    setEditingId(m.id);
    setCreating(false);
  };

  const cancel = () => {
    setCreating(false);
    setEditingId(null);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const isNew = creating;
      const res = await fetch(isNew ? "/api/admin/team" : `/api/admin/team/${editingId}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save.");
      if (isNew) setTeam((prev) => [...prev, data.member]);
      else setTeam((prev) => prev.map((m) => (m.id === editingId ? data.member : m)));
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member? This can't be undone.")) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    if (res.ok) setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const isFormOpen = creating || editingId !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{team.length} team members</p>
        {!isFormOpen && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2.5 rounded-md transition-colors"
          >
            <Plus size={14} /> Add Team Member
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-[#111318] border border-white/5 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white font-medium">
              {creating ? "New Team Member" : "Edit Team Member"}
            </p>
            <button onClick={cancel} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Arun Kumar"
                className="team-input"
              />
            </Field>
            <Field label="Role">
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Lead Photographer"
                className="team-input"
              />
            </Field>
          </div>

          <Field label="Bio">
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="team-input resize-none"
            />
          </Field>

          <ImageUploadField
            label="Photo"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.role}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs px-5 py-2.5 rounded-md transition-colors"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {creating ? "Add Member" : "Save Changes"}
            </button>
            <button onClick={cancel} className="text-xs text-slate-400 hover:text-slate-200 px-5 py-2.5">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {team.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-4 bg-[#111318] border border-white/5 rounded-lg p-3"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-black/40 shrink-0">
              {m.image && (
                <ImageWithLoader src={m.image} alt={m.name} fill sizes="56px" unoptimized className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{m.name}</p>
              <p className="text-xs text-slate-500 truncate">{m.role}</p>
            </div>
            <button
              onClick={() => startEdit(m)}
              className="p-2 text-slate-400 hover:text-indigo-300 transition-colors"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => handleDelete(m.id)}
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {team.length === 0 && (
          <p className="text-sm text-slate-500 py-6 text-center">No team members yet.</p>
        )}
      </div>

      <style jsx global>{`
        .team-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: #e2e8f0;
          outline: none;
        }
        .team-input:focus {
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
