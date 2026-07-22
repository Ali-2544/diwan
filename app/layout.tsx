import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/config/fonts";
import { SITE } from "@/config/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Nav } from "@/components/diwan/Nav";
import { Footer } from "@/components/diwan/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — the UAE-native real-estate CRM`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AE",
    url: SITE.url,
    title: `${SITE.name} — the UAE-native real-estate CRM`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0E2A47",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
