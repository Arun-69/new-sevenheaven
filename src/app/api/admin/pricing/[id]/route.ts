import { NextRequest, NextResponse } from "next/server";
import { getPricingTiers, savePricingTiers } from "@/lib/content";
import type { PricingTier } from "@/data/pricing";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Partial<PricingTier>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const tiers = await getPricingTiers();
  const idx = tiers.findIndex((t) => t.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });

  tiers[idx] = { ...tiers[idx], ...body, id: tiers[idx].id };
  await savePricingTiers(tiers);
  return NextResponse.json({ tier: tiers[idx] });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const tiers = await getPricingTiers();
  const next = tiers.filter((t) => t.id !== params.id);
  if (next.length === tiers.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  await savePricingTiers(next);
  return NextResponse.json({ ok: true });
}
