import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand mark — the apricot dot on warm charcoal, the same dot that sits in
// the `gitsite` wordmark. Legible at favicon size where a wordmark would not.
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
          background: "#16131a",
          borderRadius: 7,
          border: "1px solid #322b3a",
        }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "#E8955A",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
