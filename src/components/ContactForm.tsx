"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { siteConfig, whatsappLink, telLink } from "@/config/site";

interface FormState {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  services: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  location: "",
  services: "",
  message: "",
};

export default function ContactForm() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package") || undefined;

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.eventType.trim()) next.eventType = "Event type is required";
    if (!form.message.trim()) next.message = "Tell us a little about your event";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          eventType: form.eventType,
          eventDate: form.eventDate,
          packageId,
          message: [form.location && `Location: ${form.location}`, form.services && `Services: ${form.services}`, form.message]
            .filter(Boolean)
            .join("\n\n"),
          source: "contact",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-40 md:pt-52 pb-28 container-edit">
      <Reveal>
        <p className="text-gold text-xs tracking-widest2 uppercase mb-4">
          Get In Touch
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-balance max-w-3xl mb-16">
          LET&apos;S CREATE SOMETHING UNFORGETTABLE.
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16">
        <Reveal delay={0.15}>
          {submitted ? (
            <div className="border border-gold/40 bg-gold/5 p-10 flex flex-col items-start gap-4">
              <CheckCircle2 className="text-gold" size={32} />
              <p className="font-serif text-2xl">Enquiry received.</p>
              <p className="text-muted text-sm leading-relaxed">
                Thank you, {form.name.split(" ")[0] || "there"}. We&apos;ll be
                in touch within 24 hours to talk through your event.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  error={errors.phone}
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Event Type"
                  value={form.eventType}
                  onChange={(v) => update("eventType", v)}
                  error={errors.eventType}
                  placeholder="Wedding, Birthday..."
                />
                <Field
                  label="Event Date"
                  type="date"
                  value={form.eventDate}
                  onChange={(v) => update("eventDate", v)}
                />
              </div>
              <Field
                label="Location"
                value={form.location}
                onChange={(v) => update("location", v)}
              />
              <Field
                label="Services Required"
                value={form.services}
                onChange={(v) => update("services", v)}
                placeholder="Photography, Films, Album..."
              />
              <div>
                <label className="text-xs tracking-widest2 uppercase text-muted mb-2 block">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border border-white/15 focus:border-gold outline-none px-4 py-3 text-ink placeholder:text-muted/50 transition-colors"
                  placeholder="Tell us about your event..."
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>
                )}
              </div>

              {submitError && <p className="text-red-400 text-xs -mt-2">{submitError}</p>}

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitting}
                className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest2 uppercase disabled:opacity-60"
              >
                <Send size={14} /> {submitting ? "Sending…" : "Send Enquiry"}
              </motion.button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.25}>
          <div className="border border-white/10 p-8 md:p-10 h-full flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-widest2 uppercase text-gold mb-3">
                Studio
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {siteConfig.location}
              </p>
              <p className="text-muted text-sm mt-1">{siteConfig.email}</p>
              <p className="text-muted text-sm mt-1">{siteConfig.phone}</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink("Hi! I'd like to enquire about my event.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-bg px-6 py-3.5 text-xs tracking-widest2 uppercase"
              >
                <MessageCircle size={14} /> WhatsApp Us
              </a>
              <a
                href={telLink()}
                className="inline-flex items-center justify-center gap-2 border border-ink/30 px-6 py-3.5 text-xs tracking-widest2 uppercase hover:border-gold hover:text-gold transition-colors"
              >
                <Phone size={14} /> Call Us
              </a>
            </div>

            <p className="text-muted text-xs leading-relaxed border-t border-white/10 pt-6">
              Planning an event? Reach out on WhatsApp for the fastest
              response — we usually reply within a few hours.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-muted mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-white/15 focus:border-gold outline-none px-4 py-3 text-ink placeholder:text-muted/50 transition-colors"
      />
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}
