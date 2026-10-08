// Change your brand identity and contact details here.
// Nothing else in the codebase should hard-code these values.

export const siteConfig = {
  name: "Seven Heaven Photography",
  shortName: "Seven Heaven",
  tagline: "We Capture It. We Create It. We Preserve It.",
  metaDescription:
    "Seven Heaven Photography — wedding photographer in Perambalur, Tamil Nadu. Candid wedding photography, pre-wedding shoots, cinematic films, albums and complete event media services.",

  // Logo (used in Navbar, Footer, Preloader, and favicons in /public)
  logo: "/logo.png",

  // TODO: replace with your real live domain once it's live (used for SEO: sitemap, robots, canonical URLs, JSON-LD).
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sevenheavenphotography.com").replace(/\/$/, ""),

  // A few keywords the studio should be found for. Used in the SEO meta tags.
  keywords: [
    "Seven Heaven Photography",
    "wedding photography",
    "event photography",
    "cinematic wedding films",
    "photography studio Tamil Nadu",
    "Asoor photographer",
    "event media services",
    "cinematic films",
    "wedding albums",
    "Perambalur photography",
    "near me wedding photographer",
    "outdoor wedding photography",
    "pre wedding photography",
    "love story photography",
    "low price wedding photography",
    "wedding videography",
    "candid photography",
  ],

  // Contact
  phone: "+91 8098486021",
  whatsapp: "918098486021", // digits only, country code first, used for wa.me links
  email: "sevenheavenphotography3399@gmail.com",
  // TODO: confirm the exact address/area — this is a placeholder, edit it here and it updates everywhere (footer, SEO schema).
  location: "Asoor, Perambalur, Tamil Nadu",
  locationMapUrl: "Seven Heaven Photography, Asoor, Perambalur, Tamil Nadu",
  // Social
  instagram: "https://www.instagram.com/seven_heaven__photography",
  facebook: "https://facebook.com/sevenheavenphotography",
  youtube: "https://youtube.com/@sevenheavenphotography",

  // Misc
  foundedYear: 2016,
  copyrightYear: 2026,
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const telLink = () => `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
export const mailLink = () => `mailto:${siteConfig.email}`;