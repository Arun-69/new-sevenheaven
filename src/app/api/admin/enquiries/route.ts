import { NextResponse } from "next/server";
import { getEnquiries } from "@/lib/enquiries";

// Protected by middleware.ts (matches /api/admin/:path*).
export async function GET() {
  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}
