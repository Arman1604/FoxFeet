import { useEffect, useRef } from "react";

const GOLD = "var(--gold)";
const CREAM = "var(--text-main)";
const BG = "var(--bg-panel)";
const MUTED = "var(--text-muted)";
const CARD = "var(--bg-card)";
const SUBTLE = "var(--text-subtle)";

const steps = [
  {
    num: "01",
    title: "Selection",
    desc: "Only the top 8% of full-grain hides are hand-selected for density, structure, and natural grain character.",
  },
  {
    num: "02",
    title: "Cutting",
    desc: "Every panel is traced and cut by hand using legacy templates refined across three generations.",
  },
  {
    num: "03",
    title: "Stitching",
    desc: "Double-lock saddle stitching with waxed linen thread — a method rooted in European luxury leathercraft.",
  },
  {
    num: "04",
    title: "Finishing",
    desc: "Seven layers of burnishing cream applied by hand. Edges bevelled, polished, and heat-set for longevity.",
  },
];

export default function Craft() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    el.style.opacity = 0;
    el.style.transform = "translateY(60px)";

    setTimeout(() => {
      el.style.transition = "all 1.2s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      style={{
        background: BG,
        padding: "118px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Editorial Layout */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: "72px",
          alignItems: "center",
        }}
      >
        {/* Left Image */}
        <div style={{ position: "relative" }}>
          <img
            src="https://i.ibb.co/ymyFzhbV/Chat-GPT-Image-May-19-2026-02-12-54-AM.png"
            alt="FoxFeet Atelier"
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              filter:
                "brightness(0.78) contrast(1.05) sepia(0.15)",
              borderRadius: "var(--radius-md)",
            }}
          />

          {/* Soft Gold Edge Frame */}
          <div
            style={{
              position: "absolute",
              top: 30,
              left: 30,
              right: -30,
              bottom: -30,
              border: "1px solid rgba(201,168,76,0.25)",
              zIndex: -1,
              borderRadius: "var(--radius-md)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              right: 24,
              bottom: 24,
              background: "var(--overlay-soft)",
              border: "1px solid rgba(201,168,76,0.18)",
              padding: "16px 18px",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div style={{ color: GOLD, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>
              Atelier Standard
            </div>
            <div style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, lineHeight: 1.1 }}>
              Cut, stitched, burnished, inspected.
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div style={{ position: "relative" }}>
          {/* Giant Faded Number Background */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -40,
              fontSize: 300,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              lineHeight: 1,
              background:
                "linear-gradient(180deg, rgba(201,168,76,0.25), rgba(201,168,76,0.05))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.1,
              pointerEvents: "none",
            }}
          >
            01
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 50,
                height: 1,
                background: GOLD,
              }}
            />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Our Craft
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 72,
              fontWeight: 300,
              lineHeight: 1.05,
              color: CREAM,
              marginBottom: 22,
            }}
          >
            Slow made.
            <br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>
              Forever worn.
            </em>
          </h2>

          <p
            style={{
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.85,
              maxWidth: 560,
              marginBottom: 34,
            }}
          >
            Every FOXFEET boot is treated as equipment first and fashion second:
            better hides, slower finishing, and construction choices that improve
            with use.
          </p>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
            {steps.map((step) => (
              <div
                key={step.num}
                style={{
                  background: CARD,
                  border: "1px solid rgba(201,168,76,0.12)",
                  padding: "24px 24px 26px",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    color: GOLD,
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28,
                    color: CREAM,
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: SUBTLE,
                    lineHeight: 1.75,
                    maxWidth: 500,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1100px) {
          section#craft > div {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }

        @media (max-width: 680px) {
          section#craft {
            padding: 88px 22px !important;
          }

          section#craft > div > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
