# Dream Design CRM — marketing website

Static marketing site for DDCRM, a CRM built for Dubai / UAE real estate
brokerages. Next.js 15 (App Router) · TypeScript · Tailwind · Framer Motion ·
deploys to Vercel.

No CMS, no backend. The demo form is stubbed.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
pnpm lint
pnpm placeholders # regenerate the dummy images in public/images/
```

---

## Ground rules for anyone editing this site

### 1. Honesty guardrails

`PRODUCT_BRIEF.md` §8 lists things the product does **not** do yet. Copy on this
site must never imply any of them work today:

| Must not claim | Reality |
|---|---|
| Sends email / SMS / WhatsApp automatically | Sender is a logging stub |
| Live sync with Property Finder / Bayut / Dubizzle | Portal adapters are early |
| Full mobile app | Auth skeleton only |
| AI lead scoring / smart matching | Scoring is rule-based, no ML |
| E-signature | Not implemented |
| Live DLD / Trakheesi API sync | Permit data is managed in-app |
| Mortgage / EMI calculators | Not implemented |

These belong on `/roadmap` only, with a **Coming soon** pill
(`<Pill tone="comingSoon">`). If a sentence anywhere else implies one of them
works, that's a bug — fix the copy, not the label.

### 2. No fake social proof

No invented testimonials, no customer logos, no made-up statistics. Positioning
is "Built for Dubai brokerages", not "trusted by N brokerages".

Animated counters are allowed **only** for facts verifiable from the brief —
7 emirates, 60+ permission keys, 6 RERA forms. Never a business metric.

### 3. Design tokens

`tailwind.config.ts` is the only place colours, type sizes and spacing steps are
defined. No raw hex values and no arbitrary `text-[42px]` in components. If a
value is missing, add it to the config.

### 4. Motion

- Import `m.div`, never `motion.div`. The root layout uses `LazyMotion` with
  `strict`, so `motion.*` throws at runtime by design — it would pull the full
  bundle back in.
- Get variants from `useMotionSafe()`, never from `variants.ts` directly. That
  hook is what makes `prefers-reduced-motion` work; importing around it is how
  reduced-motion support silently breaks.
- Animate `transform` and `opacity` only.

---

## Structure

```
app/               routes (App Router)
components/
  layout/          Nav, MobileNav, Footer, Wordmark
  ui/              Container, Section, Button, Card, Pill, Eyebrow, SectionHeading
  motion/          MotionProvider, Reveal, StaggerGroup, useMotionSafe, variants
  mockups/         code-drawn product screenshots (Phase 2)
config/
  site.ts          every brand string, nav item and CTA label
  fonts.ts         next/font — Fraunces (display) + Inter (body)
lib/cn.ts          clsx + tailwind-merge
```

`Section` owns vertical rhythm and surface colour. Page files should not set
their own `py-*` or `bg-*` — that's what keeps the dark/light cadence consistent
across all six pages.

Renaming the product, changing the demo email or reordering the nav are all
single-line edits in `config/site.ts`. Swapping the display serif (e.g. to
Playfair Display) is a single-line edit in `config/fonts.ts`.

---

## Swapping the placeholder photography for real photos

**Everything in `public/images/` is a dummy image.** They are drawn in code by
`scripts/generate-placeholders.mjs` (run via `pnpm placeholders`) so that layout,
crop and colour read correctly before real photography exists. They are not
stock photos and carry no licence.

Every photo on the site is referenced through **`content/images.ts`**. To swap
one in:

1. Put your photo in `public/images/` using the **same filename** — e.g.
   `hero-skyline.jpg`.
2. Keep a **similar aspect ratio** to the placeholder (the registry lists the
   dimensions). A very different ratio will crop unexpectedly.
3. Update the `alt` text in `content/images.ts` to describe the real photo.

That's it — no component changes. `ScrollImage`, `PageHero`, `DemoCta` and the
hero all read from the registry.

| File | Used on | Ratio |
|---|---|---|
| `hero-skyline.jpg` | Homepage hero, default page-hero backdrop | 16:9 |
| `property-marina.jpg` | Homepage showcase, Features hero | 4:5 |
| `property-offplan.jpg` | Homepage showcase, Roadmap hero | 4:5 |
| `property-villa.jpg` | Homepage showcase | 4:5 |
| `interior-lobby.jpg` | Why-UAE plate, Contact backdrop | 4:5 |
| `team-office.jpg` | Homepage pain points | 3:2 |
| `compliance-permit.jpg` | Why-UAE hero + permit lifecycle | 4:3 |
| `security-abstract.jpg` | Homepage security teaser, Security hero | 3:2 |
| `cta-panorama.jpg` | Closing CTA band on every page | 12:5 |

Once real photos are in, you can delete `scripts/generate-placeholders.mjs`, the
`placeholders` script and the `sharp` devDependency.

**Photo direction:** warm, low-key, gold-hour or night. Architecture and
interiors rather than posed stock "business people". Avoid anything that implies
a customer or a claim the product can't back up — no branded signage of real
brokerages, no fabricated dashboards on screens in shot.

Images animate through `components/ui/ScrollImage.tsx`, which owns the reveal,
the parallax drift and the frame. Prefer it over a bare `<Image>` so every photo
behaves the same way.

---

## Swapping mock dashboards for real screenshots

> Applies from Phase 2, when `components/mockups/` is populated.

The product visuals are **drawn in code** (Tailwind + SVG), not stock imagery —
they stay crisp at any size, cost no image payload, theme with the palette, and
can animate. Each is designed to be replaced by a real screenshot later with a
one-line change.

Every mockup follows the same shape:

```
components/mockups/
  BrowserFrame.tsx      shared chrome — title bar, dots, fake URL, shadow
  LeadsPipeline.tsx     kanban / speed-to-lead view
  ListingCard.tsx       listing with the Trakheesi permit badge
  CommissionSummary.tsx splits, co-broke, VAT, Pending → Invoiced → Paid
```

Each mockup renders its content **inside** `<BrowserFrame>` and accepts the same
props:

```tsx
<BrowserFrame url="app.ddcrm.com/leads" className="...">
  {/* drawn content */}
</BrowserFrame>
```

**To swap one for a real screenshot:**

1. Drop the image in `public/screenshots/` (2x the display size, ideally WebP).
2. Open the mockup file — e.g. `LeadsPipeline.tsx`.
3. Replace everything *inside* `<BrowserFrame>` with a single `<Image>`:

   ```tsx
   import Image from "next/image";

   export function LeadsPipeline({ className }: MockupProps) {
     return (
       <BrowserFrame url="app.ddcrm.com/leads" className={className}>
         <Image
           src="/screenshots/leads-pipeline.png"
           alt="Leads pipeline showing speed-to-lead SLA status per lead"
           width={1600}
           height={1000}
           className="w-full h-auto"
           sizes="(max-width: 1024px) 100vw, 640px"
         />
       </BrowserFrame>
     );
   }
   ```

Nothing outside the file changes: the frame, shadow, aspect ratio, responsive
sizing and scroll animation all live in `BrowserFrame` and the call sites, so
every page that uses the mockup keeps working. Keep the component name, the
`className` prop and the `BrowserFrame` wrapper and the swap is genuinely a
one-file edit.

Two notes:

- Keep the **aspect ratio** close to the drawn version, or surrounding sections
  will reflow. `BrowserFrame` sets a min-height for this reason.
- Write a real `alt` describing what the screen shows, not "screenshot of
  dashboard".

`sharp` is already an approved build dependency (see `pnpm-workspace.yaml`), so
`next/image` optimisation works out of the box.
