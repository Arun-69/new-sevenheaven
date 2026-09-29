// Simple, dependency-free session auth for the /admin area.
// No database required: the session cookie is just a timestamp signed with
// a secret, so we can verify it hasn't been tampered with and hasn't expired.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
// `crypto` module because this file is imported from middleware.ts, which
// runs on Next.js's Edge runtime — Node's crypto module isn't available
// there, but Web Crypto works in both Edge and Node.
//
// IMPORTANT — set these in your hosting environment before going live:
//   ADMIN_PASSWORD   the password used to log into /admin
//   SESSION_SECRET    any long random string, used to sign the session cookie
// See .env.local.example.

const SESSION_COOKIE = "sh_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET || "seven-heaven-dev-secret-change-me";
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(signature);
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const signature = await hmacSign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = await hmacSign(issuedAt);
  if (expected !== signature) return false;

  const age = Date.now() - Number(issuedAt);
  if (Number.isNaN(age) || age < 0) return false;
  if (age > SESSION_MAX_AGE_SECONDS * 1000) return false;
  return true;
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD || "sevenheaven2026";
  // Compare as HMAC digests of equal length rather than the raw strings —
  // simple, avoids leaking length via early-exit string comparison.
  const a = await hmacSign(password);
  const b = await hmacSign(expected);
  return a === b;
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS;
