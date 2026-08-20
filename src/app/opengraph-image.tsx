import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          background: "#050608",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", fontSize: 14, letterSpacing: 6, color: "#818CF8", fontWeight: 700 }}>
          GOVERNMENT COLLEGE OF ENGINEERING SRIRANGAM · CSE 2023–2027
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 18 }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 900, lineHeight: 1 }}>
            <span style={{ color: "#FF8800" }}>60 MINDS.&nbsp;</span>
            <span style={{ color: "#fff" }}>ONE</span>
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 900, lineHeight: 1, color: "#22C55E" }}>COLLECTIVE.</div>
        </div>
        <div style={{ display: "flex", fontSize: 19, color: "#94A3B8", marginTop: 18 }}>
          6 domains · 18+ live projects · Web · AI/ML · Cloud · IoT · Mobile · Cybersecurity
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
          <div
            style={{
              display: "flex",
              background: "rgba(6,182,212,0.15)",
              border: "1px solid rgba(6,182,212,0.35)",
              padding: "6px 14px",
              borderRadius: 999,
              color: "#06B6D4",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            gces.net.in
          </div>
          <div style={{ display: "flex", color: "#475569" }}>·</div>
          <div style={{ display: "flex", color: "#CBD5E1", fontSize: 16, fontWeight: 700 }}>Hire GCES CSE 2027</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
