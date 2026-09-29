import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getStories, saveStories, slugify } from "@/lib/content";
import type { Story } from "@/data/stories";

export async function GET() {
  const stories = await getStories();
  return NextResponse.json({ stories });
}

export async function POST(req: NextRequest) {
  let body: Partial<Story>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.clientNames || !body.eventType) {
    return NextResponse.json({ error: "clientNames and eventType are required." }, { status: 400 });
  }

  const stories = await getStories();
  const baseSlug = slugify(body.clientNames);
  let slug = baseSlug;
  let n = 2;
  while (stories.some((s) => s.slug === slug)) {
    slug = `${baseSlug}-${n++}`;
  }

  const newStory: Story = {
    slug,
    clientNames: body.clientNames,
    eventType: body.eventType,
    location: body.location || "",
    year: body.year || new Date().getFullYear(),
    coverImage: body.coverImage || "",
    excerpt: body.excerpt || "",
    sections: body.sections || [],
  };

  const next = [newStory, ...stories];
  await saveStories(next);
  revalidateStoryPages();
  return NextResponse.json({ story: newStory }, { status: 201 });
}

function revalidateStoryPages() {
  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath("/stories/[slug]", "page");
}
