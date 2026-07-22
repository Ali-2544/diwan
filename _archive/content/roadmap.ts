/**
 * Brief §8 — the honesty guardrails.
 *
 * Everything in this file is NOT available today. It may only ever be rendered
 * with a "Coming soon" label, on /roadmap or in the homepage roadmap teaser.
 * Nothing here may be described in the present tense anywhere else on the site.
 *
 * `today` states what genuinely exists now, so the roadmap stays specific and
 * honest rather than vague.
 */

export type RoadmapItem = {
  title: string;
  /** What is genuinely built and working today. */
  today: string;
  /** What is not built yet — stated plainly. */
  notYet: string;
  /** Shown on the homepage teaser (the four most commonly assumed). */
  featured?: boolean;
};

export const ROADMAP: RoadmapItem[] = [
  {
    title: "Outbound email, SMS and WhatsApp sending",
    today:
      "Message templates per channel, multilingual, with a WhatsApp-approval flag. Sequences with multi-step enrolment. A full communication log covering inbound and outbound, with delivery status.",
    notYet:
      "The sender itself is a logging stub. Nothing is delivered to a real inbox or handset yet — the templates, sequencing and logging are built, the outbound connection is not wired.",
    featured: true,
  },
  {
    title: "Live portal sync with Property Finder, Bayut and Dubizzle",
    today:
      "An encrypted integration credential vault, inbound webhooks with queue-based processing, lead ingestion, and the publish gate that decides what is eligible to go out.",
    notYet:
      "The portal-specific adapters are early. Treat two-way live sync with each portal as in progress, not delivered.",
    featured: true,
  },
  {
    title: "Full mobile app",
    today:
      "An Expo / React Native app with login and biometric unlock working end to end.",
    notYet:
      "The feature screens are not built. It is an authentication skeleton today, not a way to work your pipeline from a phone.",
    featured: true,
  },
  {
    title: "AI lead scoring and smart matching",
    today:
      "Lead scoring from 0–100 and listing auto-matching, both driven by explicit, inspectable rules you configure.",
    notYet:
      "There is no machine learning in it. We would rather ship a rule you can read and change than call a lookup table 'AI'.",
    featured: true,
  },
  {
    title: "E-signature",
    today:
      "RERA forms A, A2, B, I, F and U are tracked with status, reference, signed date and expiry, alongside a document vault.",
    notYet: "Signing happens outside the system. There is no e-signature flow yet.",
  },
  {
    title: "Live DLD and Trakheesi API sync",
    today:
      "Permit data — number, issue and expiry dates, status, Madmoun QR — is entered and managed in-app, and the publish gate enforces it.",
    notYet:
      "None of it is pulled from a government API. Permit records are maintained by your team, not synced automatically.",
  },
  {
    title: "Mortgage and EMI calculators",
    today:
      "Payment type (cash or mortgage) is captured on the lead, and off-plan projects carry payment plans and milestones.",
    notYet: "There is no mortgage or EMI calculator in the product.",
  },
];

export const FEATURED_ROADMAP = ROADMAP.filter((item) => item.featured);
