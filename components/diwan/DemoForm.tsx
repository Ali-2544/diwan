"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Demo-request form. STUBBED: this static site has no backend, so submit logs
 * the payload and shows the success state. To go live, replace the body of
 * `handleSubmit` with a POST to your CRM/email endpoint — the validation,
 * pending and success states are already wired.
 */

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

const FIELDS: Field[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", placeholder: "Aisha Rahman" },
  { name: "brokerage", label: "Brokerage", required: true, autoComplete: "organization", placeholder: "Marina Property Group" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", placeholder: "aisha@brokerage.ae" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "+971 50 000 0000" },
];

const TEAM_SIZES = ["1–5 agents", "6–20 agents", "21–50 agents", "51–150 agents", "150+ agents"];
const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"];

const inputCls =
  "w-full rounded-[11px] border border-line bg-white px-4 py-3 text-[15px] text-ink " +
  "placeholder:text-muted transition-colors hover:border-[#CBD5E1] focus:border-gold focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    // --- Stub. Replace with a real request when an endpoint exists. ---
    console.log("[demo request]", payload);
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  }

  return (
    <div className="rounded-card-lg border border-line bg-white p-6 shadow-float sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="ok"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 0.8, 0.24, 1] }}
            className="flex flex-col items-start gap-5 py-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-soft bg-[#FDFAF2]">
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 10.5 4 4 8-8.5" />
              </svg>
            </span>
            <div>
              <h2 className="font-display text-[28px] font-semibold text-ink">
                Request received
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate">
                Thank you. We&rsquo;ll be in touch to arrange a walkthrough against
                your own listings, permits and commission structure.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-[14px] font-semibold text-gold-text underline underline-offset-4 hover:text-gold-textHover"
            >
              Send another request
            </button>
          </m.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className="flex flex-col gap-2">
                  <label htmlFor={f.name} className="text-[14px] font-semibold text-ink">
                    {f.label}
                    {!f.required && <span className="ml-1.5 text-muted">(optional)</span>}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type ?? "text"}
                    required={f.required}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    className={inputCls}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label htmlFor="teamSize" className="text-[14px] font-semibold text-ink">
                  Team size
                </label>
                <select id="teamSize" name="teamSize" defaultValue={TEAM_SIZES[1]} className={inputCls}>
                  {TEAM_SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="emirate" className="text-[14px] font-semibold text-ink">
                  Primary emirate
                </label>
                <select id="emirate" name="emirate" defaultValue="Dubai" className={inputCls}>
                  {EMIRATES.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="message" className="text-[14px] font-semibold text-ink">
                  What would you like to see?
                  <span className="ml-1.5 text-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Permit workflow, co-broke commissions, lead routing across teams…"
                  className={cn(inputCls, "resize-y")}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 border-t border-line pt-6">
              <button
                type="submit"
                disabled={status === "pending"}
                className="inline-flex items-center justify-center rounded-btn bg-gradient-to-b from-gold-2 to-gold px-7 py-4 text-base font-bold text-[#3a2a06] shadow-gold-btn transition-transform duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "pending" ? "Sending…" : "Book a demo"}
              </button>
              <p className="text-[14px] text-slate">Pricing on request. No obligation.</p>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
