export interface OccupationWeatherResult {
  city: string;
  occupation: string;
  suitabilityScore: number;
  suitabilityLabel: string;
  opportunities?: string[];
  risks?: string[];
  recommendedActions?: string[];
  bestTimeWindow?: string;
}
