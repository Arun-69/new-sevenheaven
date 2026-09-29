import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

function sanitizeExt(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return /^\.[a-z0-9]{2,5}$/.test(ext) ? ext : ".jpg";
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await isValidSessionToken(session))) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type. Use JPG, PNG, WEBP, AVIF or GIF." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File is too large (max 8MB)." }, { status: 400 });
  }

  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${sanitizeExt(file.name)}`;

  // Vercel (and most serverless hosts): filesystem is read-only at runtime,
  // so uploads go to Vercel Blob storage instead. This activates
  // automatically once a Blob store is connected to the project.
  if (useBlob) {
    try {
      const { put } = await import("@vercel/blob");
      const bytes = Buffer.from(await file.arrayBuffer());
      const blob = await put(`uploads/${uniqueName}`, bytes, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      console.error("[upload] Vercel Blob upload failed:", err);
      return NextResponse.json({ error: "Upload failed. Check the Blob store is connected to this project." }, { status: 500 });
    }
  }

  // Local dev / a normal Node server / VPS: write straight to /public/uploads.
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, uniqueName), bytes);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Could not save the file. This host's filesystem is read-only at runtime — connect a Vercel Blob store (see the README) or deploy to a regular Node server/VPS instead.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/uploads/${uniqueName}` });
}
