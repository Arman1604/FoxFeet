import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Featured from "./components/Featured";
import Craft from "./components/Craft";
import Atelier from "./components/Atelier";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./components/Checkout";
import PwaInstallPrompt from "./components/PwaInstallPrompt";
import WishlistDrawer from "./components/WishlistDrawer";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("foxfeet-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("foxfeet-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleSearch = (event) => setProductSearch(event.detail || "");
    window.addEventListener("foxfeet:search", handleSearch);
    return () => window.removeEventListener("foxfeet:search", handleSearch);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const goToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckout(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToShop = () => {
    setIsCheckout(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Navbar
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {isCheckout ? (
        <Checkout
          backToShop={backToShop}
          openCart={() => setIsCartOpen(true)}
        />
      ) : (
        <>
          <Hero />
          <Marquee />
          <Testimonials />
          <Featured search={productSearch} />
          <Craft />
          <Atelier />
          <Newsletter />
          <Contact />
          <Footer />
        </>
      )}

      <CartSidebar
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        onCheckout={goToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <PwaInstallPrompt />
    </div>
  );
}
