import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

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

  const bytes = Buffer.from(await file.arrayBuffer());
  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${sanitizeExt(file.name)}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, uniqueName), bytes);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Could not save the file. On some hosting platforms the filesystem is read-only at runtime — see the note in src/lib/media.ts.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: `/uploads/${uniqueName}` });
}
