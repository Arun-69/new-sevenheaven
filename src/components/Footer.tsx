import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { siteConfig, whatsappLink, telLink, mailLink } from "@/config/site";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Photography", href: "/services" },
      { label: "Films", href: "/films" },
      { label: "Design", href: "/creative" },
      { label: "Albums", href: "/services#preserve" },
      { label: "Events", href: "/stories" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Packages", href: "/packages" },
      { label: "Contact", href: "/contact" },
      { label: "Admin", href: "/admin" },
    ],
  },
];

export default function Footer({ logoUrl }: { logoUrl?: string } = {}) {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={logoUrl || siteConfig.logo}
                alt={`${siteConfig.name} logo`}
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="font-serif text-2xl tracking-wide text-ink">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-col gap-2.5 mt-6 text-sm text-muted">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.locationMapUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-ink transition-colors"
              >
                <MapPin size={16} className="text-gold shrink-0" />
                {siteConfig.location}
              </a>
              <a href={telLink()} className="flex items-center gap-2.5 hover:text-ink transition-colors">
                <Phone size={16} className="text-gold shrink-0" />
                {siteConfig.phone}
              </a>
              <a href={mailLink()} className="flex items-center gap-2.5 hover:text-ink transition-colors">
                <Mail size={16} className="text-gold shrink-0" />
                {siteConfig.email}
              </a>
            </div>

            <div className="flex gap-4 mt-6 text-ink/70">
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href={siteConfig.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-gold transition-colors">
                <Youtube size={18} />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-gold transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.locationMapUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${siteConfig.locationMapUrl} in Google Maps`}
              className="group relative block w-full h-36 mt-6 overflow-hidden border border-white/10"
            >
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.locationMapUrl)}&output=embed`}
                className="w-full h-full pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${siteConfig.locationMapUrl}`}
              />
              <div className="absolute inset-0 bg-bg/10 group-hover:bg-bg/0 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gold text-bg text-[11px] tracking-widest2 uppercase px-4 py-2">
                  Open in Google Maps
                </span>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-xs tracking-widest2 uppercase text-gold mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted hover:text-ink transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
