import { useEffect, useState } from "react";
import type { OccupationType } from "../types/occupation";
import {
  fetchOccupationWeather,
  type OccupationWeatherResult,
} from "../api/occupationApi";

export function useOccupationWeather(
  city: string | null,
  occupation: OccupationType
) {
  const [data, setData] = useState<OccupationWeatherResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      return;
    }

    let cancelled = false;

    async function load(cityValue: string) {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchOccupationWeather(cityValue, occupation);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Occupation insights unavailable");
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load(city);

    return () => {
      cancelled = true;
    };
  }, [city, occupation]);

  return { data, loading, error };
}
