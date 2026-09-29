"use client";

import { useState } from "react";
import { Trash2, Mail, Phone, Circle } from "lucide-react";
import type { Enquiry } from "@/lib/enquiries";

const statusColors: Record<Enquiry["status"], string> = {
  new: "text-emerald-400",
  read: "text-slate-500",
  archived: "text-slate-600",
};

export default function EnquiriesManager({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);

  const markRead = async (id: string) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: "read" } : e)));
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "read" }),
    });
  };

  const archive = async (id: string) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: "archived" } : e)));
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry? This can't be undone.")) return;
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
  };

  if (enquiries.length === 0) {
    return (
      <div className="bg-[#111318] border border-white/5 rounded-lg p-10 text-center">
        <p className="text-sm text-slate-500">
          No enquiries yet — they&apos;ll show up here the moment someone submits the contact
          or quote form on your site.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {enquiries.map((enquiry) => (
        <div
          key={enquiry.id}
          className="bg-[#111318] border border-white/5 rounded-lg p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Circle size={8} className={`${statusColors[enquiry.status]} fill-current shrink-0`} />
                <p className="text-sm text-white font-medium truncate">{enquiry.name}</p>
                <span className="text-[10px] uppercase tracking-wide text-slate-600 bg-white/5 px-2 py-0.5 rounded">
                  {enquiry.source}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
                <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1.5 hover:text-indigo-300">
                  <Mail size={12} /> {enquiry.email}
                </a>
                {enquiry.phone && (
                  <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1.5 hover:text-indigo-300">
                    <Phone size={12} /> {enquiry.phone}
                  </a>
                )}
                {enquiry.eventType && <span>{enquiry.eventType}</span>}
                {enquiry.eventDate && <span>{enquiry.eventDate}</span>}
                {enquiry.packageId && <span>Package: {enquiry.packageId}</span>}
              </div>
              {enquiry.message && (
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{enquiry.message}</p>
              )}
              <p className="text-[10px] text-slate-600 mt-3">
                {new Date(enquiry.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              {enquiry.status === "new" && (
                <button
                  onClick={() => markRead(enquiry.id)}
                  className="text-[11px] text-slate-400 hover:text-emerald-300 whitespace-nowrap"
                >
                  Mark read
                </button>
              )}
              {enquiry.status !== "archived" && (
                <button
                  onClick={() => archive(enquiry.id)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 whitespace-nowrap"
                >
                  Archive
                </button>
              )}
              <button
                onClick={() => remove(enquiry.id)}
                className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1 whitespace-nowrap"
              >
                <Trash2 size={11} /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
