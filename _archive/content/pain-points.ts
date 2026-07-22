/** Brief §3 — the problems the product solves. Problem → what the CRM does. */

export type PainPoint = {
  problem: string;
  detail: string;
  answer: string;
};

export const PAIN_POINTS: PainPoint[] = [
  {
    problem: "Leads rot",
    detail:
      "A portal lead lands at 9pm, nobody calls, and by morning the buyer has viewed with someone else.",
    answer:
      "Speed-to-lead SLA tracking flags at-risk and breached leads, then auto-rotates to the next agent.",
  },
  {
    problem: "Lead hoarding",
    detail:
      "Agents sit on leads they will never work, and nobody else can touch them.",
    answer:
      "Auto-drop timers release stale leads into a shared claim pool. Claims expire if not acted on.",
  },
  {
    problem: "Compliance risk",
    detail:
      "A listing goes to a portal without a valid Trakheesi permit, or stays up after the permit expires.",
    answer:
      "A hard publish gate: no active permit, no publish. Listings auto-delist on expiry.",
  },
  {
    problem: "No single source of truth",
    detail:
      "Leads live in WhatsApp, listings in spreadsheets, commissions in someone's Excel file.",
    answer:
      "One system for leads, listings, deals and commissions — with an audit trail underneath.",
  },
  {
    problem: "Unfair distribution",
    detail:
      "The same two agents get every good lead, and nobody can explain how routing actually works.",
    answer:
      "Round-robin rotation, configurable assignment rules, and agent availability honoured.",
  },
  {
    problem: "Commission disputes",
    detail:
      "Who gets what on a co-broke deal, before or after VAT, and was it ever invoiced?",
    answer:
      "Structured splits, internal and external co-broke, 5% VAT, and a Pending → Invoiced → Paid lifecycle.",
  },
  {
    problem: "No accountability trail",
    detail:
      "A record changed, the number moved, and nobody knows who did it or when.",
    answer:
      "Append-only audit log with actor, action, before/after and IP — plus a timeline on every record.",
  },
];
