"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

/**
 * Demo request form.
 *
 * STUBBED: there is no backend on this site. Submitting logs the payload to the
 * console and shows the success state. To wire it up later, replace the body of
 * `handleSubmit` with a fetch to your endpoint — the validation, pending and
 * success states are already here.
 */

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  full?: boolean;
};

const FIELDS: Field[] = [
  {
    name: "name",
    label: "Full name",
    required: true,
    autoComplete: "name",
    placeholder: "Aisha Rahman",
  },
  {
    name: "brokerage",
    label: "Brokerage",
    required: true,
    autoComplete: "organization",
    placeholder: "Marina Property Group",
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    required: true,
    autoComplete: "email",
    placeholder: "aisha@brokerage.ae",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+971 50 000 0000",
  },
];

const TEAM_SIZES = [
  "1–5 agents",
  "6–20 agents",
  "21–50 agents",
  "51–150 agents",
  "150+ agents",
];

const inputStyles =
  "w-full rounded-md border border-ink-700 bg-ink-950 px-4 py-3 text-body text-text-on-dark " +
  "placeholder:text-ink-500 transition-colors duration-200 " +
  "hover:border-ink-600 focus:border-gold-500 focus:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900";

export function DemoForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");
  const { safe } = useMotionSafe();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");

    const payload = Object.fromEntries(new FormData(event.currentTarget));

    // --- Stub. Replace with a real request when an endpoint exists. ---
    console.log("[demo request]", payload);
    await new Promise((resolve) => setTimeout(resolve, 600));
    // ------------------------------------------------------------------

    setStatus("success");
  }

  return (
    <div className="rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8 lg:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            role="status"
            initial={safe ? { opacity: 0, y: 8 } : { opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: safe ? 0.4 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-5 py-6"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-5 w-5 text-gold-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m4 10.5 4 4 8-8.5" />
              </svg>
            </span>

            <div className="flex flex-col gap-3">
              <h2 className="font-display text-display-md font-medium text-text-on-dark">
                Request received
              </h2>
              <p className="max-w-md text-body text-text-on-dark-muted">
                Thank you. We&rsquo;ll be in touch to arrange a walkthrough
                against your own listings, permits and commission structure.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-small text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
            >
              Send another request
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            initial={false}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <div
                  key={field.name}
                  className={cn("flex flex-col gap-2", field.full && "sm:col-span-2")}
                >
                  <label
                    htmlFor={field.name}
                    className="text-small font-medium text-text-on-dark"
                  >
                    {field.label}
                    {!field.required && (
                      <span className="ml-1.5 text-text-on-dark-muted">
                        (optional)
                      </span>
                    )}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type ?? "text"}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    className={inputStyles}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="teamSize"
                  className="text-small font-medium text-text-on-dark"
                >
                  Team size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  defaultValue={TEAM_SIZES[1]}
                  className={cn(inputStyles, "appearance-none bg-none pr-10")}
                >
                  {TEAM_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="emirate"
                  className="text-small font-medium text-text-on-dark"
                >
                  Primary emirate
                </label>
                <select
                  id="emirate"
                  name="emirate"
                  defaultValue="Dubai"
                  className={cn(inputStyles, "appearance-none bg-none pr-10")}
                >
                  {[
                    "Dubai",
                    "Abu Dhabi",
                    "Sharjah",
                    "Ajman",
                    "Ras Al Khaimah",
                    "Fujairah",
                    "Umm Al Quwain",
                  ].map((emirate) => (
                    <option key={emirate} value={emirate}>
                      {emirate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-small font-medium text-text-on-dark"
                >
                  What would you like to see?
                  <span className="ml-1.5 text-text-on-dark-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Anything specific — permit workflow, co-broke commissions, lead routing across teams."
                  className={cn(inputStyles, "resize-y")}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 border-t border-ink-800 pt-6">
              <Button type="submit" size="lg" disabled={status === "pending"}>
                {status === "pending" ? "Sending…" : "Book a demo"}
              </Button>
              <p className="text-small text-text-on-dark-muted">
                Pricing on request. No obligation.
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
