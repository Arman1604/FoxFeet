const LOCAL_KEY = "foxfeet-reviews";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_TABLE = import.meta.env.VITE_SUPABASE_REVIEWS_TABLE || "reviews";

const canUseSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

export async function loadStoredReviews() {
  if (canUseSupabase) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=rating,quote,byline,created_at&order=created_at.desc&limit=20`,
        { headers }
      );
      if (response.ok) return response.json();
    } catch {
      // Fall through to local storage during local development.
    }
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
}

export async function saveStoredReview(review) {
  if (canUseSupabase) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify(review),
      });
      if (response.ok) {
        const [createdReview] = await response.json();
        return createdReview || review;
      }
    } catch {
      // Fall through to local storage during local development.
    }
  }

  const current = await loadStoredReviews();
  const next = [review, ...current];
  localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  return review;
}
