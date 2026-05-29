import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../useCart";
import { CREAM, FAINT, GOLD, SUBTLE, WARM_CARD } from "../../data/catalog";

export default function ProductCard({ product, onOpenModal, isSaved, onToggleWishlist, isCompared, onToggleCompare, compareDisabled }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (event) => {
    event.stopPropagation();
    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    addToCart({ ...product, selectedSize });
    setAdded(true);
    setSizeError(false);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      onClick={() => onOpenModal(product)}
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", background: WARM_CARD, border: "1px solid rgba(201,168,76,0.12)", overflow: "hidden", transition: "border-color 0.4s, transform 0.4s, box-shadow 0.4s", cursor: "pointer" }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = "rgba(201,168,76,0.52)";
        event.currentTarget.style.transform = "translateY(-8px)";
        event.currentTarget.style.boxShadow = "0 28px 76px rgba(0,0,0,0.34)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "";
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 5", background: "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--gold) 14%, transparent), transparent 38%), var(--image-panel)" }}>
        <div style={{ position: "absolute", top: 18, left: 18, zIndex: 2, background: "color-mix(in srgb, var(--bg-card) 78%, transparent)", color: GOLD, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", padding: "7px 10px", fontWeight: 500, fontFamily: "'Jost', sans-serif", border: "1px solid rgba(201,168,76,0.18)", backdropFilter: "blur(8px)" }}>{product.tag}</div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 3, width: 34, height: 34, display: "grid", placeItems: "center", background: "color-mix(in srgb, var(--bg-card) 82%, transparent)", color: isSaved ? GOLD : CREAM, border: `1px solid ${isSaved ? GOLD : "rgba(201,168,76,0.22)"}`, fontSize: 18, cursor: "pointer", backdropFilter: "blur(8px)" }}
        >
          {isSaved ? "♥" : "♡"}
        </button>

        <label onClick={(event) => event.stopPropagation()} style={{ position: "absolute", left: 18, bottom: 18, zIndex: 3, display: "flex", alignItems: "center", gap: 8, background: "color-mix(in srgb, var(--bg-card) 82%, transparent)", color: isCompared ? GOLD : CREAM, border: `1px solid ${isCompared ? GOLD : "rgba(201,168,76,0.22)"}`, padding: "8px 10px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: compareDisabled && !isCompared ? "not-allowed" : "pointer", backdropFilter: "blur(8px)" }}>
          <input type="checkbox" checked={isCompared} disabled={compareDisabled && !isCompared} onChange={() => onToggleCompare(product.id)} style={{ width: 12, height: 12, accentColor: GOLD }} />
          Compare
        </label>

        <img
          src={product.img}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 58%", transition: "transform 0.7s ease, filter 0.7s ease", filter: "brightness(0.84) contrast(1.06) saturate(0.84) sepia(0.16)" }}
          onMouseEnter={(event) => {
            event.currentTarget.style.transform = "scale(1.06)";
            event.currentTarget.style.filter = "brightness(0.9) contrast(1.08) saturate(0.88) sepia(0.12)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "scale(1)";
            event.currentTarget.style.filter = "brightness(0.84) contrast(1.06) saturate(0.84) sepia(0.16)";
          }}
        />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.16) 0%, transparent 34%, rgba(0,0,0,0.42) 100%)", pointerEvents: "none" }} />
      </div>

      <div style={{ padding: "24px 24px 28px" }} onClick={(event) => event.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: CREAM, lineHeight: 1.1, marginBottom: 4 }}>{product.name}</h3>
            <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.08em", marginBottom: 5 }}>★★★★★ {product.rating.toFixed(1)}</p>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: SUBTLE }}>{product.subtitle}</p>
            <p style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, marginTop: 8 }}>{product.color} / {product.category}</p>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: GOLD, fontWeight: 300 }}>₹{product.price.toLocaleString()}</div>
        </div>

        <div style={{ marginTop: 16, marginBottom: 4 }}>
          <p style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: sizeError ? "#c0392b" : FAINT, marginBottom: 8 }}>
            {sizeError ? "Select a size first" : "Size"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {product.availableSizes.map((size) => (
              <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }} style={{ padding: "5px 8px", fontSize: 9, fontFamily: "'Jost', sans-serif", background: selectedSize === size ? GOLD : "transparent", color: selectedSize === size ? "var(--button-text)" : SUBTLE, border: `1px solid ${selectedSize === size ? GOLD : "rgba(201,168,76,0.15)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(201,168,76,0.1)", margin: "16px 0" }} />

        <button
          onClick={handleAdd}
          style={{ width: "100%", padding: "13px", background: added ? GOLD : "transparent", border: "1px solid rgba(201,168,76,0.35)", color: added ? "var(--button-text)" : GOLD, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: "all 0.3s" }}
          onMouseEnter={(event) => { if (!added) { event.currentTarget.style.background = GOLD; event.currentTarget.style.color = "var(--button-text)"; } }}
          onMouseLeave={(event) => { if (!added) { event.currentTarget.style.background = "transparent"; event.currentTarget.style.color = GOLD; } }}
        >
          {added ? "✓ Added to Bag" : "Add to Bag"}
        </button>
      </div>
    </motion.div>
  );
}
