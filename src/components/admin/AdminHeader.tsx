"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useAdminSidebar } from "./AdminSidebarContext";

export default function AdminHeader() {
  const router = useRouter();
  const { toggle } = useAdminSidebar();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    // Full navigation, same reasoning as the login page: guarantees the
    // cleared session cookie is respected on the very next request instead
    // of a stale client-side router cache being reused.
    window.location.href = "/admin/login";
  };

  return (
    <header className="border-b border-white/5 px-4 md:px-10 py-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="md:hidden p-1.5 -ml-1 text-slate-300 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <p className="text-sm text-slate-400">Studio Dashboard</p>
      </div>
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
