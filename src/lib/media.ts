import fs from "fs/promises";
import path from "path";

// Server-only. A tiny JSON-file "database" that lets the /admin area swap
// out images without touching code. Each editable image on the site has a
// stable key (e.g. "logo", "hero", "story:Hari-priya"); if a key has an
// override saved here, the site shows that image instead of the default
// one that ships in src/config or src/data.
//
// NOTE on hosting: this works out of the box with `npm run build && npm run
// start` on any regular Node server / VPS, because the filesystem persists.
// It will NOT persist on serverless platforms with a read-only filesystem
// (e.g. Vercel's default runtime) — there you'd swap this file-based store
// for a real database or object storage bucket. The API in this file is a
// deliberately small surface so that swap is a one-file change.

const DATA_FILE = path.join(process.cwd(), "content", "media-overrides.json");

export type MediaOverrides = Record<string, string>;

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, "{}", "utf-8");
  }
}

export async function getMediaOverrides(): Promise<MediaOverrides> {
  await ensureFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as MediaOverrides;
  } catch {
    return {};
  }
}

export async function setMediaOverride(key: string, url: string): Promise<MediaOverrides> {
  const current = await getMediaOverrides();
  const next = { ...current, [key]: url };
  await fs.writeFile(DATA_FILE, JSON.stringify(next, null, 2), "utf-8");
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
