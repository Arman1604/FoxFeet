const GOLD = "var(--gold)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";
const FAINT = "var(--text-faint)";

const links = {
  Collection: ["Chelsea Classic", "Midnight Chelsea", "Tan Wanderer", "Obsidian Edge"],
  Company: ["Our Story", "Craft", "Atelier", "Press"],
  Support: ["Size Guide", "Care Guide", "Returns", "Contact Us"],
};

const socialLinks = ["Instagram", "Pinterest", "WhatsApp"];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: "var(--bg-panel)", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "80px 64px 40px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 72, paddingBottom: 72, borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: 8 }}>FoxFeet</div>
          <div style={{ fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", color: FAINT, marginBottom: 24 }}>Luxury Footwear since 2008</div>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.8, maxWidth: 280 }}>Handcrafted chelsea boots for those who understand that true luxury is not loudness — it is permanence.</p>
          <p style={{ fontSize: 10, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 22 }}>
            Made with craftsmanship in India
          </p>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, marginBottom: 24, fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>{title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {items.map(item => (
                <li key={item}>
                  <a href="#" style={{ fontSize: 12, color: SUBTLE, textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = GOLD}
                    onMouseLeave={e => e.target.style.color = SUBTLE}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 10, color: FAINT, letterSpacing: "0.1em" }}>© 2026 FoxFeet. All rights reserved.</p>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {[...socialLinks, "Privacy", "Terms", "Sitemap"].map(l => (
            <a key={l} href="#" style={{ fontSize: 10, color: FAINT, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = GOLD}
              onMouseLeave={e => e.target.style.color = FAINT}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
