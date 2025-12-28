export function getOccupationKpi(
  occupation: string,
  data: {
    aqi?: number;
    uv: number;
    temperature: number;
    bestTime?: string;
  }
) {
  const isHeatRisk = data.temperature >= 32;
  const isPoorAir = (data.aqi ?? 1) >= 4;

  switch (occupation) {
    case "Farmer":
      return {
        aqiText: isPoorAir
          ? "Field work air caution"
          : "Air suitable for farming",
        healthText: isHeatRisk
          ? "Heat risk for manual work"
          : "Safe for outdoor work",
        bestTimeText: "Early morning recommended",
        reasons: {
          aqi: "Air quality impacts prolonged field exposure",
          health: "Manual labor increases heat stress risk",
          bestTime: "Lower temperature & UV in mornings",
        },
      };

    case "OfficeWorker":
      return {
        aqiText: isPoorAir
          ? "Commute discomfort possible"
          : "Comfortable commute",
        healthText: "Low risk for desk work",
        bestTimeText: "Morning commute ideal",
        reasons: {
          aqi: "Air quality mainly affects commute",
          health: "Mostly indoor activity",
          bestTime: "Lower traffic heat & pollution",
        },
      };

    default:
      return {
        aqiText: "Air quality acceptable",
        healthText: "Low health risk",
        bestTimeText: data.bestTime ?? "Morning preferred",
        reasons: {
          aqi: "General air quality assessment",
          health: "Overall comfort conditions",
          bestTime: "Balanced temperature window",
        },
      };
  }
}
