import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { itemCount, priceRange } from "@/lib/menu";

export const alt = `${site.name} — pure veg cafe in Nangloi, New Delhi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0a0806",
          padding: 68,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,106,19,0.42) 0%, rgba(217,30,40,0.16) 45%, rgba(10,8,6,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,176,32,0.30) 0%, rgba(10,8,6,0) 68%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "linear-gradient(135deg,#ffb020,#ff6a13 55%,#d91e28)",
              fontSize: 38,
              fontWeight: 900,
              color: "#0a0806",
            }}
          >
            C
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#ffb020",
              textTransform: "uppercase",
            }}
          >
            Good Food · Good Mood
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 1,
              color: "#fff4e6",
            }}
          >
            Chill Cafe
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: -1,
              color: "#ff8f28",
            }}
          >
            Freshly made, just for you.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              color: "#a2907c",
              maxWidth: 900,
            }}
          >
            100% vegetarian · Nilothi Mode, Nangloi, New Delhi
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {[
            `Rated ${site.rating}/5 by ${site.ratingCount}+ locals`,
            `${itemCount} items · ₹${priceRange.min}–₹${priceRange.max}`,
            site.hours.range,
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "14px 26px",
                borderRadius: 999,
                border: "1px solid rgba(236,224,209,0.18)",
                fontSize: 22,
                fontWeight: 600,
                color: "#ece0d1",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
