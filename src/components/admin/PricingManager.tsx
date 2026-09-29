"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Star } from "lucide-react";
import type { PricingTier } from "@/data/pricing";

const emptyForm = {
  name: "",
  price: "",
  priceNote: "starting price",
  description: "",
  featuresText: "",
  highlighted: false,
};

function toForm(tier: PricingTier) {
  return {
    name: tier.name,
    price: tier.price,
    priceNote: tier.priceNote,
    description: tier.description,
    featuresText: tier.features.join("\n"),
    highlighted: Boolean(tier.highlighted),
  };
}

export default function PricingManager({ initialTiers }: { initialTiers: PricingTier[] }) {
  const [tiers, setTiers] = useState(initialTiers);
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

  const startEdit = (tier: PricingTier) => {
    setForm(toForm(tier));
    setEditingId(tier.id);
    setCreating(false);
  };

  const cancel = () => {
    setCreating(false);
    setEditingId(null);
    setError("");
  };

  const buildPayload = () => ({
    name: form.name,
    price: form.price,
    priceNote: form.priceNote,
    description: form.description,
    features: form.featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
    highlighted: form.highlighted,
  });

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      if (creating) {
        const res = await fetch("/api/admin/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload()),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not create package.");
        setTiers((prev) => [...prev, data.tier]);
        setCreating(false);
      } else if (editingId) {
        const res = await fetch(`/api/admin/pricing/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload()),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not save changes.");
        setTiers((prev) => prev.map((t) => (t.id === editingId ? data.tier : t)));
        setEditingId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package? This can't be undone.")) return;
    const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
    if (res.ok) setTiers((prev) => prev.filter((t) => t.id !== id));
  };

  const isFormOpen = creating || editingId !== null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{tiers.length} packages</p>
        {!isFormOpen && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 text-xs bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2.5 rounded-md transition-colors"
          >
            <Plus size={14} /> Add Package
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-[#111318] border border-white/5 rounded-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white font-medium">
              {creating ? "New Package" : "Edit Package"}
            </p>
            <button onClick={cancel} className="text-slate-500 hover:text-slate-300">
              <X size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Package Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Gold"
                className="pricing-input"
              />
            </Field>
            <Field label="Price">
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="₹55,000"
                className="pricing-input"
              />
            </Field>
          </div>

          <Field label="Price Note">
            <input
              value={form.priceNote}
              onChange={(e) => setForm({ ...form, priceNote: e.target.value })}
              placeholder="starting price"
              className="pricing-input"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="pricing-input resize-none"
            />
          </Field>

          <Field label="Features (one per line)">
            <textarea
              value={form.featuresText}
              onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
              rows={5}
              placeholder={"2 Photographers, 1 Day\n600+ Edited Photos\nDrone Coverage"}
              className="pricing-input resize-none"
            />
          </Field>

          <label className="flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={form.highlighted}
              onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
            />
            Mark as &quot;Most Popular&quot;
          </label>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.price}
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white text-xs px-5 py-2.5 rounded-md transition-colors"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              {creating ? "Create Package" : "Save Changes"}
            </button>
            <button onClick={cancel} className="text-xs text-slate-400 hover:text-slate-200 px-5 py-2.5">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <div key={tier.id} className="bg-[#111318] border border-white/5 rounded-lg p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-white font-medium flex items-center gap-1.5">
                  {tier.name}
                  {tier.highlighted && <Star size={13} className="text-amber-400 fill-amber-400" />}
                </p>
                <p className="text-lg text-white mt-1">{tier.price}</p>
                <p className="text-[11px] text-slate-500">{tier.priceNote}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(tier)}
                  className="p-1.5 text-slate-400 hover:text-indigo-300 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(tier.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">{tier.description}</p>
            <ul className="text-xs text-slate-400 space-y-1">
              {tier.features.slice(0, 4).map((f) => (
                <li key={f}>• {f}</li>
              ))}
              {tier.features.length > 4 && (
                <li className="text-slate-600">+{tier.features.length - 4} more</li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .pricing-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          color: #e2e8f0;
          outline: none;
        }
        .pricing-input:focus {
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
