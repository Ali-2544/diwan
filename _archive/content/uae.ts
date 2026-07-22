/** Content for /why-uae — the compliance story. */

/** Generic CRM vs a UAE-native domain model. */
export const CONTRASTS: { generic: string; native: string }[] = [
  {
    generic: "A custom text field called 'Permit No.' that someone remembers to fill in",
    native:
      "A Trakheesi permit record with issue date, expiry, status and Madmoun QR — and a publish action gated on it",
  },
  {
    generic: "A deal stage named 'Paperwork'",
    native:
      "RERA Forms A, A2, B, I, F and U, each with status, reference, signed date and expiry",
  },
  {
    generic: "An address line and a postcode field that nobody in the UAE uses",
    native: "Community, tower, unit, floor, latitude/longitude, Makani number and DLD title deed",
  },
  {
    generic: "One description box, in English",
    native: "EN and AR titles and descriptions on every listing, as standard",
  },
  {
    generic: "A currency dropdown and a commission percentage",
    native:
      "AED at fixed-point precision, 5% VAT, and commission rules split by sale and rent",
  },
  {
    generic: "An 'Agent' user field",
    native:
      "Agent profiles carrying BRN and licence expiry, with deal actions gated on validity",
  },
];

/** The Trakheesi permit lifecycle as the product enforces it. */
export const PERMIT_LIFECYCLE: { stage: string; detail: string }[] = [
  {
    stage: "Draft",
    detail:
      "The listing exists and can be prepared in full — media, pricing, bilingual copy — but it cannot be published.",
  },
  {
    stage: "Permit attached",
    detail:
      "Permit number, issue date, expiry date, status and Madmoun QR are recorded against the listing.",
  },
  {
    stage: "Publish gate clears",
    detail:
      "With an active, unexpired permit on file, the listing becomes publishable and can reach a portal.",
  },
  {
    stage: "Live",
    detail:
      "The listing is published, with a printable permit PDF available for anyone who asks to see it.",
  },
  {
    stage: "Expiry",
    detail:
      "When the permit lapses, the listing delists automatically. Nobody has to spot it on a spreadsheet.",
  },
];

export const RERA_FORMS: { form: string; use: string }[] = [
  { form: "Form A", use: "Seller and broker listing agreement" },
  { form: "Form A2", use: "Landlord and broker leasing agreement" },
  { form: "Form B", use: "Buyer and broker agreement" },
  { form: "Form I", use: "Broker-to-broker co-brokerage agreement" },
  { form: "Form F", use: "Memorandum of understanding between buyer and seller" },
  { form: "Form U", use: "Termination of a listing agreement" },
];

/** UAE vocabulary that exists as real structure in the data model. */
export const VOCABULARY: { term: string; meaning: string }[] = [
  {
    term: "Trakheesi",
    meaning:
      "Dubai's advertising permit system. Every listing record carries its permit, and publishing is gated on it being active.",
  },
  {
    term: "RERA",
    meaning:
      "The regulator whose forms govern brokerage agreements. Forms A, A2, B, I, F and U are tracked on the deal.",
  },
  {
    term: "DLD title deed",
    meaning:
      "Dubai Land Department ownership record, captured on the property alongside the rest of the location detail.",
  },
  {
    term: "Makani",
    meaning:
      "The ten-digit UAE building geolocation code — more precise than an address, and stored on the listing.",
  },
  {
    term: "Ejari",
    meaning:
      "Dubai's tenancy contract registration. Ejari has its own module, not a note in a comment box.",
  },
  {
    term: "BRN",
    meaning:
      "Broker Registration Number. Held with its expiry on agent profiles and on external co-brokers, and enforced on deals.",
  },
  {
    term: "Off-plan",
    meaning:
      "Property sold before completion. Listings link to projects carrying developer, handover date, payment plans and milestones.",
  },
  {
    term: "Co-broke",
    meaning:
      "A deal shared between two brokerages. Internal and external sides are separate commission records, each with its own party and BRN.",
  },
];
