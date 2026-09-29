"use client";

import { useRef, useState } from "react";
import ImageWithLoader from "@/components/ImageWithLoader";
import { Upload, Loader2 } from "lucide-react";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <label className="text-xs text-slate-400 mb-2 block">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative w-20 h-20 rounded-md overflow-hidden bg-black/40 border border-white/10 shrink-0">
          {value ? (
            <ImageWithLoader
              src={value}
              alt={label}
              fill
              sizes="80px"
              className="object-cover"
              unoptimized={value.startsWith("/uploads/")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
              No image
            </div>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex items-center gap-2 text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded-md text-slate-200 transition-colors"
          >
            {busy ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {busy ? "Uploading…" : "Upload Image"}
          </button>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="or paste an image URL"
            className="w-full mt-2 bg-transparent border border-white/10 focus:border-indigo-400 outline-none rounded-md px-3 py-1.5 text-xs text-slate-300"
          />
          {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
