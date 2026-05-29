import { useState } from "react";

const GOLD = "var(--gold)";
const WARM_BG = "var(--bg-card)";
const PANEL = "var(--bg-panel)";
const CREAM = "var(--text-main)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";

const fieldStyle = {
  width: "100%",
  background: "var(--field-bg)",
  border: "1px solid var(--field-border)",
  color: CREAM,
  padding: "15px 16px",
  fontSize: 13,
  fontFamily: "'Jost', sans-serif",
  outline: "none",
};

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: GOLD, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="contact-section section-pad"
      style={{
        background: WARM_BG,
        padding: "104px 64px",
        scrollMarginTop: 96,
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 0.88fr 1.12fr; gap: 24px; align-items: stretch; }
        .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-detail-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (max-width: 900px) {
          .contact-grid, .contact-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .contact-section { padding: 78px 22px !important; }
        }
      `}</style>

      <div className="contact-inner" style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>
            Concierge
          </span>
        </div>

        <div className="contact-grid">
          <div
            style={{
              background: PANEL,
              padding: "42px 40px",
              border: "1px solid rgba(201,168,76,0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: -48,
                top: -48,
                width: 180,
                height: 180,
                border: "1px solid rgba(201,168,76,0.12)",
                transform: "rotate(18deg)",
              }}
            />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(42px, 5vw, 64px)",
                fontWeight: 300,
                lineHeight: 1,
                color: CREAM,
                marginBottom: 22,
                position: "relative",
              }}
            >
              Talk to the <em style={{ color: GOLD, fontStyle: "italic" }}>atelier.</em>
            </h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.85, maxWidth: 470, marginBottom: 34 }}>
              Book a fitting, ask about leather care, or plan a made-to-order pair. We reply with clear next steps, not sales noise.
            </p>

            <div className="contact-detail-grid">
              {[
                ["Studio", "Bandra West, Mumbai"],
                ["Hours", "Mon-Sat / 11:00-19:00"],
                ["Concierge", "hello@foxfeet.in"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "var(--inactive-bg)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    padding: "16px 18px",
                  }}
                >
                  <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>
                    {label}
                  </div>
                  <div style={{ color: CREAM, fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            style={{
              background: "var(--bg-dark)",
              padding: "42px 40px",
              border: "1px solid rgba(201,168,76,0.12)",
            }}
          >
            {sent ? (
              <div style={{ minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 54, color: GOLD, marginBottom: 12 }}>
                  +
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 300, color: CREAM, marginBottom: 12 }}>
                  Request received.
                </h3>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8, maxWidth: 380 }}>
                  The atelier team will follow up with fitting availability and care notes.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div className="contact-row">
                  <Field label="Name">
                    <input required placeholder="Your name" style={fieldStyle} />
                  </Field>
                  <Field label="Email">
                    <input required type="email" placeholder="you@example.com" style={fieldStyle} />
                  </Field>
                </div>
                <div className="contact-row">
                  <Field label="Request">
                    <select defaultValue="Private fitting" style={fieldStyle}>
                      <option>Private fitting</option>
                      <option>Made to order</option>
                      <option>Care and renewal</option>
                      <option>General question</option>
                    </select>
                  </Field>
                  <Field label="Preferred date">
                    <input placeholder="Optional" style={fieldStyle} />
                  </Field>
                </div>
                <Field label="Message">
                  <textarea
                    required
                    placeholder="Tell us your size, preferred boot, or what kind of help you need."
                    rows={6}
                    style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.7 }}
                  />
                </Field>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
                  <p style={{ color: SUBTLE, fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                    Replies usually arrive within one business day.
                  </p>
                  <button
                    type="submit"
                    style={{
                      background: GOLD,
                      color: "var(--button-text)",
                      border: "none",
                      padding: "16px 30px",
                      fontSize: 10,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
