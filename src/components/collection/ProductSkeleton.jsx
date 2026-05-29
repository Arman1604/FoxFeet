import { WARM_CARD } from "../../data/catalog";

export default function ProductSkeleton() {
  return (
    <div aria-hidden="true" style={{ background: WARM_CARD, border: "1px solid rgba(201,168,76,0.12)", overflow: "hidden" }}>
      <div style={{ aspectRatio: "4 / 5", background: "var(--image-panel)", padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span className="skeleton-block" style={{ width: 86, height: 26 }} />
        <span className="skeleton-block" style={{ width: "54%", height: 18, alignSelf: "center" }} />
      </div>

      <div style={{ padding: "24px 24px 28px", display: "grid", gap: 13 }}>
        <span className="skeleton-block" style={{ width: "68%", height: 25 }} />
        <span className="skeleton-block" style={{ width: "86%", height: 12 }} />
        <span className="skeleton-block" style={{ width: "42%", height: 12 }} />
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className="skeleton-block" style={{ width: 40, height: 28 }} />
          ))}
        </div>
        <span className="skeleton-block" style={{ width: "100%", height: 43, marginTop: 4 }} />
      </div>
    </div>
  );
}
