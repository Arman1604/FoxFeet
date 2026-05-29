import { useCart } from "../useCart";
import { motion } from "framer-motion";

const CARD = "var(--bg-card)";
const GOLD = "var(--gold)";
const GOLD_LIGHT = "var(--gold-light)";
const TEXT = "var(--text-main)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";
const FAINT = "var(--text-faint)";

export default function CartSidebar({ isOpen, closeCart, onCheckout }) {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--backdrop)",
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer */}
      <motion.div
        className="cart-drawer"
        initial={false}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: 420,
          background: CARD,
          borderLeft: "1px solid rgba(201,168,76,0.15)",
          zIndex: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "32px 40px",
            borderBottom: "1px solid rgba(201,168,76,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28,
                fontWeight: 300,
                color: TEXT,
              }}
            >
              Your Bag
            </h2>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", color: FAINT, textTransform: "uppercase", marginTop: 4 }}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: "none",
              border: "1px solid rgba(201,168,76,0.2)",
              color: MUTED,
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GOLD;
              e.currentTarget.style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
              e.currentTarget.style.color = MUTED;
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 48,
                  color: "rgba(201,168,76,0.15)",
                  marginBottom: 16,
                }}
              >
                ✦
              </div>
              <p style={{ fontSize: 12, color: FAINT, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Your bag is empty
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "24px 0",
                    borderBottom: "1px solid rgba(201,168,76,0.08)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 20,
                          fontWeight: 400,
                          color: TEXT,
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ fontSize: 13, color: GOLD }}>₹{item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: FAINT,
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        fontFamily: "'Jost', sans-serif",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = FAINT)}
                    >
                      Remove
                    </button>
                  </div>

                  {/* Qty controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <button
                      onClick={() => decreaseQty(item.id)}
                      style={{
                        width: 30,
                        height: 30,
                        background: "none",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: MUTED,
                        cursor: "pointer",
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = GOLD;
                        e.currentTarget.style.color = GOLD;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                        e.currentTarget.style.color = MUTED;
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: 14, color: TEXT, minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      style={{
                        width: 30,
                        height: 30,
                        background: "none",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: MUTED,
                        cursor: "pointer",
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = GOLD;
                        e.currentTarget.style.color = GOLD;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)";
                        e.currentTarget.style.color = MUTED;
                      }}
                    >
                      +
                    </button>
                    <span style={{ marginLeft: "auto", fontSize: 14, color: MUTED }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "32px 40px", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: SUBTLE }}>
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  color: TEXT,
                  fontWeight: 300,
                }}
              >
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <p style={{ fontSize: 10, color: FAINT, marginBottom: 28, letterSpacing: "0.1em" }}>
              Taxes & shipping calculated at checkout
            </p>
            <button
              onClick={onCheckout}
              style={{
                width: "100%",
                padding: "18px",
                background: GOLD,
                color: "var(--button-text)",
                border: "none",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: "'Jost', sans-serif",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
