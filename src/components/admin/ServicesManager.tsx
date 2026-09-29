"use client";

import ImageWithLoader from "@/components/ImageWithLoader";
import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import ImageUploadField from "./ImageUploadField";
import type { Service, ServiceCategory } from "@/data/services";

const CATEGORIES: ServiceCategory[] = ["Capture", "Create", "Preserve", "Deliver"];

const emptyForm = {
  title: "",
  category: "Capture" as ServiceCategory,
  description: "",
  image: "",
};

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
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

  const startEdit = (service: Service) => {
    setForm({
      title: service.title,
      category: service.category,
      description: service.description,
      image: service.image,
    });
    setEditingId(service.id);
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
      if (creating) {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not create service.");
        setServices((prev) => [...prev, data.service]);
        setCreating(false);
      } else if (editingId) {
        const res = await fetch(`/api/admin/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not save changes.");
        setServices((prev) => prev.map((s) => (s.id === editingId ? data.service : s)));
        setEditingId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service? This can't be undone.")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (res.ok) setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const isFormOpen = creating || editingId !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{services.length} services</p>
        {!isFormOpen && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2.5 rounded-md transition-colors"
          >
            <Plus size={14} /> Add Service
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-[#111318] border border-white/5 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white font-medium">
              {creating ? "New Service" : "Edit Service"}
            </p>
            <button onClick={cancel} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Wedding Photography"
                className="admin-input"
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ServiceCategory })}
                className="admin-input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="admin-input resize-none"
            />
          </Field>

          <ImageUploadField
            label="Image"
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.title}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs px-5 py-2.5 rounded-md transition-colors"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {creating ? "Create Service" : "Save Changes"}
            </button>
            <button onClick={cancel} className="text-xs text-slate-400 hover:text-slate-200 px-5 py-2.5">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {CATEGORIES.map((category) => {
          const items = services.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="mb-6">
              <p className="text-xs tracking-wide uppercase text-slate-500 mb-2">{category}</p>
              <div className="space-y-2">
                {items.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 bg-[#111318] border border-white/5 rounded-lg p-3"
                  >
                    <div className="relative w-14 h-14 rounded-md overflow-hidden bg-black/40 shrink-0">
                      {service.image && (
                        <ImageWithLoader src={service.image} alt={service.title} fill sizes="56px" unoptimized className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{service.title}</p>
                      <p className="text-xs text-slate-500 truncate">{service.description}</p>
                    </div>
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 text-slate-400 hover:text-indigo-300 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .admin-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: #e2e8f0;
          outline: none;
        }
        .admin-input:focus {
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
