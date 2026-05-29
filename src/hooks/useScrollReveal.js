import { useEffect, useRef } from "react";

/**
 * useScrollReveal — attach to any section ref to fade+slide it in on scroll.
 * Usage: const ref = useScrollReveal();  →  <section ref={ref}>
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const threshold = options.threshold ?? 0.12;
  const rootMargin = options.rootMargin ?? "0px";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = "opacity 0.85s ease, transform 0.85s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el); // only animate once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
