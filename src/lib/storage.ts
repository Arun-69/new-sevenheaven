import fs from "fs/promises";
import path from "path";

// Shared persistence layer used by lib/content.ts (stories/services/pricing/
// team JSON) and lib/media.ts (image-slot overrides).
//
// Local dev / a normal Node server / VPS (`npm run build && npm run start`):
// writes go straight to the `content/` folder on disk, which persists fine.
//
// Vercel (and most serverless hosts): the filesystem is read-only at
// runtime, so writes there are redirected to Vercel Blob storage instead.
// This kicks in automatically as soon as a Blob store is connected to the
// project (Vercel then sets BLOB_READ_WRITE_TOKEN for you) — no code changes
// needed. See the "Deploying to Vercel" note in the README for setup steps.

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readJSON<T>(file: string, seed: T): Promise<T> {
  if (useBlob) {
    try {
      const { list } = await import("@vercel/blob");
      const pathname = `content/${file}`;
      const { blobs } = await list({ prefix: pathname, limit: 1 });
      const match = blobs.find((b: { pathname: string }) => b.pathname === pathname);
      if (!match) {
        await writeJSON(file, seed);
        return seed;
      }
      const res = await fetch(match.url, { cache: "no-store" });
      if (!res.ok) return seed;
      return (await res.json()) as T;
    } catch (err) {
      console.error(`[storage] Blob read failed for ${file}:`, err);
      return seed;
    }
  }

  const full = path.join(CONTENT_DIR, file);
  try {
    const raw = await fs.readFile(full, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.writeFile(full, JSON.stringify(seed, null, 2), "utf-8");
    return seed;
  }
}

export async function writeJSON<T>(file: string, data: T): Promise<void> {
  if (useBlob) {
    const { put } = await import("@vercel/blob");
    await put(`content/${file}`, JSON.stringify(data, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}
