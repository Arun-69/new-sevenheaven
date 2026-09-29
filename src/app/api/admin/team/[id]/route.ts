import { NextRequest, NextResponse } from "next/server";
import { getTeam, saveTeam } from "@/lib/content";
import type { TeamMember } from "@/data/team";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Partial<TeamMember>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const team = await getTeam();
  const idx = team.findIndex((m) => m.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });
  team[idx] = { ...team[idx], ...body, id: team[idx].id };
  await saveTeam(team);
  return NextResponse.json({ member: team[idx] });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const team = await getTeam();
  const next = team.filter((m) => m.id !== params.id);
  if (next.length === team.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  await saveTeam(next);
  return NextResponse.json({ ok: true });
}
