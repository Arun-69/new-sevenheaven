import { NextRequest, NextResponse } from "next/server";
import { getTeam, saveTeam, slugify } from "@/lib/content";
import type { TeamMember } from "@/data/team";

export async function GET() {
  return NextResponse.json({ team: await getTeam() });
}

export async function POST(req: NextRequest) {
  let body: Partial<TeamMember>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body.name || !body.role) {
    return NextResponse.json({ error: "name and role are required." }, { status: 400 });
  }

  const team = await getTeam();
  const baseId = slugify(body.name);
  let id = baseId;
  let n = 2;
  while (team.some((m) => m.id === id)) id = `${baseId}-${n++}`;

  const member: TeamMember = {
    id,
    name: body.name,
    role: body.role,
    bio: body.bio || "",
    image: body.image || "",
  };
  await saveTeam([...team, member]);
  return NextResponse.json({ member }, { status: 201 });
}
