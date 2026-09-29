import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminSidebarProvider } from "@/components/admin/AdminSidebarContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSidebarProvider>
      <div className="min-h-screen bg-[#0b0c0f] text-slate-200 flex font-sans">
        <AdminSidebar />
        <div className="flex-1 min-w-0">
          <AdminHeader />
          <main className="p-6 md:p-10">{children}</main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
