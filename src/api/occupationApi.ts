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

export async function fetchOccupationWeather(
    city: string,
    occupation: OccupationType
): Promise<OccupationWeatherResult> {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/occupation/${encodeURIComponent(
            city
        )}?occupation=${occupation}`,
        {
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch occupation weather");
    }

    const res = await response.json();

    // ✅ Normalize backend response safely
    return {
        city: res.city,
        occupation: res.occupation,
        suitabilityScore: res.suitabilityScore,
        suitabilityLabel: res.suitabilityLabel,
        opportunities: res.opportunities ?? [],
        risks: res.risks ?? [],
        recommendedActions: res.recommendedActions ?? [],
        bestTimeWindow: res.bestTimeWindow,
    };
}
