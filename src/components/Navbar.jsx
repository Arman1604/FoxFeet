import { useCart } from "../useCart";
import { useEffect, useState } from "react";

const GOLD = "var(--gold)";
const CREAM = "var(--text-main)";
const MUTED = "var(--text-muted)";

const links = [
  { label: "Home", href: "#hero-section" },
  { label: "Collection", href: "#collection" },
  { label: "Craft", href: "#craft" },
  { label: "Atelier", href: "#atelier" },
  { label: "Contact", href: "#contact" },
];

const searchOptions = [
  "Chelsea Boot",
  "Chelsea Classic",
  "Chukka Boot",
  "Service Boot",
  "Cap-Toe Boot",
  "Moc Toe Work Boot",
  "Jodhpur Boot",
  "Desert Boot",
  "Hiking Boot",
  "Combat Boot",
  "Engineer Boot",
  "Western Boot",
  "Wingtip Brogue Boot",
];

export default function Navbar({ openCart, openWishlist, productSearch, setProductSearch, theme, toggleTheme }) {
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);
  const suggestions = searchOptions
    .filter((option) => option.toLowerCase().includes(productSearch.trim().toLowerCase()))
    .slice(0, 5);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const syncWishlist = () => {
      try {
        setWishlistCount(JSON.parse(localStorage.getItem("foxfeet-wishlist"))?.length || 0);
      } catch {
        setWishlistCount(0);
      }
    };

    syncWishlist();
    window.addEventListener("storage", syncWishlist);
    window.addEventListener("foxfeet:wishlist", syncWishlist);
    return () => {
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("foxfeet:wishlist", syncWishlist);
    };
  }, []);

  const chooseSuggestion = (suggestion) => {
    setProductSearch(suggestion);
    setSuggestionsOpen(false);
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="site-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "28px 64px",
          transition: "all 0.4s ease",
          background: scrolled || menuOpen ? "var(--nav-bg)" : "var(--nav-gradient)",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(201,168,76,0.12)" : "none",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <div className="site-logo" style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase" }}>FoxFeet</span>
          <span style={{ fontSize: 8, letterSpacing: "0.55em", color: MUTED, textTransform: "uppercase", marginTop: 2 }}>Luxury Footwear</span>
        </div>

        {/* Desktop links */}
        <ul className="site-links" style={{ display: "flex", gap: 44, listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(link => (
            <li key={link.label}>
              <a href={link.href} style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-soft)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "var(--text-soft)"}
              >{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label className="nav-search" style={{ position: "relative", display: "block" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: GOLD,
                fontSize: 13,
                pointerEvents: "none",
              }}
            >
              ⌕
            </span>
            <input
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              onFocus={() => {
                setSuggestionsOpen(true);
                if (window.location.hash !== "#collection") {
                  document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 120)}
              placeholder="Search boots"
              aria-label="Search boots"
              style={{
                width: 190,
                background: "color-mix(in srgb, var(--bg-card) 72%, transparent)",
                border: "1px solid rgba(201,168,76,0.25)",
                color: CREAM,
                padding: "10px 12px 10px 34px",
                fontSize: 11,
                fontFamily: "'Jost', sans-serif",
                letterSpacing: "0.08em",
                outline: "none",
                backdropFilter: "blur(8px)",
              }}
            />
            {suggestionsOpen && productSearch.trim() && suggestions.length > 0 && (
              <div
                className="nav-search-suggestions"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  zIndex: 120,
                  background: "var(--bg-card)",
                  border: "1px solid rgba(201,168,76,0.24)",
                  boxShadow: "var(--shadow-card)",
                  overflow: "hidden",
                }}
              >
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => chooseSuggestion(suggestion)}
                    style={{
                      width: "100%",
                      display: "block",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(201,168,76,0.08)",
                      color: CREAM,
                      padding: "11px 13px",
                      textAlign: "left",
                      fontSize: 12,
                      fontFamily: "'Jost', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </label>

          <button
            className="nav-wishlist-link"
            type="button"
            onClick={openWishlist}
            aria-label={`Wishlist with ${wishlistCount} saved items`}
            title={`Wishlist (${wishlistCount})`}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              color: GOLD,
              border: "1px solid rgba(201,168,76,0.24)",
              background: "color-mix(in srgb, var(--bg-card) 58%, transparent)",
              fontSize: 18,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ♡
            {wishlistCount > 0 && (
              <span style={{ position: "absolute", top: -8, right: -8, width: 18, height: 18, background: GOLD, borderRadius: "50%", fontSize: 9, color: "var(--button-text)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            className="nav-theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            style={{
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              background: "color-mix(in srgb, var(--bg-card) 68%, transparent)",
              color: GOLD,
              border: "1px solid rgba(201,168,76,0.32)",
              fontSize: 18,
              lineHeight: 1,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>

          <button
            className="site-cart-button"
            onClick={openCart}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "1px solid rgba(201,168,76,0.4)", color: GOLD, padding: "10px 24px", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Jost', sans-serif", transition: "all 0.3s", position: "relative" }}
            onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "var(--button-text)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = GOLD; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            Bag
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -8, right: -8, width: 18, height: 18, background: GOLD, borderRadius: "50%", fontSize: 9, color: "var(--button-text)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="hamburger-btn"
            style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 24, height: 1.5, background: GOLD, transition: "all 0.3s ease",
                transform: menuOpen ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "scaleX(0)") : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 90,
        background: "var(--nav-bg)", backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}>
        {links.map((link, i) => (
          <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 10vw, 58px)",
              fontWeight: 300, color: CREAM, textDecoration: "none",
              letterSpacing: "0.06em", padding: "12px 0",
              borderBottom: i < links.length - 1 ? "1px solid rgba(201,168,76,0.08)" : "none",
              width: "55%", textAlign: "center", transition: "color 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = CREAM}
          >{link.label}</a>
        ))}
        <p style={{ marginTop: 52, fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(201,168,76,0.45)" }}>
          Luxury Footwear since 2008
        </p>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .site-links { display: none !important; }
          .nav-actions { margin-left: auto; flex-wrap: wrap; justify-content: flex-end; max-width: 100%; }
          .nav-search { order: 2; width: 100%; }
          .nav-search input { width: 100% !important; }
          .nav-search-suggestions { width: 100%; }
          .nav-wishlist-link { width: 38px !important; height: 38px !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
