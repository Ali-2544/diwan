import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";

export const alt = `${SITE.name} — CRM for Dubai real estate brokerages`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card, generated at build time. Applies to every route unless
 * a route defines its own opengraph-image.
 *
 * Deliberately typographic — no photography, no claims, no statistics.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0A09",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 8,
              border: "1px solid rgba(201,162,75,0.4)",
              background: "rgba(201,162,75,0.1)",
              color: "#D4B66A",
              fontSize: 22,
            }}
          >
            DD
          </div>
          <div style={{ color: "#F7F4EE", fontSize: 30, letterSpacing: -0.5 }}>
            {SITE.shortName}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: "#C9A24B",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Built for Dubai brokerages
          </div>
          <div
            style={{
              color: "#F7F4EE",
              fontSize: 62,
              lineHeight: 1.14,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            From portal lead to Trakheesi-compliant listing to commission paid.
          </div>
        </div>

        {/* Footer rule */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ height: 1, background: "#2E2823" }} />
          <div
            style={{
              display: "flex",
              gap: 36,
              color: "#A9A096",
              fontSize: 22,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span>Trakheesi permit gate</span>
            <span style={{ color: "#453C35" }}>·</span>
            <span>RERA forms</span>
            <span style={{ color: "#453C35" }}>·</span>
            <span>AED with 5% VAT</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
