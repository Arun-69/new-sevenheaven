// Shared plain constant (no "use client", no server-only code) so both the
// client-side Hero component and the server-side media-slots helper agree
// on the same fallback image.
export const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop";
