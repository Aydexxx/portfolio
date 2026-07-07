import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own corner rounding to home-screen icons, so this stays a
// full-bleed square — same cobalt-dot mark as icon.tsx, scaled up on paper.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F3EE",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "#1F3BE0",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
