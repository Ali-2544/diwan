import { Plus_Jakarta_Sans, Inter } from "next/font/google";

/**
 * Plus Jakarta Sans for display, Inter for body/UI.
 *
 * The product uses a clean sans throughout, so the marketing site matches it:
 * a crisp, modern, lightly geometric sans for headlines rather than a serif.
 * Both are variable and self-hosted by next/font. To change the display face,
 * edit only this file — components reference `font-display` / `font-sans`.
 */

export const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const fontVariables = `${display.variable} ${sans.variable}`;
