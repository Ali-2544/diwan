/**
 * Brief §6 — security posture.
 *
 * `plain` is written for a brokerage owner with no technical background.
 * `technical` is the detail layer for whoever they forward the page to.
 */

export type SecurityItem = {
  title: string;
  plain: string;
  technical: string;
  featured?: boolean;
};

export const SECURITY_ITEMS: SecurityItem[] = [
  {
    title: "Two-factor authentication",
    plain:
      "A password alone is not enough to get in. Staff confirm with a code from their phone, and every account gets one-time recovery codes in case they lose the device.",
    technical:
      "MFA via TOTP. Secrets are stored encrypted, and recovery codes are single-use.",
    featured: true,
  },
  {
    title: "Passwords stored so they can't be read back",
    plain:
      "Nobody — including us — can read a staff member's password. Even if a copy of the database were taken, the passwords in it would not be usable.",
    technical:
      "Argon2id hashing, the current recommendation for password storage, chosen for memory-hard resistance to GPU-accelerated cracking.",
    featured: true,
  },
  {
    title: "Sessions that expire and can't be replayed",
    plain:
      "Login sessions are short-lived and refresh quietly in the background. If a session token is ever stolen and reused, the system detects it and cuts the session off.",
    technical:
      "Short-lived JWTs with rotating refresh tokens and reuse detection — presenting a rotated token invalidates the family.",
    featured: true,
  },
  {
    title: "Tokens the browser can't leak",
    plain:
      "Login credentials are held in a way that scripts running in the browser cannot read, which closes off one of the most common ways accounts get hijacked.",
    technical:
      "Tokens live in httpOnly cookies, never localStorage, behind a BFF proxy architecture. This removes the XSS token-exfiltration path.",
    featured: true,
  },
  {
    title: "Access changes take effect immediately",
    plain:
      "When an agent leaves and you deactivate them, they are out — not at the end of the day, and not when their session happens to expire.",
    technical:
      "Role and status are resolved per request rather than baked into a long-lived token, so revocation is immediate.",
  },
  {
    title: "Deleted doesn't mean gone forever",
    plain:
      "If someone deletes a lead or a listing by mistake, it can be brought back rather than lost.",
    technical:
      "Soft delete with restore across recoverable records, so deletion is a state change rather than a destructive write.",
  },
  {
    title: "A record of who did what",
    plain:
      "Every meaningful change is recorded — who made it, what it was before, what it became, and from where. Entries are added, never edited or removed.",
    technical:
      "Append-only audit log capturing actor, action, before/after values and IP address.",
  },
  {
    title: "Your data stays inside your brokerage",
    plain:
      "Your records are scoped to your organisation at the database level, not just hidden by the interface.",
    technical:
      "Country and tenant scoping enforced at the database boundary rather than in application filtering alone.",
  },
  {
    title: "Monitoring and predictable failures",
    plain:
      "The system reports its own health, and when something does go wrong it fails in a consistent, diagnosable way.",
    technical:
      "Structured logging, health and readiness probes, and a consistent error shape across the API.",
  },
];

export const FEATURED_SECURITY = SECURITY_ITEMS.filter((item) => item.featured);
