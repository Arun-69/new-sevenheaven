import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import { getMediaOverrides, setMediaOverride } from "@/lib/media";
import { getEditableMediaSlots } from "@/lib/media-slots";

function requireAuth(req: NextRequest) {
  const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(session);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const slots = await getEditableMediaSlots();
  return NextResponse.json({ slots });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let key = "";
  let url = "";
  try {
    const body = await req.json();
    key = typeof body?.key === "string" ? body.key : "";
    url = typeof body?.url === "string" ? body.url : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!key || !url) {
    return NextResponse.json({ error: "key and url are required." }, { status: 400 });
  }

  await setMediaOverride(key, url);
  const overrides = await getMediaOverrides();
  return NextResponse.json({ ok: true, overrides });
}
