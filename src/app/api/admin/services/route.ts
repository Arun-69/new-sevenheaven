import { NextRequest, NextResponse } from "next/server";
import { getServices, saveServices, slugify } from "@/lib/content";
import type { Service } from "@/data/services";

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  let body: Partial<Service>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.title || !body.category) {
    return NextResponse.json({ error: "title and category are required." }, { status: 400 });
  }

  const services = await getServices();
  const baseId = slugify(body.title);
  let id = baseId;
  let n = 2;
  while (services.some((s) => s.id === id)) {
    id = `${baseId}-${n++}`;
  }

  const newService: Service = {
    id,
    category: body.category,
    title: body.title,
    description: body.description || "",
    image: body.image || "",
  };

  await saveServices([...services, newService]);
  return NextResponse.json({ service: newService }, { status: 201 });
}
