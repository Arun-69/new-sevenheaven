import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SiteChrome from "@/components/SiteChrome";
import { resolveImage } from "@/lib/media";

// The whole site reads admin-editable content (media overrides, stories,
// services, pricing, team) on every request, so every route must render
// dynamically rather than being statically pre-rendered at build time.
// This setting on the root layout applies to every route in the app.
export const dynamic = "force-dynamic";

const titleTemplate = `${siteConfig.name} — Wedding Photographer in Perambalur, Tamil Nadu`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),

  title: {
    default: titleTemplate,
    template: `%s — ${siteConfig.name}`,
  },

  description: siteConfig.metaDescription,
  keywords: [...siteConfig.keywords],

  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/logo-256.png",
        type: "image/png",
        sizes: "256x256",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],

    shortcut: ["/favicon.ico"],
  },

  openGraph: {
    title: titleTemplate,
    description: siteConfig.metaDescription,
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    locale: "en_IN",

    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: titleTemplate,
    description: siteConfig.metaDescription,
    images: ["/logo-512.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

// Structured data (JSON-LD) — helps Google understand this is a local
// photography business, improving eligibility for rich results.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Photographer",

  "@id": `${siteConfig.siteUrl}/#business`,

  name: siteConfig.name,

  image: `${siteConfig.siteUrl}/logo-512.png`,
  logo: `${siteConfig.siteUrl}/logo-512.png`,

  url: siteConfig.siteUrl,

  telephone: siteConfig.phone,
  email: siteConfig.email,

  description: siteConfig.metaDescription,

  priceRange: "₹₹",

  foundingDate: String(siteConfig.foundedYear),

  address: {
    "@type": "PostalAddress",
    streetAddress: "Asoor",
    addressLocality: "Perambalur",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },

  sameAs: [
    siteConfig.instagram,
    siteConfig.facebook,
    siteConfig.youtube,
  ],

  areaServed: [
    "Perambalur",
    "Ariyalur",
    "Trichy",
    "Tamil Nadu",
  ],

  serviceType: [
    "Wedding Photography",
    "Event Photography",
    "Cinematic Films",
    "Graphic Design",
    "Photo Albums",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoUrl = await resolveImage("logo", siteConfig.logo);

  return (
    <html lang="en">
      <body className="font-sans bg-bg text-ink antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />

        <SiteChrome logoUrl={logoUrl}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}