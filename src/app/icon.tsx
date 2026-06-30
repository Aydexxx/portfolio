import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Same accent dot used before the wordmark in the nav — kept as the brand
// mark since a full "Aydexx" wordmark is illegible at favicon sizes.
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
          background: "#08080a",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "#6e6cf7",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
