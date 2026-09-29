import { NextRequest, NextResponse } from "next/server";
import { updateEnquiry, deleteEnquiry } from "@/lib/enquiries";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const status = body.status;
  if (status !== "new" && status !== "read" && status !== "archived") {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const updated = await updateEnquiry(params.id, { status });
  if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ enquiry: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = await deleteEnquiry(params.id);
  if (!ok) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
