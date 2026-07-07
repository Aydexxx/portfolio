import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The cobalt accent dot on gallery paper — the site's brand mark, legible at
// favicon sizes where a wordmark would not be.
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
          background: "#F5F3EE",
          borderRadius: 7,
          border: "1px solid #E4E0D6",
        }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "#1F3BE0",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
