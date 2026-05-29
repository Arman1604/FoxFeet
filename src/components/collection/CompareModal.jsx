import { CREAM, GOLD, MUTED, SUBTLE, WARM_CARD } from "../../data/catalog";

export default function CompareModal({ products, onClose, onClear }) {
  const rows = [
    ["Price", ...products.map((product) => `₹${product.price.toLocaleString()}`)],
    ["Category", ...products.map((product) => product.category.charAt(0).toUpperCase() + product.category.slice(1))],
    ["Color", ...products.map((product) => product.color)],
    ["Sizes", ...products.map((product) => product.availableSizes.join(", "))],
  ];

  return (
    <div onClick={(event) => event.target === event.currentTarget && onClose()} style={{ position: "fixed", inset: 0, zIndex: 520, background: "var(--overlay-strong)", backdropFilter: "blur(10px)", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="compare-modal" style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.22)", maxWidth: 780, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "var(--shadow-soft)" }}>
        <div style={{ padding: "30px 34px 24px", display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
          <div>
            <p style={{ color: GOLD, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 10 }}>Compare Boots</p>
            <h3 style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, margin: 0 }}>{products[0]?.name} vs {products[1]?.name}</h3>
          </div>
          <button type="button" onClick={onClose} style={{ background: "transparent", color: MUTED, border: "1px solid rgba(201,168,76,0.2)", width: 36, height: 36, cursor: "pointer" }}>x</button>
        </div>

        <div style={{ padding: "0 34px 30px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "24px 0" }}>
            {products.map((product) => (
              <div key={product.id} style={{ display: "grid", gridTemplateColumns: "86px 1fr", gap: 14, alignItems: "center" }}>
                <img src={product.img} alt={product.name} style={{ width: 86, height: 92, objectFit: "cover", filter: "brightness(0.86) contrast(1.05) sepia(0.12)" }} />
                <div>
                  <strong style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, lineHeight: 1.05 }}>{product.name}</strong>
                  <p style={{ color: SUBTLE, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>{product.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ border: "1px solid rgba(201,168,76,0.14)", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(201,168,76,0.08)", color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {["Feature", products[0]?.name, products[1]?.name].map((heading) => <span key={heading} style={{ padding: "13px 14px", borderRight: "1px solid rgba(201,168,76,0.12)" }}>{heading}</span>)}
            </div>
            {rows.map((row) => (
              <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(201,168,76,0.1)", color: MUTED, fontSize: 12 }}>
                {row.map((cell, index) => <span key={`${row[0]}-${index}`} style={{ padding: "13px 14px", color: index === 0 ? GOLD : MUTED, borderRight: index < 2 ? "1px solid rgba(201,168,76,0.08)" : "none" }}>{cell}</span>)}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
            <button type="button" onClick={onClear} style={{ background: "transparent", color: SUBTLE, border: "1px solid rgba(201,168,76,0.2)", padding: "12px 16px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>Clear</button>
            <button type="button" onClick={onClose} style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "12px 18px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>Keep Comparing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
