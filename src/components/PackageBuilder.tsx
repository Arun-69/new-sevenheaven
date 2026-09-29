"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import PackageCard from "@/components/PackageCard";
import { packageEventOptions, packageServiceOptions } from "@/data/packages";
import { cn } from "@/lib/utils";

const steps = ["Event", "Services", "Details"];

export default function PackageBuilder() {
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [details, setDetails] = useState({
    eventDate: "",
    location: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const toggleService = (id: string) =>
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const canProceed = () => {
    if (step === 0) return !!eventType;
    if (step === 1) return selectedServices.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const serviceNames = selectedServices
        .map((id) => packageServiceOptions.find((s) => s.id === id)?.label || id)
        .join(", ");
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone,
          eventType,
          eventDate: details.eventDate,
          message: [
            details.location && `Location: ${details.location}`,
            details.guests && `Guests: ${details.guests}`,
            serviceNames && `Services requested: ${serviceNames}`,
          ]
            .filter(Boolean)
            .join("\n"),
          source: "packages-builder",
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
    <section id="builder" className="pb-28 container-edit max-w-3xl mx-auto scroll-mt-28">
      <Reveal>
        <p className="text-gold text-xs tracking-widest2 uppercase mb-4 text-center">
          Build Your Event
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] text-balance text-center mb-4">
          WANT SOMETHING CUSTOM?
        </h1>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-muted text-center max-w-md mx-auto mb-14">
          Tell us about your event and we&apos;ll tailor a package beyond the
          plans above — the right fit for exactly what you need.
        </p>
      </Reveal>

      {!submitted && (
        <Reveal delay={0.2}>
          <div className="flex justify-center gap-3 mb-14">
            {steps.map((label, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2 text-xs tracking-widest2 uppercase",
                  i === step ? "text-gold" : i < step ? "text-ink/60" : "text-muted/40"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center text-[10px]",
                    i === step
                      ? "border-gold text-gold"
                      : i < step
                      ? "border-ink/40 text-ink/60"
                      : "border-white/20"
                  )}
                >
                  {i + 1}
                </span>
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      )}

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gold/40 bg-gold/5 p-10 text-center flex flex-col items-center gap-4"
          >
            <CheckCircle2 className="text-gold" size={36} />
            <p className="font-serif text-2xl">Request received.</p>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Thank you{details.name ? `, ${details.name.split(" ")[0]}` : ""}.
              We&apos;ll put together a custom quote based on your event and
              reach out within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <p className="font-serif text-2xl mb-6">
                  What are you planning?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {packageEventOptions.map((opt) => (
                    <PackageCard
                      key={opt.id}
                      label={opt.label}
                      selected={eventType === opt.id}
                      onToggle={() => setEventType(opt.id)}
                      variant="radio"
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="font-serif text-2xl mb-6">What do you need?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {packageServiceOptions.map((opt) => (
                    <PackageCard
                      key={opt.id}
                      label={opt.label}
                      selected={selectedServices.includes(opt.id)}
                      onToggle={() => toggleService(opt.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="font-serif text-2xl mb-6">A few final details</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <DetailInput
                    label="Event Date"
                    type="date"
                    value={details.eventDate}
                    onChange={(v) => setDetails((d) => ({ ...d, eventDate: v }))}
                  />
                  <DetailInput
                    label="Location"
                    value={details.location}
                    onChange={(v) => setDetails((d) => ({ ...d, location: v }))}
                  />
                </div>
                <div className="mb-4">
                  <DetailInput
                    label="Expected Guests"
                    value={details.guests}
                    onChange={(v) => setDetails((d) => ({ ...d, guests: v }))}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DetailInput
                    label="Name"
                    value={details.name}
                    onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                  />
                  <DetailInput
                    label="Phone"
                    value={details.phone}
                    onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                  />
                  <DetailInput
                    label="Email"
                    type="email"
                    value={details.email}
                    onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div className="mt-12">
          {submitError && <p className="text-red-400 text-xs mb-4 text-right">{submitError}</p>}
          <div className="flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={cn(
                "inline-flex items-center gap-2 text-xs tracking-widest2 uppercase transition-opacity",
                step === 0 ? "opacity-0 pointer-events-none" : "text-muted hover:text-ink"
              )}
            >
              <ArrowLeft size={14} /> Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => canProceed() && setStep((s) => s + 1)}
                disabled={!canProceed()}
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest2 uppercase transition-colors",
                  canProceed()
                    ? "bg-gold text-bg hover:bg-gold-soft"
                    : "bg-white/10 text-muted cursor-not-allowed"
                )}
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || !details.name || !details.email}
                className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-xs tracking-widest2 uppercase disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Request a Custom Quote"} <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function DetailInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-muted mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-white/15 focus:border-gold outline-none px-4 py-3 text-ink transition-colors"
      />
    </div>
  );
}
