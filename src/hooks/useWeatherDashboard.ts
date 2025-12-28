import { useEffect, useState } from "react";
import { getTodaySummary, getTravelScore } from "../api/weatherApi";

export function useWeatherDashboard(city: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

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
      } catch {
        if (!cancelled) setError("Unable to update weather");
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
