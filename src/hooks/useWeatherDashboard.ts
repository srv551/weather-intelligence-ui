import { useEffect, useState } from "react";
import { getTodaySummary, getTravelScore } from "../api/weatherApi";

export function useWeatherDashboard(city: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const [summary, travelScore] = await Promise.all([
          getTodaySummary(city),
          getTravelScore(city),
        ]);

        if (!cancelled) {
          setData({
            ...summary,
            travelScore,
          });
        }
      } catch (err) {
        if (!cancelled) setError("Unable to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [city]);

  return { data, loading, error };
}
