import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const CARDS = [
  {
    title: "Two-factor authentication",
    body: "A password alone isn't enough. Staff confirm with a code from their phone, and every account gets one-time recovery codes.",
  },
  {
    title: "Passwords can't be read back",
    body: "Nobody — including us — can read a staff member's password. Even a stolen database copy would be unusable.",
  },
  {
    title: "Sessions that can't be replayed",
    body: "Login sessions are short-lived and refresh quietly. If a token is ever stolen and reused, the system cuts the session off.",
  },
  {
    title: "Tokens the browser can't leak",
    body: "Credentials are held so scripts running in the browser can't read them — closing one of the most common ways accounts get hijacked.",
  },
];

/** Section 12 — the one big dark navy moment. */
export function Security() {
  return (
    <section
      id="security"
      className="relative overflow-hidden bg-navy px-5 py-section text-white sm:px-gutter"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[100px] -top-[140px] h-[520px] w-[520px] animate-blob rounded-full"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.18),transparent 68%)",
        }}
      />
      <Container className="relative">
        <div className="mb-[52px] max-w-prose-sm">
          <Reveal variant="up">
            <Eyebrow tone="gold2">Security</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.06] text-white">
              Your client list is the business. It&rsquo;s treated that way.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[18px] text-[17px] leading-[1.6] text-white/70">
              Contact details, budgets and deal values sit in this system. Here
              is what protects them — in plain terms.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-[22px] md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} variant="up" delay={i % 2 === 1 ? 60 : 0}>
              <div className="h-full rounded-card border border-white/[0.12] bg-white/[0.04] p-[26px]">
                <h4 className="font-display text-[20px] font-semibold text-gold-2">
                  {c.title}
                </h4>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-white/70">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
