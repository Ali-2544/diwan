import { Newsreader, Hanken_Grotesk } from "next/font/google";

/**
 * Diwan typography (from the design handoff):
 *  - Display / headings: Newsreader (serif), optical sizing on, italic used for
 *    the gold-gradient hero highlight words.
 *  - Body / UI: Hanken Grotesk.
 * Both variable and self-hosted by next/font. Change only this file to swap.
 */

export const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const fontVariables = `${display.variable} ${body.variable}`;
