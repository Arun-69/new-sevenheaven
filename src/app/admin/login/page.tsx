"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";
import { siteConfig } from "@/config/site";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={56}
            height={56}
            className="rounded-full mb-4"
          />
          <p className="text-slate-200 font-medium">{siteConfig.shortName} Admin</p>
          <p className="text-slate-500 text-xs mt-1">Sign in to manage the site</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111318] border border-white/5 rounded-lg p-6"
        >
          <label className="text-xs text-slate-400 mb-2 block">Password</label>
          <div className="relative mb-4">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0c0f] border border-white/10 focus:border-indigo-400 outline-none rounded-md pl-9 pr-3 py-2.5 text-sm text-slate-200 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-md transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
