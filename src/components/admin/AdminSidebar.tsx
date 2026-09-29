"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Image as ImageIcon,
  Images,
  FolderOpen,
  Layers,
  Package,
  Inbox,
  Star,
  UserCircle,
  Settings,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Media Library", href: "/admin/media", icon: Images },
  { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  { label: "Galleries", href: "/admin/galleries", icon: FolderOpen },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Team", href: "/admin/team", icon: UserCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#111318] border-r border-white/5 min-h-screen py-6 px-4 hidden md:block">
      <div className="px-3 mb-8">
        <p className="text-sm font-semibold text-white tracking-wide">
          {siteConfig.shortName}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">Studio Admin</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
