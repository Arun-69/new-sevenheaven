import { NextRequest, NextResponse } from "next/server";
import { getPricingTiers, savePricingTiers, slugify } from "@/lib/content";
import type { PricingTier } from "@/data/pricing";

export async function GET() {
  const tiers = await getPricingTiers();
  return NextResponse.json({ tiers });
}

export async function POST(req: NextRequest) {
  let body: Partial<PricingTier>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.name || !body.price) {
    return NextResponse.json({ error: "name and price are required." }, { status: 400 });
  }

  const tiers = await getPricingTiers();
  const baseId = slugify(body.name);
  let id = baseId;
  let n = 2;
  while (tiers.some((t) => t.id === id)) {
    id = `${baseId}-${n++}`;
  }

  const newTier: PricingTier = {
    id,
    name: body.name,
    price: body.price,
    priceNote: body.priceNote || "starting price",
    description: body.description || "",
    features: Array.isArray(body.features) ? body.features : [],
    highlighted: Boolean(body.highlighted),
  };

  await savePricingTiers([...tiers, newTier]);
  return NextResponse.json({ tier: newTier }, { status: 201 });
}
