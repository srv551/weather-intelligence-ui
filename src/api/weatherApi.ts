import { apiGet } from "./httpClient";

export function getTodaySummary(city: string) {
  return apiGet(`/api/v1/weather/today-summary/${city}`);
}
