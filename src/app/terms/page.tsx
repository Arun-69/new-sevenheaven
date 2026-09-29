import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <section className="pt-40 md:pt-52 pb-28 container-edit max-w-2xl">
      <h1 className="font-serif text-4xl md:text-5xl mb-8">Terms of Service</h1>
      <p className="text-muted leading-relaxed mb-4">
        These terms govern bookings made with {siteConfig.name}. A booking is
        confirmed once a deposit and signed agreement are received.
      </p>
      <p className="text-muted leading-relaxed mb-4">
        Final delivery timelines, usage rights, and cancellation terms will
        be outlined in your individual event agreement.
      </p>
      <p className="text-muted leading-relaxed">
        Replace this placeholder with your studio&apos;s finalised terms
        before going live.
      </p>
    </section>
  );
}
