import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../useCart";
import useScrollReveal from "../hooks/useScrollReveal";
import Toast from "./Toast";
import ProductCard from "./collection/ProductCard";
import ProductModal from "./collection/ProductModal";
import ProductSkeleton from "./collection/ProductSkeleton";
import CompareModal from "./collection/CompareModal";
import {
  COLORS,
  CREAM,
  FAINT,
  FILTERS,
  GOLD,
  MUTED,
  PRICE_RANGES,
  SIZES,
  SKELETON_PRODUCTS,
  SORTS,
  SUBTLE,
  WARM_BG,
  WARM_CARD,
  catalogProducts,
  recommendSize,
} from "../data/catalog";

const collectionStyles = `
  .collection-controls { grid-template-columns: repeat(4, minmax(150px, 1fr)); }
  .skeleton-block {
    display: block;
    overflow: hidden;
    background: linear-gradient(90deg, color-mix(in srgb, var(--gold) 8%, var(--bg-panel)) 0%, color-mix(in srgb, var(--gold) 20%, var(--bg-card)) 45%, color-mix(in srgb, var(--gold) 8%, var(--bg-panel)) 100%);
    background-size: 220% 100%;
    animation: foxfeet-skeleton 1.2s ease-in-out infinite;
  }
  @keyframes foxfeet-skeleton {
    0% { background-position: 120% 0; }
    100% { background-position: -120% 0; }
  }
  @media (max-width: 1180px) {
    .collection-controls,
    .size-recommender { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  }
  @media (max-width: 620px) {
    .collection-controls,
    .size-recommender { grid-template-columns: 1fr !important; }
  }
`;

function useTimedLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timerRef.current);
  }, []);

  const beginLoading = () => {
    clearTimeout(timerRef.current);
    setIsLoading(true);
    timerRef.current = setTimeout(() => setIsLoading(false), 650);
  };

  return [isLoading, beginLoading];
}

function useLocalList(key, initial = []) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
    if (key === "foxfeet-wishlist") window.dispatchEvent(new CustomEvent("foxfeet:wishlist"));
  }, [items, key]);

  return [items, setItems];
}

function CollectionHeader({ sort, setSort, beginLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 52 }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD }}>The Collection</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 64, fontWeight: 300, lineHeight: 0.95, color: CREAM, maxWidth: 480 }}>
          Crafted for the <em style={{ fontStyle: "italic", color: GOLD }}>Discerning</em>
        </h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: FAINT }}>Sort</span>
        <select value={sort} onChange={(event) => { beginLoading(); setSort(event.target.value); }} style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", color: GOLD, padding: "10px 16px", fontSize: 10, fontFamily: "'Jost', sans-serif", letterSpacing: "0.1em", cursor: "pointer", outline: "none" }}>
          {SORTS.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
    </motion.div>
  );
}

function SizeRecommender({ footLength, setFootLength, recommendedSize, onRecommend }) {
  return (
    <form onSubmit={onRecommend} className="size-recommender" style={{ background: "linear-gradient(135deg, var(--bg-panel), var(--bg-card))", border: "1px solid rgba(201,168,76,0.14)", padding: "22px 24px", marginBottom: 28, display: "grid", gridTemplateColumns: "1.3fr minmax(180px, 260px) auto minmax(180px, 240px)", gap: 16, alignItems: "center" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ color: GOLD, fontSize: 18 }}>✦</span>
          <span style={{ color: GOLD, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase" }}>AI Size Recommender</span>
        </div>
        <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, margin: 0 }}>Enter foot length in centimeters. We will map it to a UK boot size and filter available pairs.</p>
      </div>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD }}>Foot Length</span>
        <input type="number" min="23" max="31" step="0.1" value={footLength} onChange={(event) => setFootLength(event.target.value)} placeholder="27 cm" style={{ width: "100%", background: "var(--field-bg)", border: "1px solid var(--field-border)", color: CREAM, padding: "12px 14px", fontSize: 13, fontFamily: "'Jost', sans-serif", outline: "none" }} />
      </label>

      <button type="submit" style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "14px 22px", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", fontWeight: 500, cursor: "pointer" }}>Recommend</button>

      <div style={{ border: "1px solid rgba(201,168,76,0.16)", background: "var(--inactive-bg)", padding: "14px 16px", minHeight: 66, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{ color: SUBTLE, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>Recommended Size</span>
        <strong style={{ color: recommendedSize ? GOLD : MUTED, fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, lineHeight: 1 }}>{recommendedSize || "Enter length"}</strong>
      </div>
    </form>
  );
}

function AdvancedFilters({ filter, setFilter, priceRange, setPriceRange, color, setColor, size, setSize, beginLoading }) {
  const selectStyle = { background: "var(--field-bg)", border: "1px solid var(--field-border)", color: CREAM, padding: "12px 14px", fontSize: 12, fontFamily: "'Jost', sans-serif", outline: "none" };
  const update = (setter) => (event) => { beginLoading(); setter(event.target.value); };

  return (
    <div className="collection-controls" style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.12)", padding: "24px", marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(4, minmax(150px, 1fr))", gap: 12, alignItems: "end" }}>
      {[
        ["Category", filter, update(setFilter), FILTERS],
        ["Price", priceRange, update(setPriceRange), PRICE_RANGES.map((range) => range.label)],
        ["Color", color, update(setColor), COLORS],
        ["Size", size, update(setSize), ["All Sizes", ...SIZES]],
      ].map(([label, value, onChange, options]) => (
        <label key={label} style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD }}>{label}</span>
          <select value={value} onChange={onChange} style={selectStyle}>
            {options.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      ))}
    </div>
  );
}

function CategoryTabs({ filter, setFilter, wishlistCount, beginLoading }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 34, flexWrap: "wrap" }}>
      {FILTERS.map((item) => (
        <button key={item} onClick={() => { beginLoading(); setFilter(item); }} style={{ padding: "10px 22px", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer", transition: "all 0.3s", background: filter === item ? GOLD : "transparent", color: filter === item ? "var(--button-text)" : SUBTLE, border: `1px solid ${filter === item ? GOLD : "rgba(201,168,76,0.18)"}` }}>
          {item}
        </button>
      ))}
      {wishlistCount > 0 && <span style={{ marginLeft: "auto", fontSize: 10, color: FAINT, alignSelf: "center" }}>{wishlistCount} saved</span>}
    </div>
  );
}

function CompareBar({ compareIds, compareProducts, openCompare, clearCompare }) {
  if (compareIds.length === 0) return null;
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto 24px", background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <p style={{ margin: 0, color: MUTED, fontSize: 12 }}>
        <span style={{ color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 9 }}>Compare</span>{" "}
        {compareProducts.map((product) => product.name).join(" / ")}
        {compareIds.length === 1 ? " / choose one more boot" : ""}
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" disabled={compareIds.length < 2} onClick={openCompare} style={{ background: compareIds.length === 2 ? GOLD : "transparent", color: compareIds.length === 2 ? "var(--button-text)" : SUBTLE, border: "1px solid rgba(201,168,76,0.28)", padding: "10px 14px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: compareIds.length === 2 ? "pointer" : "not-allowed" }}>View Table</button>
        <button type="button" onClick={clearCompare} style={{ background: "transparent", color: SUBTLE, border: "1px solid rgba(201,168,76,0.18)", padding: "10px 14px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>Clear</button>
      </div>
    </div>
  );
}

function ProductGrid({ isLoading, filtered, wishlist, compareIds, handleOpenProduct, toggleWishlist, toggleCompare }) {
  return (
    <motion.div
      className="product-grid"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 320px))", justifyContent: "center", gap: 24, maxWidth: 1400, margin: "0 auto" }}
    >
      {isLoading ? SKELETON_PRODUCTS.map((item) => <ProductSkeleton key={item} />) : filtered.length > 0 ? filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenModal={handleOpenProduct}
          isSaved={wishlist.includes(product.id)}
          onToggleWishlist={toggleWishlist}
          isCompared={compareIds.includes(product.id)}
          onToggleCompare={toggleCompare}
          compareDisabled={compareIds.length >= 2}
        />
      )) : (
        <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "68px 24px", border: "1px solid rgba(201,168,76,0.14)", background: WARM_CARD, maxWidth: 620, width: "100%", justifySelf: "center" }}>
          <p style={{ color: GOLD, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14 }}>No pairs found.</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: CREAM, fontSize: 36, fontWeight: 300, marginBottom: 10 }}>Try another size, tone, or category.</h3>
          <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, margin: "0 auto", maxWidth: 380 }}>Adjust the filters above or clear the navbar search to reveal more FoxFeet pairs.</p>
        </div>
      )}
    </motion.div>
  );
}

function ProductRail({ title, heading, items, onOpen, onClear, onRemove, className, saved }) {
  if (items.length === 0) return null;
  return (
    <section style={{ maxWidth: 1400, margin: "56px auto 0", borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 18, marginBottom: 18, flexWrap: "wrap" }}>
        <div>
          <p style={{ color: GOLD, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 8 }}>{title}</p>
          <h3 style={{ color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, margin: 0 }}>{heading}</h3>
        </div>
        {onClear ? <button type="button" onClick={onClear} style={{ background: "transparent", color: SUBTLE, border: "1px solid rgba(201,168,76,0.18)", padding: "10px 14px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>Clear</button> : <p style={{ color: FAINT, fontSize: 11, margin: 0 }}>{items.length} saved on this device</p>}
      </div>

      <div className={className} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14 }}>
        {items.map((item) => saved ? (
          <div key={item.id} style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", overflow: "hidden" }}>
            <button type="button" onClick={() => onOpen(item)} style={{ width: "100%", background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", filter: "brightness(0.86) contrast(1.05) sepia(0.12)" }} />
              <span style={{ display: "block", padding: "16px 16px 6px" }}>
                <strong style={{ display: "block", color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, lineHeight: 1.05 }}>{item.name}</strong>
                <span style={{ display: "block", color: GOLD, fontSize: 10, marginTop: 6 }}>₹{item.price.toLocaleString()} / {item.color}</span>
              </span>
            </button>
            <button type="button" onClick={() => onRemove(item.id)} style={{ margin: "8px 16px 16px", width: "calc(100% - 32px)", background: "transparent", color: SUBTLE, border: "1px solid rgba(201,168,76,0.2)", padding: "10px 12px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}>Remove</button>
          </div>
        ) : (
          <button key={item.id} type="button" onClick={() => onOpen(item)} style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.14)", padding: 0, display: "grid", gridTemplateColumns: "74px 1fr", gap: 14, alignItems: "center", textAlign: "left", overflow: "hidden", cursor: "pointer" }}>
            <img src={item.img} alt={item.name} style={{ width: 74, height: 82, objectFit: "cover", filter: "brightness(0.86) contrast(1.05) sepia(0.12)" }} />
            <span style={{ paddingRight: 12 }}>
              <strong style={{ display: "block", color: CREAM, fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, lineHeight: 1.05 }}>{item.name}</strong>
              <span style={{ display: "block", color: GOLD, fontSize: 10, marginTop: 6 }}>₹{item.price.toLocaleString()}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function filterProducts({ search, filter, selectedPriceRange, color, size, sort }) {
  let filtered = catalogProducts.filter((product) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [product.name, product.subtitle, product.tag, product.category, product.color, product.color === "Black" ? "midnight obsidian" : "", product.color === "Tan" ? "tan sand camel" : "", product.description].join(" ").toLowerCase().includes(query);
    const matchesCategory = filter === "All" || product.category === filter.toLowerCase();
    const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    const matchesColor = color === "All Colors" || product.color === color;
    const matchesSize = size === "All Sizes" || product.availableSizes.includes(size);
    return matchesSearch && matchesCategory && matchesPrice && matchesColor && matchesSize;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}

export default function Featured({ search = "" }) {
  const { addToCart } = useCart();
  const sectionRef = useScrollReveal();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [color, setColor] = useState("All Colors");
  const [size, setSize] = useState("All Sizes");
  const [footLength, setFootLength] = useState("");
  const [recommendedSize, setRecommendedSize] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [wishlist, setWishlist] = useLocalList("foxfeet-wishlist", []);
  const [recentlyViewed, setRecentlyViewed] = useLocalList("foxfeet-recently-viewed", []);
  const [isLoading, beginLoading] = useTimedLoading();

  const selectedPriceRange = PRICE_RANGES.find((range) => range.label === priceRange) || PRICE_RANGES[0];
  const filtered = useMemo(() => filterProducts({ search, filter, selectedPriceRange, color, size, sort }), [search, filter, selectedPriceRange, color, size, sort]);
  const compareProducts = compareIds.map((id) => catalogProducts.find((product) => product.id === id)).filter(Boolean);
  const savedProducts = wishlist.map((id) => catalogProducts.find((product) => product.id === id)).filter(Boolean);
  const allFiltersClear = !search.trim() && filter === "All" && priceRange === "Any Price" && color === "All Colors" && size === "All Sizes";
  const resultText = allFiltersClear ? `${filtered.length} pairs found` : `${filtered.length} pair${filtered.length === 1 ? "" : "s"} match your search`;

  const showToast = (name, selectedSize) => setToast({ visible: true, message: `${name} (${selectedSize}) added to bag` });
  const handleModalAdd = (product) => {
    addToCart(product);
    showToast(product.name, product.selectedSize);
  };
  const toggleWishlist = (id) => setWishlist((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  const handleOpenProduct = (product) => {
    setModalProduct(product);
    setRecentlyViewed((current) => [product, ...current.filter((item) => item.id !== product.id)].slice(0, 4));
  };
  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
      return;
    }
    if (compareIds.length >= 2) return;
    const next = [...compareIds, id];
    setCompareIds(next);
    if (next.length === 2) setCompareOpen(true);
  };
  const handleSizeRecommend = (event) => {
    event.preventDefault();
    beginLoading();
    const nextSize = recommendSize(Number(footLength));
    setRecommendedSize(nextSize);
    if (nextSize) setSize(nextSize);
  };

  return (
    <>
      <section id="collection" ref={sectionRef} className="section-pad" style={{ background: WARM_BG, padding: "120px 64px" }}>
        <style>{collectionStyles}</style>
        <CollectionHeader sort={sort} setSort={setSort} beginLoading={beginLoading} />
        <SizeRecommender footLength={footLength} setFootLength={setFootLength} recommendedSize={recommendedSize} onRecommend={handleSizeRecommend} />
        <AdvancedFilters filter={filter} setFilter={setFilter} priceRange={priceRange} setPriceRange={setPriceRange} color={color} setColor={setColor} size={size} setSize={setSize} beginLoading={beginLoading} />
        <CategoryTabs filter={filter} setFilter={setFilter} wishlistCount={wishlist.length} beginLoading={beginLoading} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, margin: "0 auto 20px", maxWidth: 1400, flexWrap: "wrap" }}>
          <p style={{ margin: 0, color: GOLD, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>{isLoading ? "Finding pairs..." : resultText}</p>
        </div>

        <CompareBar compareIds={compareIds} compareProducts={compareProducts} openCompare={() => setCompareOpen(true)} clearCompare={() => setCompareIds([])} />
        <ProductGrid isLoading={isLoading} filtered={filtered} wishlist={wishlist} compareIds={compareIds} handleOpenProduct={handleOpenProduct} toggleWishlist={toggleWishlist} toggleCompare={toggleCompare} />
        <ProductRail title="Saved Collection" heading="Your selected pairs." items={savedProducts} onOpen={handleOpenProduct} onRemove={toggleWishlist} className="saved-collection-grid" saved />
        <ProductRail title="Recently Viewed" heading="Revisit your short list." items={recentlyViewed} onOpen={handleOpenProduct} onClear={() => setRecentlyViewed([])} className="recently-viewed-grid" />
      </section>

      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={(product) => { handleModalAdd(product); setModalProduct(null); }} />}
      {compareOpen && compareProducts.length === 2 && <CompareModal products={compareProducts} onClose={() => setCompareOpen(false)} onClear={() => { setCompareIds([]); setCompareOpen(false); }} />}
      <Toast message={toast.message} visible={toast.visible} onHide={() => setToast((current) => ({ ...current, visible: false }))} />
    </>
  );
}
