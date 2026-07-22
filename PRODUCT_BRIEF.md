# Product Brief — Real Estate CRM (for website copy generation)

> **How to use this file:** paste it into Claude (or any LLM) and ask it to
> generate the marketing website — copy, page structure, hero sections, feature
> pages, etc. It contains everything about the product: what it is, who it's for,
> what it actually does, and — importantly — **what it does not do yet**, so the
> website never makes a claim the product can't back up.
>
> Everything below is grounded in the real codebase, not aspiration.
> Last verified: **21 July 2026**.

---

## 1. What the product is

A **CRM built specifically for Dubai / UAE real estate brokerages.**

Not a generic sales CRM with property fields bolted on — the domain model *is*
the UAE property market: RERA/Trakheesi permits, DLD title deeds, Makani
coordinates, Emirates ID, Ejari, AED with 5% VAT, bilingual English/Arabic
listings, and the portals brokers actually live on (Property Finder, Bayut,
Dubizzle).

**One-line description:**
> The CRM built for how Dubai brokerages actually work — from portal lead to
> Trakheesi-compliant listing to commission paid.

**Positioning angle:** generic CRMs (HubSpot, Zoho, Salesforce) force a UAE
brokerage to bend its process. This one already knows what a Trakheesi permit is,
why a listing can't go live without one, and how a lead gets rotated when an
agent sits on it.

---

## 2. Who it's for

| Persona | What they care about |
|---|---|
| **Brokerage owner / MD** | Pipeline visibility, agent performance, commission forecasting, compliance risk |
| **Sales / Branch manager** | Team workload, lead distribution fairness, SLA breaches, reassignment |
| **Team leader** | Their team's pipeline, coaching, follow-ups |
| **Sales agent** | My leads, my viewings, my tasks, my commission — fast, on the go |
| **Listings / Compliance officer** | Permits, expiries, portal publishing, document vault |
| **Marketing** | Campaign spend vs leads, source ROI, attribution, capture forms |
| **Finance** | Commission splits, VAT, invoicing, payouts |

**Market:** Dubai-first, UAE-wide (all seven emirates supported), with
multi-country scaffolding (a UAE/India split already exists in the data model).

---

## 3. The problems it solves (use these as website pain-point sections)

1. **Leads rot.** A portal lead lands, nobody calls, it goes cold. → Speed-to-lead
   SLA tracking, auto-rotation to the next agent, follow-up automation.
2. **Lead hoarding.** Agents sit on leads they'll never work. → Auto-drop timers
   release stale leads into a shared claim pool.
3. **Compliance risk.** Publishing without a valid Trakheesi permit. → Hard
   publish gate; a listing physically cannot go live or reach a portal without an
   active, unexpired permit. Auto-delist on expiry.
4. **No single source of truth.** Leads in WhatsApp, listings in spreadsheets,
   commissions in Excel. → One system, audited.
5. **Unfair / opaque distribution.** → Round-robin rotation, configurable
   assignment rules, honoring agent availability.
6. **Commission disputes.** → Structured splits, co-broke (internal + external),
   VAT, PENDING → INVOICED → PAID lifecycle.
7. **No accountability trail.** → Append-only audit log + activity timeline on
   every record.

---

## 4. Core differentiators (the "why this, not HubSpot" section)

- **UAE-native compliance:** RERA Forms A, A2, B, I, F, U; Trakheesi permit
  lifecycle; DLD title deed; Madmoun QR; Ejari; Emirates ID.
- **Publish gate:** compliance is *enforced*, not a reminder.
- **Lead lifecycle engine:** SLA → auto-drop → shared claim pool → claim expiry.
- **Fair distribution:** campaign rotation + round-robin + rule-based routing.
- **Bilingual by design:** EN/AR titles and descriptions on listings.
- **Money done right:** AED `Decimal(12,2)`, 5% VAT, configurable commission rules
  (2% sale / 5% rent defaults).
- **Configurable without code:** pipeline stages, lead sources, amenities,
  communities, roles, permissions, templates, assignment rules, commission rules.
- **Serious security posture:** MFA/TOTP, Argon2id, rotating refresh tokens with
  reuse detection, httpOnly cookies (never localStorage), granular RBAC.

---

## 5. Feature inventory (organised for feature pages)

### Leads
- Full lead lifecycle: **New → Contacted → Qualified → Viewing → Negotiating →
  Won / Lost**
- Dubai-relevant qualification: purpose (buy/rent), buyer type (end-user/
  investor), payment type (cash/mortgage), budget range, preferred property type/
  bedrooms/bathrooms, preferred communities, location + unit, emirate, timeline,
  language, marketing consent
- Lead scoring (0–100), visible to sales roles
- **Speed-to-lead SLA** with at-risk / breached tracking
- **Drop pool & claims:** stale leads auto-release to a shared queue; any agent
  can claim; claims expire if not acted on; managers can assign straight from the pool
- Assignment: manual, auto-route, rules engine, round-robin rotation
- **Bulk actions:** assign, change status, add to campaign, drop, delete
- Duplicate detection + merge
- Activity timeline (calls, emails, WhatsApp, notes, status changes, assignments)
- Property interests + auto-matched listings + saved searches with alerts
- CSV/Excel **import** with drag-and-drop, column auto-mapping, per-row results
- CSV **export**
- Soft delete + restore

### Properties & listings
- Full UAE listing model: reference no, EN/AR title + description, type
  (apartment/villa/townhouse/penthouse/plot/office/retail/warehouse), sale/rent,
  off-plan + project link, price, rent period, size/plot size, beds/baths,
  furnishing, community, tower, unit, floor, lat/long, Makani, DLD title deed
- **Trakheesi permit** block: permit no, issue/expiry, status, Madmoun QR,
  printable permit PDF
- **Publish gate** + publish/unpublish; **auto-delist** on permit expiry
- Status lifecycle: Draft / Live / Under offer / Sold / Rented / Withdrawn
- Media manager: photos, floorplans, videos — drag-and-drop upload, reorder,
  primary image, watermark flag
- Price history with reason + author
- Amenities & communities master data (create communities inline)
- **Projects** (off-plan): developer, handover date, payment plans, payment milestones

### Deals & pipeline
- Kanban pipeline with configurable stages (order, probability, per deal type)
- Deal record: property + lead, sale/rent, value, expected/actual close, lost reason
- Internal co-broke + external co-broker (name + BRN)
- **RERA forms** (A, A2, B, I, F, U) with status, reference, signed/expiry dates
- Auto-create tasks when a deal enters a stage (stage-task rules)

### Commissions & finance
- Per-deal commission records: side (listing/selling/referral), internal/external
  party, gross, split %, VAT, net
- Lifecycle: **Pending → Invoiced → Paid**
- Configurable commission rules (rate %, VAT %, sale vs rent)

### Campaigns & marketing
- Campaign CRUD: channel, source + sub-source, location/area, budget, spend,
  status, date range
- **Agent pool + auto-rotation** (round-robin with a configurable rotation timer);
  toggle off to route a campaign to a single agent
- Cross-campaign membership (a lead can belong to several campaigns)
- Campaign analytics: performance + reach metrics, real SQL-aggregated KPIs
- **Hosted lead-capture forms** with server-verified reCAPTCHA v3
- UTM attribution (source/medium/campaign, session, page, referrer, device)
- Duplicate-submission log

### Communication
- Communication log: WhatsApp / email / SMS / call, inbound/outbound, delivery status
- Message templates (per channel, multilingual, WhatsApp-approval flag) + render
- **Sequences** (drip/cadence): multi-step outreach, enroll/unenroll leads
- Automated follow-ups and lead-match alerts
- **Internal team chat** (1:1 and group, unread badges)

### Scheduling & productivity
- Appointments: viewing / meeting / call — with duration, location, reminder, notes
- Status actions: complete, cancel, no-show, plus viewing feedback capture
- Calendar view
- Tasks: priority, due date, assignee, lifecycle (start/complete/cancel/reopen),
  comments, overdue tracking, attach to any record
- Notes & tags (attachable to anything)

### Org, roles & access
- Office → Team → User hierarchy, with branch managers and team leaders
- Team membership management (assign users to teams with their roles)
- Roles with granular `resource:action` permissions (60+ keys), fully configurable
- **Read scoping:** managers see their branch/team; agents see their own
- **Contact-privacy guard:** team leads can't see phone/email on leads that aren't theirs
- Agent profiles: BRN + expiry, languages, availability, performance stats
- **BRN gate:** deal enforcement against broker licence validity

### Insights
- Dashboard KPIs, reports, lead-source ROI, per-agent and per-team performance
- Global + per-record activity feed
- Append-only audit log (actor, action, before/after, IP)

### Platform
- **Workflows** engine, notifications, document vault (NOC, title deed, passport,
  Emirates ID, tenancy), **Ejari** module, API keys for programmatic access,
  data import/export, integration credential vault (encrypted at rest), inbound
  webhooks with queue-based processing

---

## 6. Security & trust (good for a dedicated section)

- MFA / TOTP with encrypted secrets + single-use recovery codes
- Argon2id password hashing
- Short-lived JWT + **rotating** refresh tokens with reuse detection
- Tokens in **httpOnly cookies**, never localStorage (BFF proxy architecture)
- Role/status resolved per request — deactivate a user and it takes effect immediately
- Soft delete + restore across recoverable records
- Structured logging, health/readiness probes, consistent error shape
- Country/tenant scoping enforced at the database boundary

---

## 7. Tech stack (for a "built on" / developer section)

pnpm + Turborepo monorepo · **NestJS 11** API · **Next.js 15** (App Router) web ·
**Expo / React Native** mobile · **PostgreSQL 16** · **Redis 7** · **Prisma 6** ·
BullMQ queues · TanStack Query · Tailwind + shadcn/ui · Docker deploy

---

## 8. ⚠️ Honesty guardrails — do NOT claim these

The website must not advertise these as available today:

| Don't claim | Reality |
|---|---|
| "Sends emails / SMS / WhatsApp automatically" | Mailer/sender is a **logging stub** — the logging, templates and sequencing exist, but no real outbound send is wired |
| "Live sync with Property Finder / Bayut / Dubizzle" | Credential vault, webhooks, ingestion and the publish gate exist; **portal-specific adapters are early** |
| "Full mobile app" | Mobile is an **auth skeleton** (login + biometric unlock); feature screens aren't built |
| "AI lead scoring / smart matching" | Scoring is rule-based; **no AI/ML** yet |
| "E-signature" | Not implemented |
| "Live DLD/Trakheesi API sync" | Permit data is entered/managed in-app, not synced from a government API |
| "Mortgage / EMI calculators" | Not implemented |

**Safe framing for these:** put them under a *Roadmap* or *Coming soon* section.
That's honest and still sells the direction.

---

## 9. Suggested website structure

1. **Home** — hero, problem, differentiators, feature highlights, social proof
   placeholder, CTA
2. **Features** — one page or sub-pages per pillar: Leads · Listings &
   Compliance · Deals & Commissions · Campaigns · Team & Permissions · Insights
3. **Why UAE-native** — the compliance/Trakheesi/RERA/AED story (strongest page)
4. **Security** — the trust section from §6
5. **Roadmap** — the §8 items, framed as coming soon
6. **Pricing** — placeholder (not defined in the product yet)
7. **Request a demo** — primary CTA throughout
8. **About / Contact**

**Suggested hero CTAs:** "Book a demo" (primary), "See how it works" (secondary).

---

## 10. Tone & brand

- **Tone:** confident, specific, practical. Brokers respond to concrete detail
  ("a listing can't go live without an active Trakheesi permit"), not vague SaaS
  language ("synergise your workflow").
- **Use real vocabulary:** Trakheesi, RERA, DLD, Makani, Ejari, BRN, AED, off-plan,
  co-broke, speed-to-lead. It signals the product was built by people who know the market.
- **Avoid:** generic stock-photo SaaS clichés, invented statistics, fake testimonials,
  fake customer logos.
- **Visual direction:** the app itself uses a warm, premium palette (gold accents,
  serif headings, light + dark themes) — the site should feel like the same product.

---

## 11. Prompt starter for the LLM

> Using the product brief below, write the complete marketing website for this
> Dubai real-estate CRM: page structure, all copy, section-by-section, with hero
> headlines, subheads, feature descriptions in benefit language, and CTAs.
> Respect the "honesty guardrails" — never claim a feature listed there as
> available; put those under a Roadmap section. Use the real UAE vocabulary.
> Target audience: brokerage owners and sales managers in Dubai.
