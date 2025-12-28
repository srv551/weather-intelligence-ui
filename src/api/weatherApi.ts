const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTodaySummary(city: string) {
  console.log("UI sending city:", city);
  const res = await fetch(
    `${BASE_URL}/api/v1/weather/today-summary/${city}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return res.json();
}

export async function getTravelScore(city: string) {
  const res = await fetch(
    `${BASE_URL}/api/v1/weather/travel-score/${city}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch travel score");
  }

  return res.json();
}

