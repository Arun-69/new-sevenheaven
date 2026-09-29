"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Ctx = { open: boolean; toggle: () => void; close: () => void };

const AdminSidebarCtx = createContext<Ctx | null>(null);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <AdminSidebarCtx.Provider
      value={{ open, toggle: () => setOpen((v) => !v), close: () => setOpen(false) }}
    >
      {children}
    </AdminSidebarCtx.Provider>
  );
}

export function useAdminSidebar(): Ctx {
  const ctx = useContext(AdminSidebarCtx);
  if (!ctx) throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  return ctx;
}
