import { useState } from "react";

const GOLD = "var(--gold)";
const WARM_BG = "var(--bg-card)";
const CREAM = "var(--text-main)";
const SUBTLE = "var(--text-subtle)";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section style={{ background: WARM_BG, padding: "120px 64px", borderTop: "1px solid rgba(201,168,76,0.1)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "20vw", fontWeight: 600, color: "rgba(201,168,76,0.04)", whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>FOXFEET</div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
          <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>The Inner Circle</span>
          <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 60, fontWeight: 300, color: CREAM, lineHeight: 1, marginBottom: 20 }}>
          First to <em style={{ fontStyle: "italic", color: GOLD }}>Know.</em>
        </h2>

        <p style={{ fontSize: 14, color: SUBTLE, lineHeight: 1.8, marginBottom: 52 }}>
          Join our private list. New drops, limited editions, and invitations to exclusive trunk shows — before anyone else.
        </p>

        {sent ? (
          <div style={{ padding: "20px 40px", border: "1px solid rgba(201,168,76,0.35)", color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic" }}>
            Welcome to the circle. ✦
          </div>
        ) : (
          <div style={{ display: "flex", maxWidth: 480, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, background: "var(--field-bg)", border: "1px solid var(--field-border)", borderRight: "none", color: CREAM, padding: "16px 24px", fontSize: 12, fontFamily: "'Jost', sans-serif", letterSpacing: "0.08em", outline: "none" }}
            />
            <button
              onClick={() => email.trim() && setSent(true)}
              style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "16px 32px", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'Jost', sans-serif", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >Join</button>
          </div>
        )}
      </div>
    </section>
  );
}
