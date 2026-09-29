import { readJSON, writeJSON } from "@/lib/storage";
import { stories as seedStories, type Story } from "@/data/stories";
import { services as seedServices, type Service } from "@/data/services";
import { pricingTiers as seedPricing, type PricingTier } from "@/data/pricing";
import { team as seedTeam, type TeamMember } from "@/data/team";

// Server-only. Once an admin makes their first edit to a collection, its
// content/*.json "file" (see src/lib/storage.ts) becomes the live source of
// truth for the site — before that, the site reads the defaults shipped in
// src/data/*.ts. Persistence (local disk vs. Vercel Blob) is handled by
// src/lib/storage.ts, so this file just calls readJSON/writeJSON.

// ---------- Portfolio Stories ----------
export async function getStories(): Promise<Story[]> {
  return readJSON<Story[]>("stories.json", seedStories);
}
export async function saveStories(items: Story[]): Promise<void> {
  await writeJSON("stories.json", items);
}
export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const all = await getStories();
  return all.find((s) => s.slug === slug);
}

// ---------- Services ----------
export async function getServices(): Promise<Service[]> {
  return readJSON<Service[]>("services.json", seedServices);
}
export async function saveServices(items: Service[]): Promise<void> {
  await writeJSON("services.json", items);
}

// ---------- Pricing tiers ("Packages" in the admin) ----------
export async function getPricingTiers(): Promise<PricingTier[]> {
  return readJSON<PricingTier[]>("pricing.json", seedPricing);
}
export async function savePricingTiers(items: PricingTier[]): Promise<void> {
  await writeJSON("pricing.json", items);
}

// ---------- Team ----------
export async function getTeam(): Promise<TeamMember[]> {
  return readJSON<TeamMember[]>("team.json", seedTeam);
}
export async function saveTeam(items: TeamMember[]): Promise<void> {
  await writeJSON("team.json", items);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "item";
}
