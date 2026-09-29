import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getStories, saveStories } from "@/lib/content";
import type { Story } from "@/data/stories";

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  let body: Partial<Story>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const stories = await getStories();
  const idx = stories.findIndex((s) => s.slug === params.slug);
  if (idx === -1) return NextResponse.json({ error: "Not found." }, { status: 404 });

  stories[idx] = { ...stories[idx], ...body, slug: stories[idx].slug };
  await saveStories(stories);
  revalidateStoryPages();
  return NextResponse.json({ story: stories[idx] });
}

export async function DELETE(_req: NextRequest, { params }: { params: { slug: string } }) {
  const stories = await getStories();
  const next = stories.filter((s) => s.slug !== params.slug);
  if (next.length === stories.length) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  await saveStories(next);
  revalidateStoryPages();
  return NextResponse.json({ ok: true });
}

function revalidateStoryPages() {
  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/stories/[slug]", "page");
}
