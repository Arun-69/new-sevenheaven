import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Booking — Wedding Photographer Perambalur",
  description:
    "Book Seven Heaven Photography for your wedding or event in Perambalur, Tamil Nadu. WhatsApp, call or send an enquiry — we reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}