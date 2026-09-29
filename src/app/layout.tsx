import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SiteChrome from "@/components/SiteChrome";
import { resolveImage } from "@/lib/media";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const titleTemplate = `${siteConfig.name} — Photography, Films & Creative Events`;

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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-256.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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

// Structured data (JSON-LD) — helps Google understand this is a local photography
// business, improving eligibility for rich results, Maps, and the Knowledge Panel.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.siteUrl}/#business`,
  name: siteConfig.name,
  image: `${siteConfig.siteUrl}/logo-512.png`,
  logo: `${siteConfig.siteUrl}/logo-512.png`,
  url: siteConfig.siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  description: siteConfig.metaDescription,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
    addressCountry: "IN",
  },
  sameAs: [siteConfig.instagram, siteConfig.facebook, siteConfig.youtube],
  areaServed: siteConfig.location,
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
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SiteChrome logoUrl={logoUrl}>{children}</SiteChrome>
      </body>
    </html>
  );
}
