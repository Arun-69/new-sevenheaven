# STUDIO NAME — Event Media & Creative Studio Website

A premium, cinematic Next.js website for a full-service event media & creative studio: photography, films, graphic design, albums, and complete event delivery — one studio, everything your event needs.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Changing the Brand Name & Contact Details

Everything is driven from **one file**:

```
src/config/site.ts
```

Update `name`, `phone`, `whatsapp`, `email`, `location`, and social links there — nothing else in the codebase hard-codes these values.

## Content / Data

All portfolio, service, and content data lives in `src/data/*.ts`, ready to be swapped for a real API later:

- `services.ts` — the 4 service categories (Capture / Create / Preserve / Deliver) and every individual service
- `stories.ts` — event stories (portfolio) with structured sections (Invitation → Arrival → Ceremony → People → Party → Memories)
- `testimonials.ts`
- `packages.ts` — options used in the `/packages` builder
- `team.ts` — About page team members
- `films.ts` — the `/films` gallery
- `galleries.ts` — mock client gallery data for `/gallery/[slug]`

Replace the Unsplash placeholder URLs with real studio photography before launch, and replace the placeholder statistics on the homepage with real numbers.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — all major sections |
| `/stories` | Story/portfolio listing |
| `/stories/[slug]` | Individual event story |
| `/services` | Full service listing by category |
| `/films` | Film gallery with category filter + video modal |
| `/creative` | Graphic design showcase + before/after slider |
| `/about` | Studio story + team |
| `/contact` | Contact form + WhatsApp/call CTAs |
| `/packages` | Interactive 3-step package builder |
| `/gallery/[slug]` | Mock password-protected client gallery |
| `/admin` | Admin dashboard demo (separate practical UI) |
| `/admin/*` | Admin sub-sections (events, clients, portfolio, galleries, services, packages, enquiries, testimonials, team, settings) — placeholder screens, ready to wire to a real backend |

## Deploying to Vercel (image uploads / admin edits)

The admin panel (photo uploads, story/service/pricing/team edits) writes to
the filesystem, which works out of the box on a normal Node server or VPS
(`npm run build && npm run start`). **Vercel's filesystem is read-only at
runtime**, so on Vercel you must connect a **Vercel Blob** store — the app
detects it automatically and switches storage, no code changes needed:

1. In the Vercel dashboard, open your project → **Storage** tab → **Create
   Database** → **Blob**.
2. Connect it to this project. Vercel automatically adds a
   `BLOB_READ_WRITE_TOKEN` environment variable to the project.
3. Redeploy (or it will redeploy automatically). Once that env var is
   present, photo uploads and all admin content edits are saved to Blob
   storage instead of disk, and persist across deploys.

Without a connected Blob store, admin uploads/edits on Vercel will fail with
a "filesystem is read-only" error — they still work locally with `npm run
dev` either way, since that always uses the local disk.

## Backend Integration (Future)

The data layer in `src/data/` is written so it can be swapped for real API calls (e.g. `fetch('/api/stories')`) with minimal changes to components. The intended architecture:

```
Frontend → REST API → Backend → PostgreSQL → Cloud Storage
```

The contact form (`/contact`) and package builder (`/packages`) currently simulate submission client-side — replace the `handleSubmit` functions with real POST requests to your API once it exists.

## Notes

- WhatsApp number, phone, and email are all configurable in `src/config/site.ts` — no number is hard-coded elsewhere.
- All images currently use Unsplash placeholder URLs. Swap in real photography before launch (see `next.config.js` `images.remotePatterns` if you host images elsewhere).
- `/admin` is excluded from the sitemap and disallowed in `robots.ts`.
- This build was verified with `tsc --noEmit` (zero type errors) and a full `next build` (all 32 routes compiled and prerendered successfully).
