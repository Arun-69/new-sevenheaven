import fs from "fs/promises";
import path from "path";
import { unstable_cache, revalidateTag } from "next/cache";

/*
 * Shared persistence layer used by:
 * - lib/content.ts
 * - lib/media.ts
 *
 * Local dev / normal Node server / VPS:
 *   Data is stored in the content/ folder.
 *
 * Vercel:
 *   Data is stored in Vercel Blob when
 *   BLOB_READ_WRITE_TOKEN is available.
 */

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const CONTENT_DIR = path.join(process.cwd(), "content");

/*
 * IMPORTANT:
 *
 * We intentionally DO NOT use a time-based revalidation such as:
 *
 *   revalidate: 3600
 *
 * Because that would cause Blob list() to run again after 1 hour.
 *
 * Instead:
 *
 *   revalidate: false
 *
 * means the cached Blob data stays cached indefinitely
 * until we explicitly invalidate it after an admin update.
 *
 * Flow:
 *
 * Visitor
 *   ↓
 * Cached JSON
 *   ↓
 * No Blob list()
 *
 * Admin saves
 *   ↓
 * Blob PUT
 *   ↓
 * revalidateTag()
 *   ↓
 * Cache invalidated
 *   ↓
 * Next request performs ONE list()
 *   ↓
 * New JSON is cached again
 */
async function readBlobJSON(
  file: string
): Promise<{ found: boolean; data: unknown }> {
  const { list } = await import("@vercel/blob");

  const pathname = `content/${file}`;

  /*
   * This is the ONLY place where Blob list() is called.
   *
   * Because this function is wrapped with unstable_cache below,
   * this will NOT run on every visitor request.
   *
   * It runs:
   * 1. First time the file is requested
   * 2. After an admin update invalidates the cache
   */
  const { blobs } = await list({
    prefix: pathname,
    limit: 1,
  });

  const match = blobs.find(
    (blob: { pathname: string }) => blob.pathname === pathname
  );

  if (!match) {
    return {
      found: false,
      data: null,
    };
  }

  const response = await fetch(match.url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Blob fetch failed (${response.status}) for ${file}`
    );
  }

  return {
    found: true,
    data: await response.json(),
  };
}

/*
 * Cache Blob JSON indefinitely.
 *
 * IMPORTANT:
 * Do NOT change this to:
 *
 *   revalidate: 3600
 *
 * because that will make the cache expire after one hour
 * and cause another Blob list() operation.
 *
 * The cache is now invalidated manually by writeJSON()
 * using revalidateTag().
 */
function cachedBlobRead(file: string) {
  return unstable_cache(
    () => readBlobJSON(file),
    ["blob-json", file],
    {
      revalidate: false,
      tags: [`blob:${file}`],
    }
  )();
}

/*
 * Read JSON
 */
export async function readJSON<T>(
  file: string,
  seed: T
): Promise<T> {
  /*
   * Vercel Blob mode
   */
  if (useBlob) {
    try {
      const result = await cachedBlobRead(file);

      /*
       * Blob file doesn't exist yet.
       * Return seed data.
       *
       * We DO NOT write the seed here because that would
       * create an unnecessary Blob PUT operation.
       */
      if (!result.found) {
        return seed;
      }

      return result.data as T;
    } catch (error) {
      console.error(
        `[storage] Blob read failed for ${file}:`,
        error
      );

      /*
       * If Blob read fails, return seed data instead of
       * crashing the page.
       */
      return seed;
    }
  }

  /*
   * Local filesystem mode
   */
  const fullPath = path.join(CONTENT_DIR, file);

  try {
    const raw = await fs.readFile(fullPath, "utf-8");

    return JSON.parse(raw) as T;
  } catch {
    /*
     * File doesn't exist locally.
     * Create it using seed data.
     */
    await fs.mkdir(CONTENT_DIR, {
      recursive: true,
    });

    await fs.writeFile(
      fullPath,
      JSON.stringify(seed, null, 2),
      "utf-8"
    );

    return seed;
  }
}

/*
 * Write JSON
 */
export async function writeJSON<T>(
  file: string,
  data: T
): Promise<void> {
  /*
   * Vercel Blob mode
   */
  if (useBlob) {
    const { put } = await import("@vercel/blob");

    /*
     * Admin update:
     *
     * PUT the new JSON to the same Blob pathname.
     */
    await put(
      `content/${file}`,
      JSON.stringify(data, null, 2),
      {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",

        /*
         * Browser/CDN cache can keep the actual Blob response
         * for a short period.
         */
        cacheControlMaxAge: 60,
      }
    );

    /*
     * IMPORTANT:
     *
     * Only when admin saves new data do we invalidate
     * the cached JSON.
     *
     * This means the next read will execute readBlobJSON()
     * once, which performs one list() operation.
     *
     * After that, the result is cached indefinitely again.
     */
    try {
      revalidateTag(`blob:${file}`);
    } catch (error) {
      console.error(
        `[storage] revalidateTag failed for ${file}:`,
        error
      );
    }

    return;
  }

  /*
   * Local filesystem mode
   */
  await fs.mkdir(CONTENT_DIR, {
    recursive: true,
  });

  await fs.writeFile(
    path.join(CONTENT_DIR, file),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}