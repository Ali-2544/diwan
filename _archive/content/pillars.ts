/**
 * Brief §9 — the six feature pillars. Shared by the homepage grid and the
 * /features page, so anchor ids stay in sync automatically.
 *
 * `bullets` must describe shipped behaviour only. Anything from §8 belongs in
 * content/roadmap.ts, never here.
 */

export type Pillar = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  /** Longer copy, used only on /features. */
  body: string;
  detail: string[];
};

export const PILLARS: Pillar[] = [
  {
    id: "leads",
    title: "Leads",
    summary:
      "Capture, qualify and route every enquiry — with a clock on how fast it gets worked.",
    bullets: [
      "Speed-to-lead SLA with at-risk and breached tracking",
      "Auto-drop to a shared claim pool",
      "Round-robin, rules-based and manual assignment",
    ],
    body:
      "A lead moves New → Contacted → Qualified → Viewing → Negotiating → Won or Lost, and at every step the system knows how long it has been sitting there. Qualification captures what actually matters in Dubai: purpose, buyer type, cash or mortgage, budget, preferred communities, emirate, timeline and language.",
    detail: [
      "Full lifecycle: New → Contacted → Qualified → Viewing → Negotiating → Won / Lost",
      "UAE qualification fields: purpose, buyer type (end-user / investor), payment type, budget, property type, beds and baths, preferred communities, emirate, timeline, language, marketing consent",
      "Rule-based lead scoring from 0–100, visible to sales roles",
      "Speed-to-lead SLA tracking with at-risk and breached states",
      "Drop pool and claims: stale leads auto-release, any agent can claim, claims expire, managers can assign straight from the pool",
      "Assignment: manual, auto-route, rules engine, round-robin rotation",
      "Bulk actions: assign, change status, add to campaign, drop, delete",
      "Duplicate detection and merge",
      "Activity timeline across calls, notes, status changes and assignments",
      "Property interests, auto-matched listings and saved searches",
      "CSV / Excel import with drag-and-drop and column auto-mapping, plus CSV export",
      "Soft delete and restore",
    ],
  },
  {
    id: "listings",
    title: "Listings & compliance",
    summary:
      "A UAE listing record with the Trakheesi permit built into it — and a publish gate that enforces it.",
    bullets: [
      "Hard publish gate on an active Trakheesi permit",
      "Auto-delist when a permit expires",
      "Bilingual EN/AR titles and descriptions",
    ],
    body:
      "The permit is not a custom field somebody remembered to add. It is part of the listing record, and it controls whether that listing can go live at all. When a permit expires, the listing comes down — nobody has to notice.",
    detail: [
      "Full UAE listing model: reference number, EN/AR title and description, property type, sale or rent, off-plan with project link, price, rent period, size and plot size, beds and baths, furnishing, community, tower, unit, floor",
      "Location detail: latitude/longitude, Makani number, DLD title deed",
      "Trakheesi permit block: permit number, issue and expiry dates, status, Madmoun QR, printable permit PDF",
      "Publish gate, publish / unpublish, and automatic delisting on permit expiry",
      "Status lifecycle: Draft, Live, Under offer, Sold, Rented, Withdrawn",
      "Media manager: photos, floorplans and videos with drag-and-drop upload, reordering, primary image and watermark flag",
      "Price history with reason and author",
      "Amenities and communities master data, with communities creatable inline",
      "Off-plan projects: developer, handover date, payment plans and milestones",
    ],
  },
  {
    id: "deals",
    title: "Deals & commissions",
    summary:
      "Pipeline, RERA paperwork and the money — including co-broke and VAT — in one record.",
    bullets: [
      "Configurable kanban stages with probability",
      "Internal and external co-broke with BRN",
      "Pending → Invoiced → Paid, with 5% VAT",
    ],
    body:
      "Commission is structured data, not a column in a spreadsheet. Each side of a deal — listing, selling, referral — carries its own party, gross, split percentage, VAT and net, so a co-broke settlement is a record rather than an argument.",
    detail: [
      "Kanban pipeline with configurable stages: order, probability, per deal type",
      "Deal record links property and lead, with sale or rent, value, expected and actual close dates, and lost reason",
      "Internal co-broke plus external co-broker captured with name and BRN",
      "RERA forms A, A2, B, I, F and U with status, reference, signed and expiry dates",
      "Stage-task rules that auto-create tasks when a deal enters a stage",
      "Per-deal commission records: side, internal or external party, gross, split percentage, VAT, net",
      "Commission lifecycle: Pending → Invoiced → Paid",
      "Configurable commission rules with defaults of 2% on sale and 5% on rent",
      "AED stored at Decimal(12,2) — no floating-point rounding drift",
    ],
  },
  {
    id: "campaigns",
    title: "Campaigns",
    summary:
      "Track spend against real leads, and rotate incoming enquiries fairly across an agent pool.",
    bullets: [
      "Agent pool with round-robin rotation timer",
      "Hosted capture forms with reCAPTCHA v3",
      "UTM attribution and SQL-aggregated KPIs",
    ],
    body:
      "Campaign performance is computed from the actual lead records, not typed into a summary field. Attribution follows the enquiry from the UTM parameters on the landing page through to the deal it becomes.",
    detail: [
      "Campaign records: channel, source and sub-source, location or area, budget, spend, status, date range",
      "Agent pool with configurable round-robin rotation timer, or route a whole campaign to a single agent",
      "Cross-campaign membership — a lead can belong to several campaigns",
      "Campaign analytics: performance and reach KPIs aggregated in SQL from live records",
      "Hosted lead-capture forms with server-verified reCAPTCHA v3",
      "UTM attribution: source, medium, campaign, session, page, referrer and device",
      "Duplicate-submission log",
    ],
  },
  {
    id: "team",
    title: "Team & permissions",
    summary:
      "Office → team → agent hierarchy, with permissions granular enough to hide a phone number.",
    bullets: [
      "60+ resource:action permission keys, fully configurable",
      "Read scoping by branch and team",
      "Contact-privacy guard and BRN gate",
    ],
    body:
      "Managers see their branch or team; agents see their own. A team lead cannot read the phone or email on a lead that is not theirs — privacy is enforced at the field level, not left to good manners.",
    detail: [
      "Office → Team → User hierarchy with branch managers and team leaders",
      "Team membership management, assigning users to teams with their roles",
      "Roles built from granular resource:action permissions — over 60 keys, fully configurable",
      "Read scoping: managers see their branch or team, agents see their own records",
      "Contact-privacy guard: team leads cannot see phone or email on leads that are not theirs",
      "Agent profiles with BRN and expiry, languages, availability and performance stats",
      "BRN gate enforcing deal actions against broker licence validity",
    ],
  },
  {
    id: "insights",
    title: "Insights",
    summary:
      "Where the pipeline actually stands, which sources pay for themselves, and who did what.",
    bullets: [
      "Dashboard KPIs and lead-source ROI",
      "Per-agent and per-team performance",
      "Append-only audit log with before/after",
    ],
    body:
      "Reporting reads from the same records the team works in every day, so the number on the dashboard and the number in the pipeline cannot disagree. The audit log is append-only — entries are added, never edited.",
    detail: [
      "Dashboard KPIs and reports",
      "Lead-source ROI, so campaign spend can be judged against the leads it produced",
      "Per-agent and per-team performance views",
      "Global and per-record activity feeds",
      "Append-only audit log capturing actor, action, before and after values, and IP address",
    ],
  },
];
