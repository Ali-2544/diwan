# Handoff: Diwan — Real-Estate CRM Marketing Site

## Overview
A single-page marketing website for **Diwan**, a UAE-native real-estate brokerage CRM
(leads, listings, Trakheesi-compliant publishing, co-broke commissions, permissions, insights).
Light-mode, editorial-premium aesthetic: navy + white + gold, high-contrast serif display type,
scroll-reveal and parallax animation throughout. It is a lead-gen page whose primary CTA is
**"Book a demo."**

## About the Design Files
The file in this bundle (`Diwan Marketing Site.dc.html`) is a **design reference created in HTML** —
a working prototype that shows the intended look, copy, layout, and animation behavior. It is
**not production code to copy verbatim.** The `.dc.html` format is a proprietary streaming-component
format; treat it as a visual + behavioral spec, not a source file to import.

Your task: **recreate this design in a real codebase.** If you're starting fresh, use **Next.js
(App Router) + React + TypeScript + Tailwind CSS**, with **Framer Motion** for the scroll animations
— that stack maps cleanly onto everything here. If a codebase already exists, follow its established
framework, component library, and conventions instead, and reproduce the visuals with those tools.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows, copy, and interactions are all
final. Reproduce pixel-for-pixel. Exact values are in **Design Tokens** below.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| navy | `#0E2A47` | primary dark, dark sections, headings-on-light rare |
| navy-2 | `#173A5E` | gradient partner for navy |
| navy-deep | `#08192B` | footer background |
| ink | `#132639` | body headings / primary text |
| slate | `#56697E` | body copy |
| muted | `#8492A3` | captions, meta, eyebrow-muted |
| line | `#E8EDF3` | borders / hairlines |
| tint | `#F4F7FB` | cool off-white alternating section bg |
| cream | `#FBF7EF` | warm off-white section bg (listing model) |
| gold | `#B7822A` | primary accent (eyebrows, arrows, key numbers) |
| gold-2 | `#DDB05A` | lighter gold, gradient top-stop, dark-section accent |
| gold-soft | `#F5EAD2` | gold tint fills, permit card border |
| gold-text-on-white | `#9A6B14` | default link color (hover `#7A520C`) |
| green | `#1E8A63` | success (PAID, live, fast SLA); bg `#E7F4EE` |
| amber-chip | `#B07A16` on `#FCF1DE` | warning (INVOICED, mid SLA) |
| danger | `#C24A2E` on `#FBEAE4` | breach / blocked / over-SLA |

Gold headline highlight = text gradient `linear-gradient(100deg,#9A6410,#D8A24C)` (italic).
Gold button = `linear-gradient(180deg,#DDB05A,#B7822A)`, text color `#3a2a06`.

### Typography
- **Display / headings:** `Newsreader` (Google Fonts), weights 400–700, optical sizing on.
  Weight 600 for all headings. Used at 40–66px for section titles, up to 54–66px hero/CTA.
  Highlighted hero words are *italic* with the gold gradient.
- **Body / UI:** `Hanken Grotesk` (Google Fonts), weights 400–800.
  Body 15–19px / line-height ~1.6; eyebrows 12px 700, letter-spacing `.24em`, uppercase, gold.
- Numbers in mockups/stats use Newsreader for an editorial feel.

Google Fonts import:
`Newsreader:opsz,wght@6..72,400..700` + `Hanken Grotesk:wght@400;500;600;700;800`.

### Spacing / shape
- Content max-width **1200px** (narrower blocks 680–760px for text, 1000–1120px for showcases).
- Section vertical padding **~104px** (hero 88px top; CTA 120px), horizontal **32px** gutters.
- Card radius **16–22px**; buttons **11–13px**; pills/chips **7–999px**.
- Card border `1px solid var(--line)`.

### Shadows
- Card: `0 24px 44px -34px rgba(14,42,71,.3)`
- Floating product card: `0 40px 80px -44px rgba(14,42,71,.45)`
- Big dashboard showcase: `0 60px 120px -50px rgba(14,42,71,.5)`
- Gold button: `0 10px 24px -12px rgba(183,130,42,.75)`

---

## Screens / Views
Single scrolling page. Section order top → bottom:

1. **Sticky nav** — translucent white, `backdrop-filter: blur(14px)`. Left: gold-on-navy "D"
   monogram (38px, radius 11) + "Diwan" (Newsreader 22). Right (single row, no wrap): text links
   *Features · Why UAE-native · Security · Roadmap* (slate → ink on hover) + gold gradient
   **Book a demo** button. On scroll past 16px: raise bg opacity to `.85` and add a soft shadow.

2. **Hero** — 2-col grid (1.05fr / 0.95fr), 56px gap.
   - Left: gold eyebrow "BUILT FOR DUBAI BROKERAGES"; H1 66px "From portal lead to
     *Trakheesi-compliant* (gold italic) listing to commission paid."; 19px subcopy; two CTAs
     (gold primary "Book a demo", white outline "See how it works →"); 4 trust pills
     (Trakheesi permit gate · RERA Forms A–U · AED with 5% VAT · Bilingual EN/AR).
   - Right: floating browser-framed **listing card** (image slot header, LIVE badge, title +
     Arabic subtitle, meta row, AED 2,450,000, gold Trakheesi permit box + QR, Published button).
     Gentle infinite float. Two soft radial gold/navy background blobs, slow drift.

3. **Portal marquee** — tint band. Caption "Speaks the systems your agents already live on";
   horizontally scrolling Newsreader row: Property Finder · Bayut · Dubizzle · Dubai Land
   Department · Trakheesi · Ejari · Makani (duplicated for seamless loop, edge mask fade).

4. **Domain-model statement + stats** — H2 "Not a generic CRM with property fields bolted on.",
   subcopy, then a 4-col stat row (top border): **7** Emirates supported · **60+** Permission keys ·
   **6** RERA form types · **2** Listing languages. Numbers count up when scrolled into view.

5. **Dashboard showcase** ("See it in action" / "Your entire business in one dashboard") — centered.
   Large browser-framed **dashboard screenshot** (600px tall image slot) that reveals with a
   **scale(1.06)+blur(16px) → focus** effect and drifts with slight parallax. Below: 3-col row of
   smaller screenshot tiles (240px) revealing with 0/120/240ms stagger.

6. **Problems** — tint band. H2 "Small, repeated leaks…"; 2×2 white cards, each: title,
   problem line (slate), gold "→" solution line above a hairline. Cards lift on hover.
   (Leads rot overnight / Compliance risk / No single source of truth / Commission disputes.)

7. **Compliance (interactive)** — 2-col. Left: H2 "A listing cannot go live without an active
   Trakheesi permit.", 3 bullet points. Right: **Try it** toggle *[Permit active] [No permit]* over
   a listing card. Toggling **No permit** flips: badge LIVE(green)→BLOCKED(red), permit line →
   "No active permit on this listing", publish button gold "Published" → gray "Publish blocked".

8. **One listing model** — cream band. H2 "Ready, off-plan and villa stock in the same system";
   3 image-topped cards (Ready residential / Off-plan / Villas & townhouses), hover lift.

9. **Six pillars** (`#features`) — H2 "Six pillars, one system"; 3×2 grid of tint cards:
   Leads / Listings & compliance / Deals & commissions / Campaigns / Team & permissions / Insights.
   Each: title, one-line description, 3 bullet features. Hover lift + border darken.

10. **Lead lifecycle** — tint band. H2 "A lead that nobody works doesn't just sit there";
    5-step dotted timeline (SLA clock → At risk → Auto-drop → Claim pool → Claim expiry); below,
    a **leads table mockup** (browser frame, NEW/CONTACTED/QUALIFIED/VIEWING stat tiles, 5 rows
    with color-coded speed-to-lead chips: green 4m/11m, amber 26m, red 1h 12m, gold "Claimable").

11. **Commissions** — 2-col. Left: **commission breakdown card** (sale AED 4.9M, commission @2%,
    listing side PAID, selling side INVOICED, VAT @5%, gold total). Right: H2 "The part people
    actually argue about" + 3 hairline-separated points.

12. **Security** (`#security`) — **navy dark section** (the one big dark moment), gold-2 accents.
    H2 "Your client list is the business. It's treated that way." + 2×2 translucent cards
    (2FA / password hashing / session security / token safety).

13. **Roadmap** (`#roadmap`) — tint band. H2 "The honest version"; 4 hairline rows each with a
    gold "COMING SOON" pill (Outbound sending / Live portal sync / Full mobile app / AI lead scoring).

14. **CTA** (`#demo`) — navy gradient band, centered. H2 54px "See it against your own pipeline",
    subcopy, gold "Book a demo" + outline "Browse the features →", fine print. Radial gold glow.

15. **Footer** — deepest navy `#08192B`. Brand + blurb + "Pricing on request"; 3 link columns
    (Product / Capabilities / Company); bottom bar © 2026 Diwan CRM + hello@diwan.ae.

---

## Interactions & Behavior
- **Scroll reveal:** elements fade + move in when 12% visible (once). Variants: `up` (translateY 30px),
  `scale` (0.96), `left`/`right` (±28px translateX), `img` (scale 1.06 + blur 16px → focus).
  Transition `cubic-bezier(.16,.8,.24,1)`, ~0.7–1s, optional per-element delay for staggering.
- **Parallax:** showcase drifts vertically at ~0.05× scroll offset via `translate3d`, rAF-throttled.
- **Counters:** stat numbers animate 0 → target (cubic ease-out, ~1.2s) on first view; keep the
  final value as static text for no-JS / reduced-motion fallback.
- **Permit toggle:** local component state `'active' | 'none'` drives badge/permit-line/publish styling.
- **Nav scroll state:** background opacity + shadow increase after 16px scroll.
- **Hover:** cards `translateY(-4px)` + shadow/border; buttons `translateY(-2px)` + shadow.
- **Marquee:** infinite CSS `translateX(0 → -50%)` loop over duplicated content, ~28s linear.
- **Reduced motion:** honor `prefers-reduced-motion` — skip reveal/parallax/counter animation,
  render everything in final visible state.
- **Anchors:** nav + footer links smooth-scroll to `#features #compliance #security #roadmap #demo #top`.
- **Responsive:** collapse 2/3-col grids to 1 col and reduce hero/CTA type on tablet/mobile;
  nav becomes a hamburger under ~900px (not in this prototype — add it).

## State Management
Minimal, all local component state — no data fetching:
- `permit: 'active' | 'none'` (compliance demo toggle)
- transient animation flags handled by IntersectionObserver, not stored
- (production) demo-request form: standard controlled inputs + submit to your CRM/email endpoint.

## Assets
- **Fonts:** Newsreader + Hanken Grotesk (Google Fonts) — swap for self-hosted if your app requires.
- **Product imagery:** every screenshot/photo in the prototype is a **drop-in placeholder**
  (`<image-slot>`). Replace with real product screenshots and Dubai property photos. Slots:
  hero listing photo, compliance listing photo, 3 listing-model photos, 1 large dashboard screenshot,
  3 smaller dashboard screenshots.
- **Icons:** minimal (shield emoji in permit box, arrow glyphs). Use your icon library (Lucide etc.).
- No third-party brand logos are bundled; portal names are set as text.

## Files
- `Diwan Marketing Site.dc.html` — the full design reference (all sections, copy, styling, animation).
- `image-slot.js` — helper used only by the prototype's placeholder images; **not needed** in your
  build — use your own `<img>`/`next/image` components.
