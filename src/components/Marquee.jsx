export default function Marquee() {
  const items = [
    "Full-Grain Leather",
    "Handcrafted in India",
    "Premium Sole Construction",
    "Artisan Stitching",
    "Limited Runs",
    "Made to Last",
  ];

  return (
    <div
      style={{
        background: "var(--gold)",
        overflow: "hidden",
        padding: "14px 0",
        borderTop: "none",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marqueeScroll 22s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--button-text)",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
              padding: "0 40px",
              flexShrink: 0,
            }}
          >
            {item}
            <span style={{ marginLeft: 40, opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
