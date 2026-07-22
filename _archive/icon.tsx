import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the gold DD monogram from the wordmark, on ink. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0A09",
          color: "#C9A24B",
          fontSize: 30,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -1,
        }}
      >
        DD
      </div>
    ),
    size,
  );
}
