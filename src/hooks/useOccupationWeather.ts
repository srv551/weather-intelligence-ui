import { useEffect, useState } from "react";
import type { OccupationType } from "../types/occupation";

export interface OccupationWeatherResult {
  city: string;
  occupation: OccupationType;
  suitabilityScore: number;
  suitabilityLabel: string;
  opportunities: string[];
  risks: string[];
  recommendedActions: string[];
  bestTimeWindow?: string;
}

export function useOccupationWeather(
  city: string | null,
  occupation: OccupationType
) {
  const [data, setData] = useState<OccupationWeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/occupation/${encodeURIComponent(
        city
      )}?occupation=${occupation}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch occupation weather");
        return res.json();
      })
      .then((res) => {
        // ✅ Normalize backend response
        setData({
          city: res.city,
          occupation: res.occupation,
          suitabilityScore: res.suitabilityScore,
          suitabilityLabel: res.suitabilityLabel,
          opportunities: res.opportunities ?? [],
          risks: res.risks ?? [],
          recommendedActions: res.recommendedActions ?? [],
          bestTimeWindow: res.bestTimeWindow
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Occupation insights unavailable");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [city, occupation]);

  return { data, loading, error };
}
