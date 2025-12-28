const BASE = import.meta.env.VITE_API_BASE_URL;

const headers = {
  "ngrok-skip-browser-warning": "true",
};

export async function getTodaySummary(city: string) {
  const res = await fetch(
    `${BASE}/api/v1/weather/today-summary/${encodeURIComponent(city)}`,
    { headers }
  );

  if (!res.ok) throw new Error("Failed to fetch today summary");
  return res.json();
}

export async function getTravelScore(city: string) {
  const res = await fetch(
    `${BASE}/api/v1/weather/travel-score/${encodeURIComponent(city)}`,
    { headers }
  );

  if (!res.ok) throw new Error("Failed to fetch travel score");
  return res.json();
}
