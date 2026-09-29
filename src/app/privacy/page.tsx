import { siteConfig } from "@/config/site";

export default function PrivacyPage() {
  return (
    <section className="pt-40 md:pt-52 pb-28 container-edit max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy Policy</h1>
      <p className="text-muted leading-relaxed mb-4">
        {siteConfig.name} collects only the information you share with us
        through enquiry forms and bookings — your name, contact details, and
        event information — to plan and deliver your event coverage.
      </p>
      <p className="text-muted leading-relaxed mb-4">
        Client photos and videos are shared only through password-protected
        galleries and are never sold or shared with third parties without
        your consent.
      </p>
      <p className="text-muted leading-relaxed">
        Replace this placeholder policy with your studio&apos;s finalised
        terms before going live.
      </p>
    </section>
  );
}
