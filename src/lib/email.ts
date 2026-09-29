import { siteConfig } from "@/config/site";
import type { Enquiry } from "@/lib/enquiries";

// Sends the studio a notification email whenever a new enquiry comes in.
// Uses Resend's plain HTTP API via fetch — no extra npm package needed, so
// this works even where `npm install` isn't available.
//
// SETUP (see .env.local.example):
//   1. Create a free account at https://resend.com
//   2. Verify a sending domain (or use their onboarding@resend.dev sandbox
//      address for testing — it only delivers to the email you signed up
//      with, which is fine for a single-studio-owner inbox).
//   3. Copy your API key into RESEND_API_KEY in .env.local
//   4. Optionally set EMAIL_FROM once you've verified your own domain.
//
// Without RESEND_API_KEY set, this silently skips sending and only logs a
// warning — the enquiry is still saved and still shows up in /admin/enquiries.

export async function sendEnquiryEmail(enquiry: Enquiry): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY is not set — skipping email notification. The enquiry was still saved and is visible in /admin/enquiries. See .env.local.example."
    );
    return { sent: false, error: "not_configured" };
  }

  const from = process.env.EMAIL_FROM || "Seven Heaven Website <onboarding@resend.dev>";

  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #222;">
      <h2 style="margin-bottom: 4px;">New enquiry — ${escapeHtml(enquiry.name)}</h2>
      <p style="color: #777; margin-top: 0;">via ${escapeHtml(enquiry.source)} on ${siteConfig.name}</p>
      <table style="border-collapse: collapse; margin-top: 16px;">
        <tbody>
          ${row("Name", enquiry.name)}
          ${row("Email", enquiry.email)}
          ${enquiry.phone ? row("Phone", enquiry.phone) : ""}
          ${enquiry.eventType ? row("Event Type", enquiry.eventType) : ""}
          ${enquiry.eventDate ? row("Event Date", enquiry.eventDate) : ""}
          ${enquiry.packageId ? row("Package", enquiry.packageId) : ""}
        </tbody>
      </table>
      ${enquiry.message ? `<p style="margin-top:16px;"><strong>Message:</strong><br/>${escapeHtml(enquiry.message)}</p>` : ""}
      <p style="margin-top: 24px; color: #999; font-size: 12px;">Reply directly to this email to reach ${escapeHtml(enquiry.name)}.</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.email],
        reply_to: enquiry.email,
        subject: `New enquiry from ${enquiry.name} — ${siteConfig.name}`,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[email] Resend API error:", res.status, text);
      return { sent: false, error: `resend_${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send enquiry email:", err);
    return { sent: false, error: "network_error" };
  }
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 12px 4px 0; color:#777;">${escapeHtml(label)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
