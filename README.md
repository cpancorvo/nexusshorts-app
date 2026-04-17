# NexusShorts.studio

The marketing site and dashboard front-end for NexusShorts — an AI-powered faceless reels platform.

This is a production-ready Next.js 15 + Tailwind project. It is the **front-end only**. The actual video generation pipeline (Remotion templates, render workers) and the social platform integrations live separately — see the companion files `04-remotion-template.tsx` and `05-render-worker.ts`.

## What's here

```
app/
  layout.tsx            — Root layout, fonts, metadata
  page.tsx              — Landing page
  globals.css           — Design tokens, grain texture, animations
  pricing/page.tsx      — Pricing tiers
  privacy/page.tsx      — Privacy policy wrapper
  terms/page.tsx        — Terms of service wrapper
  dashboard/page.tsx    — /dashboard/series — main app view
components/
  Nav.tsx               — Sticky top navigation
  Footer.tsx            — Site footer
```

## Design system

- **Aesthetic:** editorial / cinematic. Off-black `#0c0c0a` background, warm bone `#f4f1ea` text, single sharp accent in acid lime `#d4ff3a`.
- **Type:** Fraunces (display serif) + Inter Tight (body) + JetBrains Mono (labels). Loaded from Google Fonts.
- **Texture:** subtle SVG grain overlay on every page via `body::before`.
- **Layout:** 12-column grid, intentional asymmetry, generous negative space, marker-style chapter labels.
- **Motion:** rise-on-load animations, hover lifts on cards, marquee on the trust band, pulse on live indicators.

All design tokens are in `tailwind.config.js`. Change them once, they propagate everywhere.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then in the Vercel dashboard, connect the custom domain `nexusshorts.studio` (and `www.nexusshorts.studio` as a redirect). HTTPS is automatic.

## What to do next

1. **Replace the placeholder legal text** in `app/privacy/page.tsx` and `app/terms/page.tsx` with the full content from the companion markdown templates, after a lawyer reviews them.
2. **Wire up authentication** — Clerk or Better Auth. Protect the `/dashboard` route.
3. **Wire up Stripe** — three products matching the pricing page (Starter $19, Creator $39, Agency $69).
4. **Build the "Create new series" wizard** — multi-step form: niche → voice → schedule → connected platforms.
5. **Connect the dashboard data** — replace the hardcoded `series` array in `app/dashboard/page.tsx` with a database query.
6. **Connect the render pipeline** — wire the "+ New series" button to the queue worker (`05-render-worker.ts`).

## Notes on the design choices

This deliberately avoids the standard "AI SaaS" look (purple gradients, generic Inter everywhere, cards on gradient meshes). The serif headlines and acid-lime accent are doing a lot of work to differentiate from the dozens of competitors that all look identical. If you change the accent color, change it once in `tailwind.config.js` and it propagates.

The dashboard uses the same visual language as the marketing site — same fonts, same colors, same grain texture — so the moment a user signs up, they don't feel like they've entered a different product.
