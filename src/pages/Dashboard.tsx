import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useWeatherDashboard } from "../hooks/useWeatherDashboard";
import { useOccupationWeather } from "../hooks/useOccupationWeather";

import { AnimatedCard } from "../components/common/AnimatedCard";
import TravelScoreCard from "../components/cards/TravelScoreCard";
import HealthIndicatorsCard from "../components/cards/HealthIndicatorsCard";
import OccupationSuitabilityCard from "../components/cards/OccupationSuitabilityCard";

import AmbientWeatherOverlay from "../components/common/AmbientWeatherOverlay";
import AnimatedWeatherIcon from "../components/common/AnimatedWeatherIcon";
import CitySearch from "../components/controls/CitySearch";
import KpiStrip from "../components/kpi/KpiStrip";
import DayTimeline from "../components/timeline/DayTimeline";

import type { OccupationType } from "../types/occupation";
import { Occupations } from "../types/occupation";

export default function Dashboard() {
  const [city, setCity] = useState("Waterloo");

  const { data, loading, error } = useWeatherDashboard(city);

  const [occupation, setOccupation] = useState<OccupationType>(
    Occupations.OfficeWorker.value
  );

  const {
    data: occupationData,
    loading: occupationLoading,
  } = useOccupationWeather(data?.current?.city ?? null, occupation);

  /* -------------------- Guards -------------------- */
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !data.current) return <p>No weather data available.</p>;

  /* -------------------- Render -------------------- */
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={city}
        className="dashboard"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* ================= TOP GRID ================= */}
        <div className="dashboard-grid">
          {/* City Search */}
          <AnimatedCard>
            <h3>Search City</h3>
            <CitySearch value={city} onSearch={setCity} />
          </AnimatedCard>

          {/* Current Weather */}
          <AnimatedCard>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <AmbientWeatherOverlay condition={data.current.description} />

              <div style={{ position: "relative", zIndex: 2 }}>
                <AnimatedWeatherIcon
                  condition={data.current.description}
                  size={72}
                />

                <h2>{data.current.city}</h2>
                <p>{data.current.description}</p>
                <h1>{data.current.temperature}°C</h1>
                <p>
                  Feels like {data.current.feelsLike}°C · Humidity{" "}
                  {data.current.humidity}%
                </p>
              </div>
            </div>
          </AnimatedCard>

          {/* Travel Score */}
          {data.travelScore && (
            <TravelScoreCard
              score={data.travelScore.overallScore}
              label={data.travelScore.comfortLabel}
            />
          )}

          {/* Occupation Suitability (Selector + Insight unified) */}
          <OccupationSuitabilityCard
            occupation={occupation}
            onOccupationChange={setOccupation}
            data={occupationData ?? undefined}
            loading={occupationLoading}
          />
        </div>

        {/* ================= KPI STRIP ================= */}
        <div className="dashboard-wide">
          <KpiStrip
            occupation={occupation}
            aqi={data.current.airQuality?.usEpaIndex}
            uv={data.current.uv}
            temperature={data.current.temperature}
            bestTime={data.astronomy?.sunrise}
          />
        </div>

        {/* ================= DAY TIMELINE ================= */}
        <div className="dashboard-wide">
          <DayTimeline
            occupation={occupation}
            morningTemp={data.forecastToday.minTemp}
            afternoonTemp={data.forecastToday.maxTemp}
            eveningTemp={Math.round(
              (data.forecastToday.minTemp +
                data.forecastToday.maxTemp) / 2
            )}
          />
        </div>

        {/* ================= HEALTH ================= */}
        <div className="dashboard-grid">
          <HealthIndicatorsCard
            temperature={data.current.temperature}
            uv={data.current.uv}
            airQualityIndex={data.current.airQuality?.usEpaIndex}
            pm25={data.current.airQuality?.pm2_5}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
