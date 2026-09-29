import { NextRequest, NextResponse } from "next/server";
import { getServices, saveServices } from "@/lib/content";
import type { Service } from "@/data/services";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Partial<Service>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const services = await getServices();
  const idx = services.findIndex((s) => s.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });

  services[idx] = { ...services[idx], ...body, id: services[idx].id };
  await saveServices(services);
  return NextResponse.json({ service: services[idx] });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const services = await getServices();
  const next = services.filter((s) => s.id !== params.id);
  if (next.length === services.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  await saveServices(next);
  return NextResponse.json({ ok: true });
}
