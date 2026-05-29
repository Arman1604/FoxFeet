import { motion } from "framer-motion";

const GOLD = "var(--gold)";
const CREAM = "var(--text-main)";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

  #hero-section {
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    background-color: var(--bg-main);
    isolation: isolate;
  }

  #hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% center;
    filter: brightness(1.05) contrast(1.25);
    transform: scale(1.05);
    z-index: 0;
    transition: filter 0.35s ease, opacity 0.35s ease;
  }

  #hero-shade-left {
    position: absolute;
    inset: 0;
    background: var(--hero-left-shade);
    z-index: 1;
  }

  #hero-shade-bottom {
    position: absolute;
    inset: 0;
    background: var(--hero-bottom-shade);
    z-index: 1;
  }

  #hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 40px 28px 56px;
  }

  #hero-content::before {
    content: "";
    position: absolute;
    inset: -26px -22px -30px;
    background: transparent;
    z-index: -1;
    pointer-events: none;
  }

  .hero-label {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .hero-label-line {
    width: 40px;
    height: 1px;
    background: ${GOLD};
    flex-shrink: 0;
  }

  .hero-label-text {
    font-size: 10px;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: ${GOLD};
  }

  .hero-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(58px, 15vw, 115px);
    font-weight: 300;
    line-height: 0.88;
    margin: 0 0 28px;
  }

  .hero-heading-plain {
    display: block;
    color: ${CREAM};
    text-shadow: 0 2px 28px rgba(0,0,0,0.24);
  }

  .hero-heading-italic {
    display: block;
    color: ${GOLD};
    font-style: italic;
    text-shadow: 0 2px 24px rgba(0,0,0,0.2);
  }

  .hero-desc {
    font-size: 14px;
    color: var(--text-soft);
    line-height: 1.85;
    max-width: 340px;
    margin-bottom: 40px;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .hero-stats-strip {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 42px;
    max-width: 460px;
  }

  .hero-stat {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 18px;
    border-top: 1px solid color-mix(in srgb, ${GOLD} 28%, transparent);
    padding-top: 14px;
  }

  .hero-stat strong {
    color: ${CREAM};
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    line-height: 1;
  }

  .hero-stat span {
    color: var(--text-soft);
    font-size: 9px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-align: right;
  }

  .hero-btn-primary {
    display: inline-block;
    padding: 16px 44px;
    background: ${GOLD};
    color: var(--button-text);
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 18px 48px rgba(0,0,0,0.2);
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }

  .hero-btn-primary:active {
    transform: scale(0.97);
    background: var(--gold-light);
  }

  .hero-btn-secondary {
    color: ${CREAM};
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    opacity: 0.9;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    border-bottom: 1px solid color-mix(in srgb, ${GOLD} 42%, transparent);
    padding-bottom: 6px;
    transition: color 0.3s ease, border-color 0.3s ease;
  }

  .hero-btn-secondary:hover {
    color: ${GOLD};
    border-color: ${GOLD};
  }

  [data-theme="light"] #hero-section {
    background:
      linear-gradient(90deg, var(--bg-main) 0%, var(--bg-section) 58%, var(--bg-main) 100%);
  }

  [data-theme="light"] #hero-image {
    opacity: 0.9;
    filter: brightness(1.02) contrast(1.08) saturate(0.9) sepia(0.08);
    object-position: 76% center;
  }

  [data-theme="light"] #hero-shade-left {
    background:
      linear-gradient(
        90deg,
        rgba(245,239,224,0.96) 0%,
        rgba(245,239,224,0.86) 30%,
        rgba(245,239,224,0.38) 49%,
        rgba(245,239,224,0.1) 70%,
        transparent 100%
      );
  }

  [data-theme="light"] #hero-shade-bottom {
    background:
      linear-gradient(
        0deg,
        rgba(245,239,224,0.72) 0%,
        rgba(245,239,224,0.16) 26%,
        transparent 66%
      );
  }

  [data-theme="light"] #hero-content::before {
    display: none;
  }

  [data-theme="light"] .hero-heading-plain {
    color: var(--text-primary);
    text-shadow: none;
  }

  [data-theme="light"] .hero-heading-italic {
    color: var(--gold-dim);
    text-shadow: none;
  }

  [data-theme="light"] .hero-desc {
    color: var(--text-subtle);
    font-weight: 400;
    max-width: 410px;
  }

  [data-theme="light"] .hero-btn-primary {
    box-shadow: 0 18px 44px rgba(80,55,20,0.18);
  }

  [data-theme="light"] .hero-btn-secondary {
    color: var(--text-primary);
    opacity: 1;
  }

  [data-theme="light"] .hero-stat strong {
    color: var(--text-primary);
  }

  [data-theme="light"] .hero-stat span {
    color: var(--text-subtle);
  }

  [data-theme="light"] .hero-label-text {
    color: var(--gold-dim);
  }

  [data-theme="light"] .hero-label-line {
    background: var(--gold-dim);
  }

  /* Tablet and up */
  @media (min-width: 640px) {
    #hero-section {
      align-items: center;
    }

    #hero-image {
      object-position: 72% center;
    }

    #hero-shade-bottom {
      background: var(--hero-bottom-shade-wide);
    }

    #hero-content {
      padding: clamp(80px, 10vw, 120px) clamp(40px, 8vw, 90px);
      max-width: 700px;
      width: auto;
    }

    #hero-content::before {
      inset: -42px -46px -48px -38px;
    }

    .hero-label {
      margin-bottom: 40px;
    }

    .hero-label-line {
      width: 70px;
    }

    .hero-label-text {
      font-size: 11px;
    }

    .hero-heading {
      margin: 0 0 50px;
    }

    .hero-desc {
      font-size: 16px;
      max-width: 450px;
      margin-bottom: 60px;
    }

    .hero-buttons {
      flex-direction: row;
      align-items: center;
      gap: 40px;
    }

    .hero-stats-strip {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 22px;
      margin-top: 58px;
      max-width: 560px;
    }

    .hero-stat {
      display: block;
      min-height: 72px;
    }

    .hero-stat strong {
      display: block;
      font-size: 34px;
      margin-bottom: 9px;
    }

    .hero-stat span {
      display: block;
      text-align: left;
    }

    .hero-btn-primary {
      font-size: 11px;
      padding: 18px 50px;
    }

    .hero-btn-secondary {
      font-size: 11px;
    }

    .hero-btn-primary:hover {
      transform: translateY(-4px);
      background: var(--gold-light);
      box-shadow: 0 24px 60px rgba(0,0,0,0.26);
    }

    .hero-btn-primary:active {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 639px) {
    #hero-section {
      min-height: 100svh;
      align-items: flex-end;
    }

    #hero-image {
      object-position: 70% center;
      filter: brightness(0.82) contrast(1.18) saturate(0.95);
    }

    #hero-content {
      padding: 132px 18px 34px;
    }

    .hero-label {
      margin-bottom: 22px;
    }

    .hero-heading {
      font-size: clamp(54px, 17vw, 76px);
      line-height: 0.92;
      margin-bottom: 22px;
    }

    .hero-desc {
      max-width: 315px;
      margin-bottom: 32px;
      font-size: 14px;
      line-height: 1.75;
    }

    .hero-btn-primary,
    .hero-btn-secondary {
      width: 100%;
      text-align: center;
    }

    .hero-stats-strip {
      margin-top: 36px;
      gap: 10px;
    }

    [data-theme="light"] #hero-image {
      opacity: 0.42;
      object-position: 72% center;
    }

    [data-theme="light"] #hero-shade-left {
      background: linear-gradient(90deg, rgba(245,239,224,0.98) 0%, rgba(245,239,224,0.74) 54%, rgba(245,239,224,0.28) 100%);
    }

    [data-theme="light"] #hero-shade-bottom {
      background: linear-gradient(0deg, rgba(245,239,224,1) 0%, rgba(245,239,224,0.76) 42%, transparent 80%);
    }
  }

`;

export default function Hero() {
  return (
    <>
      <style>{styles}</style>
      <section id="hero-section" aria-label="FOXFEET home">

        <motion.img
          id="hero-image"
          src="/assets/hero/hero.png"
          alt="Luxury leather boot from the 2026 collection"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div aria-hidden="true" id="hero-shade-left" />
        <div aria-hidden="true" id="hero-shade-bottom" />

        <motion.div
          id="hero-content"
          initial={{ opacity: 0, y: 54 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-label">
            <span aria-hidden="true" className="hero-label-line" />
            <span className="hero-label-text">New Collection — 2026</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-plain">Made For</span>
            <span className="hero-heading-italic">Those Who</span>
            <span className="hero-heading-plain">Lead.</span>
          </h1>

          <p className="hero-desc">
            Crafted from full-grain leather and shaped by tradition — designed
            for those who refuse to choose between beauty and endurance.
          </p>

          <div className="hero-buttons">
            <a href="#collection" className="hero-btn-primary">
              Shop Collection
            </a>
            <a href="#craft" className="hero-btn-secondary">
              Our Craft →
            </a>
          </div>

          <div className="hero-stats-strip" aria-label="FOXFEET highlights">
            <div className="hero-stat">
              <strong>10,000+</strong>
              <span>Pairs Sold</span>
            </div>
            <div className="hero-stat">
              <strong>4.9★</strong>
              <span>Rating</span>
            </div>
            <div className="hero-stat">
              <strong>100%</strong>
              <span>Leather</span>
            </div>
          </div>
        </motion.div>

      </section>
    </>
  );
}
