import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useScrollReveal from "../hooks/useScrollReveal";
import { loadStoredReviews, saveStoredReview } from "../lib/reviewStore";

const GOLD = "var(--gold)";
const WARM_BG = "var(--bg-main)";
const WARM_CARD = "var(--bg-card)";
const CREAM = "var(--text-main)";
const MUTED = "var(--text-muted)";
const SUBTLE = "var(--text-subtle)";

const trustStats = [
  ["4.9/5", "Customer rating"],
  ["10,000+", "Pairs sold"],
  ["14 days", "Fit adjustment"],
  ["100%", "Leather uppers"],
];

const baseReviews = [
  {
    rating: 5,
    quote: "The Chelsea Boot feels built properly, not styled loudly.",
    byline: "Aryan M. / Entrepreneur, Delhi / 18 months worn",
  },
  {
    rating: 5,
    quote: "The Moc Toe Work Boot broke in beautifully and still holds its shape.",
    byline: "Priya K. / Creative Director, Mumbai / 3 years worn",
  },
  {
    rating: 5,
    quote: "The Service Boot has that rare balance: rugged, clean, and easy to dress up.",
    byline: "Rohan S. / Architect, Bangalore / 11 months worn",
  },
];

export default function Testimonials() {
  const sectionRef = useScrollReveal();
  const [activeReview, setActiveReview] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const pauseUntilRef = useRef(0);
  const reviews = [...baseReviews, ...userReviews];

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    let mounted = true;

    loadStoredReviews().then((storedReviews) => {
      if (mounted) setUserReviews(storedReviews);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const moveReview = (direction) => {
    pauseUntilRef.current = Date.now() + 5000;
    setActiveReview((current) => {
      const next = current + direction;
      if (next < 0) return reviews.length - 1;
      if (next >= reviews.length) return 0;
      return next;
    });
  };

  const review = reviews[activeReview];

  const submitReview = async (event) => {
    event.preventDefault();
    if (!reviewText.trim()) return;

    const createdReview = await saveStoredReview({
      rating: reviewRating,
      quote: reviewText.trim(),
      byline: `${reviewName.trim() || "FoxFeet Customer"} / Verified fit review`,
      created_at: new Date().toISOString(),
    });

    setUserReviews((current) => [createdReview, ...current]);
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
    setActiveReview(baseReviews.length);
    pauseUntilRef.current = Date.now() + 5000;
  };

  return (
    <section
      className="voices-section section-pad"
      ref={sectionRef}
      style={{ background: WARM_BG, padding: "52px 64px" }}
    >
      <style>{`
        .trust-panel {
          display: grid;
          grid-template-columns: 0.95fr 1.55fr;
          gap: 18px;
          max-width: 1300px;
          margin: 0 auto;
        }

        .trust-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .review-arrows {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }

        .review-arrow {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          background: transparent;
          color: ${GOLD};
          border: 1px solid rgba(201,168,76,0.28);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .review-arrow:hover {
          background: ${GOLD};
          color: var(--button-text);
          border-color: ${GOLD};
        }

        .review-form {
          display: grid;
          grid-template-columns: minmax(140px, 0.8fr) minmax(220px, 1.4fr) auto;
          gap: 10px;
          align-items: end;
          max-width: 1300px;
          margin: 16px auto 0;
          background: ${WARM_CARD};
          border: 1px solid rgba(201,168,76,0.12);
          padding: 16px;
        }

        .rating-picker {
          display: flex;
          gap: 2px;
        }

        @media (max-width: 980px) {
          .trust-panel {
            grid-template-columns: 1fr;
          }

          .trust-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .review-form {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .trust-stats {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      <motion.div
        className="trust-panel"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            background: WARM_CARD,
            border: "1px solid rgba(201,168,76,0.12)",
            padding: "24px 28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <span style={{ width: 34, height: 1, background: GOLD }} />
            <span style={{ color: GOLD, fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase" }}>
              Trusted Fit
            </span>
          </div>
          <p
            key={review.quote}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: CREAM,
              fontSize: "clamp(24px, 2.4vw, 34px)",
              lineHeight: 1.18,
              fontStyle: "italic",
              margin: "0 0 12px",
              transition: "opacity 0.25s ease",
            }}
          >
            "{review.quote}"
          </p>
          <div style={{ color: GOLD, fontSize: 13, letterSpacing: "0.12em", marginBottom: 8 }}>
            {"★".repeat(review.rating || 5)}
          </div>
          <p style={{ color: MUTED, fontSize: 12, lineHeight: 1.7, margin: 0 }}>
            {review.byline}
          </p>
          <div className="review-arrows" aria-label="Review controls">
            <button
              type="button"
              className="review-arrow"
              onClick={() => moveReview(-1)}
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              type="button"
              className="review-arrow"
              onClick={() => moveReview(1)}
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

        <div className="trust-stats">
          {trustStats.map(([value, label]) => (
            <div
              key={label}
              style={{
                background: WARM_CARD,
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "22px 20px",
                minHeight: 108,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  color: GOLD,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 30,
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                {value}
              </div>
              <div style={{ color: SUBTLE, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.form
        className="review-form"
        onSubmit={submitReview}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <label style={{ display: "grid", gap: 7 }}>
          <span style={{ color: GOLD, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Name</span>
          <input
            value={reviewName}
            onChange={(event) => setReviewName(event.target.value)}
            placeholder="Your name"
            style={{ background: "var(--field-bg)", border: "1px solid var(--field-border)", color: CREAM, padding: "12px 13px", fontSize: 12, fontFamily: "'Jost', sans-serif", outline: "none" }}
          />
        </label>

        <label style={{ display: "grid", gap: 7 }}>
          <span style={{ color: GOLD, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Review</span>
          <input
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="How did your pair feel?"
            style={{ background: "var(--field-bg)", border: "1px solid var(--field-border)", color: CREAM, padding: "12px 13px", fontSize: 12, fontFamily: "'Jost', sans-serif", outline: "none" }}
          />
        </label>

        <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
          <div className="rating-picker" aria-label="Review rating">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setReviewRating(rating)}
                aria-label={`${rating} star review`}
                style={{ background: "transparent", border: "none", color: rating <= reviewRating ? GOLD : SUBTLE, fontSize: 18, cursor: "pointer", padding: 0 }}
              >
                ★
              </button>
            ))}
          </div>
          <button type="submit" style={{ background: GOLD, color: "var(--button-text)", border: "none", padding: "12px 16px", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Jost', sans-serif", cursor: "pointer" }}>
            Submit
          </button>
        </div>
      </motion.form>
    </section>
  );
}
