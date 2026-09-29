"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between">
      <p className="text-sm text-slate-400">Studio Dashboard</p>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
      >
        <LogOut size={14} />
        Log out
      </button>
    </header>
  );
}
