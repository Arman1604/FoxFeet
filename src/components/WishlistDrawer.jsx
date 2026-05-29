import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { catalogProducts, CREAM, FAINT, GOLD, MUTED, SUBTLE, WARM_CARD } from "../data/catalog";

const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("foxfeet-wishlist")) || [];
  } catch {
    return [];
  }
};

export default function WishlistDrawer({ isOpen, onClose }) {
  const [wishlist, setWishlist] = useState(readWishlist);

  useEffect(() => {
    if (!isOpen) return undefined;

    const syncWishlist = () => setWishlist(readWishlist());
    syncWishlist();
    window.addEventListener("storage", syncWishlist);
    window.addEventListener("foxfeet:wishlist", syncWishlist);
    return () => {
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("foxfeet:wishlist", syncWishlist);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const savedProducts = useMemo(
    () => wishlist.map((id) => catalogProducts.find((product) => product.id === id)).filter(Boolean),
    [wishlist]
  );

  const updateWishlist = (nextWishlist) => {
    localStorage.setItem("foxfeet-wishlist", JSON.stringify(nextWishlist));
    setWishlist(nextWishlist);
    window.dispatchEvent(new CustomEvent("foxfeet:wishlist"));
  };

  const removeItem = (id) => {
    updateWishlist(wishlist.filter((savedId) => savedId !== id));
  };

  const exploreCollection = () => {
    onClose();
    setTimeout(() => document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const viewItem = (name) => {
    onClose();
    setTimeout(() => {
      document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("foxfeet:search", { detail: name }));
    }, 80);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 420,
          background: isOpen ? "var(--backdrop)" : "transparent",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      <motion.aside
        className="wishlist-drawer"
        aria-hidden={!isOpen}
        initial={false}
        animate={{ x: isOpen ? 0 : "105%" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(430px, 100vw)",
          height: "100vh",
          zIndex: 430,
          background: "var(--bg-card)",
          borderLeft: "1px solid rgba(201,168,76,0.18)",
          boxShadow: "var(--shadow-soft)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "34px 32px 22px", borderBottom: "1px solid rgba(201,168,76,0.12)", display: "flex", justifyContent: "space-between", gap: 20 }}>
          <div>
            <p style={{ color: GOLD, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 8 }}>Saved Collection</p>
            <h2 style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, margin: 0 }}>
              Your saved pairs.
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close wishlist" style={{ background: "transparent", color: MUTED, border: "1px solid rgba(201,168,76,0.2)", width: 36, height: 36, cursor: "pointer" }}>
            x
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "26px 32px" }}>
          {savedProducts.length === 0 ? (
            <div style={{ minHeight: "58vh", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <div style={{ color: GOLD, fontSize: 42, marginBottom: 18 }}>♡</div>
              <h3 style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, marginBottom: 12 }}>
                No saved pairs yet.
              </h3>
              <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.8, margin: "0 auto 28px", maxWidth: 280 }}>
                Tap the heart on any boot to save it here.
              </p>
              <button type="button" onClick={exploreCollection} style={{ alignSelf: "center", background: GOLD, color: "var(--button-text)", border: "none", padding: "14px 22px", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {savedProducts.map((product) => (
                <article key={product.id} style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", display: "grid", gridTemplateColumns: "92px 1fr", gap: 16, overflow: "hidden" }}>
                  <img src={product.img} alt={product.name} style={{ width: 92, height: "100%", minHeight: 126, objectFit: "cover", filter: "brightness(0.86) contrast(1.05) sepia(0.12)" }} />
                  <div style={{ padding: "16px 16px 16px 0" }}>
                    <h3 style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, marginBottom: 4 }}>
                      {product.name}
                    </h3>
                    <p style={{ color: GOLD, fontSize: 13, marginBottom: 8 }}>₹{product.price.toLocaleString()}</p>
                    <p style={{ color: FAINT, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>
                      {product.color} / {product.category}
                    </p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button type="button" onClick={() => viewItem(product.name)} style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "10px 14px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
                        View
                      </button>
                      <button type="button" onClick={() => removeItem(product.id)} style={{ background: "transparent", color: SUBTLE, border: "1px solid rgba(201,168,76,0.22)", padding: "9px 13px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
