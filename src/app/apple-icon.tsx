import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own corner rounding to home-screen icons, so this stays a
// full-bleed square — same accent-dot mark as icon.tsx, scaled up.
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
          background: "#08080a",
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "#6e6cf7",
            boxShadow: "0 0 60px 10px rgba(110, 108, 247, 0.55)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
