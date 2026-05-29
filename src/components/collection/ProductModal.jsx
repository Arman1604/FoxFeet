import { useEffect, useState } from "react";
import { CREAM, GOLD, GOLD_LIGHT, MUTED, SIZE_GUIDE, SUBTLE } from "../../data/catalog";

export default function ProductModal({ product, onClose, onAdd }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    onAdd({ ...product, selectedSize });
    onClose();
  };

  return (
    <div onClick={(event) => event.target === event.currentTarget && onClose()} style={{ position: "fixed", inset: 0, zIndex: 500, background: "var(--overlay-strong)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div className="modal-grid" style={{ background: "var(--bg-card)", border: "1px solid rgba(201,168,76,0.2)", maxWidth: 960, width: "100%", maxHeight: "90vh", overflow: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, zIndex: 10, background: "none", border: "1px solid rgba(201,168,76,0.2)", color: MUTED, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all 0.3s" }}>x</button>

        <div style={{ background: "var(--bg-panel)" }}>
          <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
            <img src={product.images[activeImg]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) sepia(0.1)", transition: "opacity 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 2, padding: "2px 0" }}>
            {product.images.map((img, index) => (
              <button key={`${img}-${index}`} onClick={() => setActiveImg(index)} style={{ flex: 1, aspectRatio: "1/1", overflow: "hidden", padding: 0, border: "none", outline: activeImg === index ? `1px solid ${GOLD}` : "none", cursor: "pointer" }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) sepia(0.1)" }} />
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", gap: 0 }}>
          <span style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>{product.tag}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: CREAM, lineHeight: 1, marginBottom: 6 }}>{product.name}</h2>
          <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: SUBTLE, marginBottom: 20 }}>{product.subtitle}</p>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: GOLD, fontWeight: 300, marginBottom: 24 }}>₹{product.price.toLocaleString()}</div>
          <div style={{ height: 1, background: "rgba(201,168,76,0.1)", marginBottom: 24 }} />
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.85, marginBottom: 28 }}>{product.description}</p>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: sizeError ? "#c0392b" : SUBTLE }}>{sizeError ? "Please select a size" : "Select Size"}</span>
              <button type="button" onClick={() => setShowSizeGuide((current) => !current)} style={{ background: "transparent", border: "none", padding: 0, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, cursor: "pointer", fontFamily: "'Jost', sans-serif" }}>Size Guide</button>
            </div>

            {showSizeGuide && (
              <div style={{ border: "1px solid rgba(201,168,76,0.16)", background: "var(--inactive-bg)", marginBottom: 14, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "rgba(201,168,76,0.08)", color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  {["UK", "EU", "CM"].map((heading) => <span key={heading} style={{ padding: "10px 12px", borderRight: heading !== "CM" ? "1px solid rgba(201,168,76,0.12)" : "none" }}>{heading}</span>)}
                </div>
                {SIZE_GUIDE.map((row) => (
                  <div key={row.uk} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", color: MUTED, fontSize: 12, borderTop: "1px solid rgba(201,168,76,0.08)" }}>
                    <span style={{ padding: "9px 12px" }}>{row.uk}</span>
                    <span style={{ padding: "9px 12px" }}>{row.eu}</span>
                    <span style={{ padding: "9px 12px" }}>{row.cm}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {product.availableSizes.map((size) => (
                <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} style={{ padding: "9px 14px", fontSize: 11, fontFamily: "'Jost', sans-serif", background: selectedSize === size ? GOLD : "transparent", color: selectedSize === size ? "var(--button-text)" : MUTED, border: `1px solid ${selectedSize === size ? GOLD : "rgba(201,168,76,0.2)"}`, cursor: "pointer", transition: "all 0.2s" }}>{size}</button>
              ))}
            </div>
          </div>

          <button onClick={handleAdd} style={{ width: "100%", padding: "16px", background: GOLD, color: "var(--button-text)", border: "none", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'Jost', sans-serif", cursor: "pointer", transition: "background 0.3s", marginBottom: 24 }} onMouseEnter={(event) => event.currentTarget.style.background = GOLD_LIGHT} onMouseLeave={(event) => event.currentTarget.style.background = GOLD}>Add to Bag</button>

          <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: 20 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Details</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {product.details.map((detail) => (
                <li key={detail} style={{ fontSize: 12, color: SUBTLE, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, marginTop: 1 }}>-</span>{detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 720px) { .modal-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
