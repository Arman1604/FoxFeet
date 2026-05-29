import useScrollReveal from "../hooks/useScrollReveal";

const GOLD = "var(--gold)";
const WARM_BG = "var(--bg-panel)";
const WARM_CARD = "var(--bg-card)";
const CREAM = "var(--text-main)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";

const services = [
  {
    title: "Private Fittings",
    desc: "Last guidance, sizing notes, and leather recommendations for your foot shape.",
  },
  {
    title: "Made to Order",
    desc: "Choose leather tone, sole finish, elastic panel, lining, and monogram details.",
  },
  {
    title: "Care & Renewal",
    desc: "Conditioning, re-polishing, sole inspection, and seasonal restoration.",
  },
];

export default function Atelier() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="atelier"
      ref={sectionRef}
      className="atelier-section section-pad"
      style={{
        background: WARM_BG,
        padding: "96px 64px",
        scrollMarginTop: 96,
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <style>{`
        .atelier-grid { display: grid; grid-template-columns: 0.88fr 1.12fr; gap: 32px; align-items: stretch; }
        .atelier-services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; }
        .atelier-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        @media (max-width: 980px) {
          .atelier-grid { grid-template-columns: 1fr; }
          .atelier-services { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .atelier-section { padding: 76px 22px !important; }
        }
      `}</style>

      <div className="atelier-inner" style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div className="atelier-grid">
          <div
            style={{
              background: WARM_CARD,
              border: "1px solid rgba(201,168,76,0.12)",
              padding: "42px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
              <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.36em", textTransform: "uppercase", color: GOLD }}>
                The Atelier
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px, 5vw, 66px)",
                fontWeight: 300,
                lineHeight: 0.98,
                color: CREAM,
                marginBottom: 22,
              }}
            >
              Your pair, <em style={{ fontStyle: "italic", color: GOLD }}>finished around you.</em>
            </h2>

            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.85, maxWidth: 500, marginBottom: 30 }}>
              A quieter service layer for sizing, made-to-order details, repairs, and leather care. Built for people who want the pair to feel considered from the first wear.
            </p>

            <div className="atelier-cta">
              <a
                href="#contact"
                style={{
                  background: GOLD,
                  color: "var(--button-text)",
                  padding: "15px 30px",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                }}
              >
                Book a Visit
              </a>
              <a
                href="#collection"
                style={{
                  border: "1px solid rgba(201,168,76,0.35)",
                  color: GOLD,
                  padding: "14px 28px",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                View Boots
              </a>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: 440,
              overflow: "hidden",
              background: WARM_CARD,
              border: "1px solid rgba(201,168,76,0.12)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1100&q=85"
              alt="FoxFeet atelier fitting lounge"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.74) contrast(1.08) saturate(0.86) sepia(0.18)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, var(--overlay-soft) 0%, transparent 58%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 30,
                bottom: 30,
                right: 30,
                borderTop: "1px solid rgba(201,168,76,0.28)",
                paddingTop: 18,
              }}
            >
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: CREAM, fontWeight: 300, marginBottom: 7 }}>
                Appointments by request
              </p>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
                Mumbai studio / Remote fitting available
              </p>
            </div>
          </div>
        </div>

        <div className="atelier-services">
          {services.map((service, index) => (
            <div
              key={service.title}
              style={{
                background: WARM_CARD,
                border: "1px solid rgba(201,168,76,0.1)",
                padding: "24px 24px 26px",
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: GOLD, opacity: 0.78 }}>
                0{index + 1}
              </span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: CREAM, fontWeight: 300, margin: "16px 0 8px" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: SUBTLE, margin: 0 }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
