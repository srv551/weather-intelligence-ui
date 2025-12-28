export type HealthRiskLevel = "Low" | "Moderate" | "High";

export interface HealthRisk {
  title: string;
  level: HealthRiskLevel;
  reason: string;
  advice: string;
}
