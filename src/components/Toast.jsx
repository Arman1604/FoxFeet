import { useEffect } from "react";

const GOLD = "var(--gold)";

export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onHide, 2800);
    return () => clearTimeout(t);
  }, [visible, onHide]);

  return (
    <div style={{
      position: "fixed", bottom: 36, left: "50%",
      transform: `translateX(-50%) translateY(${visible ? 0 : 24}px)`,
      opacity: visible ? 1 : 0,
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      zIndex: 9999,
      background: "var(--bg-card)",
      border: "1px solid rgba(201,168,76,0.45)",
      padding: "16px 28px",
      display: "flex", alignItems: "center", gap: 14,
      pointerEvents: "none",
      boxShadow: "var(--shadow-soft)",
    }}>
      <span style={{ color: GOLD, fontSize: 16 }}>✓</span>
      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-main)" }}>
        {message}
      </span>
    </div>
  );
}
