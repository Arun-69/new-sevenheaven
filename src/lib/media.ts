import { readJSON, writeJSON } from "@/lib/storage";

// Server-only. A tiny JSON "database" that lets the /admin area swap out
// images without touching code. Each editable image on the site has a
// stable key (e.g. "logo", "hero", "story:arun-priya"); if a key has an
// override saved here, the site shows that image instead of the default
// one that ships in src/config or src/data.
//
// Persistence (local disk vs. Vercel Blob on read-only-filesystem hosts) is
// handled by src/lib/storage.ts.

const FILE = "media-overrides.json";

export type MediaOverrides = Record<string, string>;

export async function getMediaOverrides(): Promise<MediaOverrides> {
  return readJSON<MediaOverrides>(FILE, {});
}

export async function setMediaOverride(key: string, url: string): Promise<MediaOverrides> {
  const current = await getMediaOverrides();
  const next = { ...current, [key]: url };
  await writeJSON(FILE, next);
  return next;
}

export async function resolveImage(key: string, fallback: string): Promise<string> {
  const overrides = await getMediaOverrides();
  return overrides[key] || fallback;
}

export function applyOverrides<T extends string>(
  overrides: MediaOverrides,
  key: string,
  fallback: T
): string {
  return overrides[key] || fallback;
}
