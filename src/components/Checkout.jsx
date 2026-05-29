import { useState } from "react";
import { useCart } from "../useCart";

const GOLD = "var(--gold)";
const GOLD_LIGHT = "var(--gold-light)";
const WARM_BG = "var(--bg-main)";
const WARM_CARD = "var(--bg-card)";
const CREAM = "var(--text-main)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";
const FAINT = "var(--text-faint)";

const inputStyle = {
  width: "100%",
  background: "var(--field-bg)",
  border: "1px solid var(--field-border)",
  color: CREAM,
  padding: "15px 16px",
  fontSize: 13,
  fontFamily: "'Jost', sans-serif",
  letterSpacing: "0.04em",
  outline: "none",
};

const trackingSteps = [
  { label: "Confirmed", complete: true },
  { label: "Processing", complete: true },
  { label: "Shipped", complete: false },
  { label: "Delivered", complete: false },
];

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: SUBTLE }}>{label}</span>
      {children}
    </label>
  );
}

export default function Checkout({ backToShop, openCart }) {
  const { cartItems, totalPrice } = useCart();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shipping = delivery === "express" ? 399 : 0;
  const tax = Math.round(totalPrice * 0.08);
  const grandTotal = totalPrice + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cartItems.length === 0) return;
    setOrderNumber(`FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <main style={{ minHeight: "100vh", background: WARM_BG, padding: "140px 24px 96px" }}>
        <style>{`
          .order-tracking-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 12px;
          }
          @media (max-width: 680px) {
            .order-tracking-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
        `}</style>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* Top confirmation */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, color: GOLD, lineHeight: 1, marginBottom: 12 }}>✦</div>
            <p style={{ fontSize: 10, letterSpacing: "0.38em", color: GOLD, textTransform: "uppercase", marginBottom: 14 }}>Order Confirmed</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 300, color: CREAM, lineHeight: 1.05, marginBottom: 14 }}>
              Your pair is being prepared.
            </h1>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.8 }}>
              A confirmation has been sent to your email.
            </p>
          </div>

          {/* Order tracking */}
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", background: WARM_CARD, padding: "28px 30px", marginBottom: 32, boxShadow: "var(--shadow-card)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18, flexWrap: "wrap", marginBottom: 22 }}>
              <div>
                <p style={{ fontSize: 9, letterSpacing: "0.26em", color: GOLD, textTransform: "uppercase", marginBottom: 8 }}>
                  Order Tracking
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 300, color: CREAM, lineHeight: 1.05, margin: 0 }}>
                  Order #{orderNumber}
                </h2>
              </div>
              <span style={{ border: "1px solid rgba(201,168,76,0.26)", color: GOLD, padding: "9px 12px", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Live Status
              </span>
            </div>

            <div className="order-tracking-grid">
              {trackingSteps.map((step) => (
                <div
                  key={step.label}
                  style={{
                    border: `1px solid ${step.complete ? "rgba(201,168,76,0.32)" : "var(--line)"}`,
                    background: step.complete ? "rgba(201,168,76,0.08)" : "var(--field-bg)",
                    padding: "16px 14px",
                    minHeight: 88,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 14,
                  }}
                >
                  <span style={{ color: step.complete ? GOLD : FAINT, fontSize: 21, lineHeight: 1 }}>
                    {step.complete ? "✓" : "○"}
                  </span>
                  <span style={{ color: step.complete ? CREAM : MUTED, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Email preview card */}
          <div style={{ border: "1px solid rgba(201,168,76,0.2)", background: "var(--receipt-bg)", marginBottom: 32, overflow: "hidden", boxShadow: "var(--shadow-soft)" }}>
            {/* Email chrome bar */}
            <div style={{ background: "var(--receipt-bar)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--receipt-border)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#e74c3c","#f39c12","#2ecc71"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
              </div>
              <div style={{ flex: 1, background: "var(--receipt-chip)", borderRadius: 2, padding: "4px 12px", fontSize: 10, color: "var(--receipt-muted)", fontFamily: "monospace", textAlign: "center" }}>
                hello@foxfeet.in — Order {orderNumber}
              </div>
            </div>

            {/* Email body */}
            <div style={{ padding: "0 0 36px", color: "var(--receipt-text)", fontFamily: "'Jost', sans-serif" }}>

              {/* Email header */}
              <div style={{ background: "var(--bg-card)", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}>FoxFeet</span>
                <span style={{ fontSize: 9, letterSpacing: "0.3em", color: SUBTLE, textTransform: "uppercase" }}>Luxury Footwear</span>
              </div>

              <div style={{ padding: "36px 40px 0" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--receipt-muted)", marginBottom: 10 }}>Order confirmed</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "var(--receipt-text)", lineHeight: 1.1, marginBottom: 6 }}>
                  Thank you for your order.
                </h2>
                <p style={{ fontSize: 13, color: "var(--receipt-muted)", lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
                  Your FoxFeet order <strong style={{ color: "var(--receipt-text)" }}>{orderNumber}</strong> has been received and is being carefully prepared by our atelier team. Estimated dispatch is within 3–5 business days.
                </p>

                <div style={{ height: 1, background: "var(--receipt-border)", marginBottom: 28 }} />

                {/* Order items */}
                <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--receipt-muted)", marginBottom: 16 }}>Your Order</p>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--receipt-line)" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <img src={item.img} alt={item.name} style={{ width: 52, height: 52, objectFit: "cover", filter: "sepia(0.1)" }} />
                      <div>
                        <p style={{ fontSize: 14, color: "var(--receipt-text)", fontFamily: "'Cormorant Garamond', serif", marginBottom: 2 }}>{item.name}</p>
                        <p style={{ fontSize: 10, color: "var(--receipt-muted)", letterSpacing: "0.1em" }}>
                          {item.selectedSize ? `Size: ${item.selectedSize} · ` : ""}Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span style={{ color: "var(--receipt-text)", fontSize: 14 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}

                {/* Totals */}
                <div style={{ paddingTop: 20, display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                  {[
                    ["Subtotal", `₹${totalPrice.toLocaleString()}`],
                    ["Shipping", shipping === 0 ? "Free" : `₹${shipping}`],
                    ["Tax", `₹${tax.toLocaleString()}`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--receipt-muted)" }}>
                      <span>{l}</span><span>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, color: "var(--receipt-text)", fontFamily: "'Cormorant Garamond', serif", borderTop: "1px solid var(--receipt-border)", paddingTop: 12, marginTop: 4 }}>
                    <span>Total</span><span style={{ color: "var(--gold-dim)" }}>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer note */}
                <div style={{ background: "var(--receipt-note)", padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, fontSize: 18, marginTop: 1 }}>✦</span>
                  <p style={{ fontSize: 12, color: "var(--receipt-muted)", lineHeight: 1.75, margin: 0 }}>
                    Your boots will be inspected, wrapped in tissue, and placed in a FoxFeet dust bag before dispatch. Questions? Reply to this email or visit our atelier in Bandra West, Mumbai.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={backToShop}
              style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "16px 36px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
              onMouseLeave={e => e.currentTarget.style.background = GOLD}
            >Return to Shop</button>
            <button onClick={() => window.print()}
              style={{ background: "transparent", color: GOLD, border: "1px solid rgba(201,168,76,0.35)", padding: "15px 28px", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}
            >Save Receipt</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page" style={{ minHeight: "100vh", background: WARM_BG, padding: "132px 64px 96px" }}>
      <style>{`
        .checkout-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) 440px; gap: 56px; max-width: 1320px; margin: 0 auto; }
        .checkout-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 980px) {
          .checkout-grid { grid-template-columns: 1fr; gap: 32px; }
          .checkout-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .checkout-shell { padding: 112px 20px 72px !important; }
          .checkout-panel { padding: 28px 22px !important; }
        }
      `}</style>

      <div className="checkout-shell" style={{ maxWidth: 1320, margin: "0 auto" }}>
        <button
          onClick={backToShop}
          style={{ background: "none", border: "none", color: GOLD, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer", marginBottom: 36 }}
        >
          ← Continue Shopping
        </button>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 52, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ width: 40, height: 1, background: GOLD }} />
              <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>Secure Checkout</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 82px)", fontWeight: 300, lineHeight: 0.95, color: CREAM }}>
              Finish the <em style={{ color: GOLD, fontStyle: "italic" }}>fit.</em>
            </h1>
          </div>
          <p style={{ maxWidth: 360, color: MUTED, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            Review your pair, choose delivery, and reserve your FoxFeet order with a polished checkout flow.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <section className="checkout-panel" style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", padding: "56px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: CREAM, marginBottom: 16 }}>Your bag is empty.</h2>
            <p style={{ color: MUTED, marginBottom: 32 }}>Add a pair to begin checkout.</p>
            <button onClick={backToShop} style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "16px 36px", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
              Shop Collection
            </button>
          </section>
        ) : (
          <form className="checkout-grid" onSubmit={handleSubmit}>
            <section className="checkout-panel" style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", padding: "42px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: CREAM, marginBottom: 30 }}>Delivery Details</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div className="checkout-row">
                  <Field label="First Name"><input required style={inputStyle} /></Field>
                  <Field label="Last Name"><input required style={inputStyle} /></Field>
                </div>
                <Field label="Email Address"><input required type="email" style={inputStyle} /></Field>
                <Field label="Street Address"><input required style={inputStyle} /></Field>
                <div className="checkout-row">
                  <Field label="City"><input required style={inputStyle} /></Field>
                  <Field label="Postal Code"><input required style={inputStyle} /></Field>
                </div>
                <div className="checkout-row">
                  <Field label="Country">
                    <select required defaultValue="India" style={inputStyle}>
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>United Arab Emirates</option>
                    </select>
                  </Field>
                  <Field label="Phone"><input required type="tel" style={inputStyle} /></Field>
                </div>
              </div>

              <div style={{ height: 1, background: "rgba(201,168,76,0.1)", margin: "42px 0" }} />

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: CREAM, marginBottom: 24 }}>Delivery Method</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { id: "standard", name: "Standard Atelier Delivery", detail: "5-7 business days", price: "Free" },
                  { id: "express", name: "Express Fitting Dispatch", detail: "2-3 business days", price: "Rs. 399" },
                ].map((option) => (
                  <label key={option.id} style={{ display: "grid", gridTemplateColumns: "24px 1fr auto", gap: 16, alignItems: "center", padding: "18px", border: `1px solid ${delivery === option.id ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.14)"}`, background: delivery === option.id ? "var(--active-bg)" : "var(--inactive-bg)", cursor: "pointer" }}>
                    <input type="radio" name="delivery" checked={delivery === option.id} onChange={() => setDelivery(option.id)} />
                    <span>
                      <span style={{ display: "block", color: CREAM, fontSize: 14 }}>{option.name}</span>
                      <span style={{ display: "block", color: SUBTLE, fontSize: 12, marginTop: 4 }}>{option.detail}</span>
                    </span>
                    <span style={{ color: GOLD, fontSize: 13 }}>{option.price}</span>
                  </label>
                ))}
              </div>

              <div style={{ height: 1, background: "rgba(201,168,76,0.1)", margin: "42px 0" }} />

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, color: CREAM, marginBottom: 24 }}>Payment</h2>
              <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                {["card", "upi", "cod"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayment(method)}
                    style={{ padding: "12px 18px", border: `1px solid ${payment === method ? GOLD : "rgba(201,168,76,0.18)"}`, background: payment === method ? GOLD : "transparent", color: payment === method ? "var(--button-text)" : GOLD, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}
                  >
                    {method === "card" ? "Card" : method === "upi" ? "UPI" : "COD"}
                  </button>
                ))}
              </div>

              {payment === "card" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <Field label="Card Number"><input required style={inputStyle} placeholder="4242 4242 4242 4242" /></Field>
                  <div className="checkout-row">
                    <Field label="Expiry"><input required style={inputStyle} placeholder="MM / YY" /></Field>
                    <Field label="CVC"><input required style={inputStyle} placeholder="123" /></Field>
                  </div>
                </div>
              )}

              {payment === "upi" && <Field label="UPI ID"><input required style={inputStyle} placeholder="name@bank" /></Field>}
              {payment === "cod" && <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.8 }}>Pay at delivery. Our concierge will call to confirm your address before dispatch.</p>}
            </section>

            <aside className="checkout-panel" style={{ background: "var(--bg-panel)", border: "1px solid rgba(201,168,76,0.18)", padding: "34px", alignSelf: "start", position: "sticky", top: 112 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: CREAM }}>Order Summary</h2>
                <button type="button" onClick={openCart} style={{ background: "none", border: "none", color: GOLD, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>Edit Bag</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 30 }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "76px 1fr auto", gap: 16, alignItems: "center" }}>
                    <img src={item.img} alt={item.name} style={{ width: 76, height: 76, objectFit: "cover", filter: "brightness(0.85) sepia(0.08)" }} />
                    <div>
                      <p style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, marginBottom: 4 }}>{item.name}</p>
                      <p style={{ color: SUBTLE, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Qty {item.quantity}</p>
                    </div>
                    <p style={{ color: GOLD, fontSize: 13 }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Items", `${totalItems}`],
                  ["Subtotal", `₹${totalPrice.toLocaleString()}`],
                  ["Shipping", shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`],
                  ["Estimated Tax", `₹${tax.toLocaleString()}`],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", color: label === "Subtotal" ? CREAM : SUBTLE, fontSize: 13 }}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "rgba(201,168,76,0.12)", margin: "8px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ color: CREAM, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>Total</span>
                  <span style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontSize: 34 }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                style={{ width: "100%", marginTop: 30, padding: "18px", border: "none", background: GOLD, color: "var(--button-text)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 500, fontFamily: "'Jost', sans-serif", cursor: "pointer", transition: "background 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_LIGHT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
              >
                Place Order
              </button>

              <p style={{ color: FAINT, fontSize: 11, lineHeight: 1.7, marginTop: 18, textAlign: "center" }}>
                Encrypted checkout. Returns accepted within 14 days of delivery.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
