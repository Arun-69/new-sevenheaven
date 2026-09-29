"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import Preloader from "./Preloader";

export default function SiteChrome({
  children,
  logoUrl,
}: {
  children: React.ReactNode;
  logoUrl?: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Preloader logoUrl={logoUrl} />
      <Navbar logoUrl={logoUrl} />
      <main>{children}</main>
      <Footer logoUrl={logoUrl} />
      <WhatsAppFloat />
    </>
  );
}
