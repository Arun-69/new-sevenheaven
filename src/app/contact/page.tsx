import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} to plan your wedding, event, or shoot. WhatsApp, call, or send an enquiry — we reply within 24 hours.`,
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}
