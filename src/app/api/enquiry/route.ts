import { NextRequest, NextResponse } from "next/server";
import { addEnquiry } from "@/lib/enquiries";
import { sendEnquiryEmail } from "@/lib/email";

// Public endpoint — the contact form and the packages "custom quote" form
// both POST here. Not under /api/admin, so middleware.ts does not require
// a login for this one.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const enquiry = await addEnquiry({
    name,
    email,
    phone: typeof body.phone === "string" ? body.phone : undefined,
    eventType: typeof body.eventType === "string" ? body.eventType : undefined,
    eventDate: typeof body.eventDate === "string" ? body.eventDate : undefined,
    packageId: typeof body.packageId === "string" ? body.packageId : undefined,
    message: typeof body.message === "string" ? body.message : undefined,
    source: typeof body.source === "string" ? body.source : "website",
  });

  const emailResult = await sendEnquiryEmail(enquiry);

  return NextResponse.json({ ok: true, emailSent: emailResult.sent });
}
