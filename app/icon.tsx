import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "linear-gradient(135deg,#ffb020 0%,#ff6a13 55%,#d91e28 100%)",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 900,
            color: "#0a0806",
            letterSpacing: -2,
            display: "flex",
          }}
        >
          C
        </div>
      </div>
    ),
    size
  );
}
