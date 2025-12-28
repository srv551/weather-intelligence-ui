// Dashboard.tsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useWeatherDashboard } from "../hooks/useWeatherDashboard";
import { useOccupationWeather } from "../hooks/useOccupationWeather";
import { useInitialCity } from "../hooks/useInitialCity";

import TravelScoreCard from "../components/cards/TravelScoreCard";
import HealthIndicatorsCard from "../components/cards/HealthIndicatorsCard";
import OccupationSuitabilityCard from "../components/cards/OccupationSuitabilityCard";

import KpiStrip from "../components/kpi/KpiStrip";
import DayTimeline from "../components/timeline/DayTimeline";

import TopSearchBar from "../components/layout/TopSearchBar";
import HeroWeather from "../components/hero/HeroWeather";

import type { OccupationType } from "../types/occupation";
import { Occupations } from "../types/occupation";

export default function Dashboard() {
  const { city, setCity, resolved } = useInitialCity();
  const safeCity = city ?? "Waterloo";

  const { data } = useWeatherDashboard(safeCity);

  const [occupation, setOccupation] = useState<OccupationType>(
    Occupations.OfficeWorker.value
  );

  const { data: occupationData, loading: occupationLoading } =
    useOccupationWeather(data?.current?.city ?? null, occupation);

  if (!resolved) return <p>Detecting your location…</p>;

  if (!data || !data.current) {
    return <p>Loading initial data…</p>;
  }
  if (!data || !data.current) return <p>No weather data available.</p>;

  return (
    <>
      <TopSearchBar city={safeCity} onCityChange={setCity} />

      {/* ================= HERO + SIDE INFO ================= */}
      <section className="hero-layout">
        <div className="hero-main">
          <HeroWeather
            city={data.current.city}
            description={data.current.description}
            temperature={data.current.temperature}
            feelsLike={data.current.feelsLike}
            humidity={data.current.humidity}
            windKph={data.current.windKph}
            aqi={data.current.airQuality?.usEpaIndex}
            sunrise={data.astronomy?.sunrise}
          />

        </div>

        <div className="hero-side">
          <KpiStrip
            occupation={occupation}
            aqi={data.current.airQuality?.usEpaIndex}
            uv={data.current.uv}
            temperature={data.current.temperature}
            bestTime={data.astronomy?.sunrise}
          />

          <DayTimeline
            occupation={occupation}
            morningTemp={data.forecastToday.minTemp}
            afternoonTemp={data.forecastToday.maxTemp}
            eveningTemp={Math.round(
              (data.forecastToday.minTemp + data.forecastToday.maxTemp) / 2
            )}
          />
        </div>
      </section>

      {/* ================= MAIN DASHBOARD ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={safeCity}
          className="dashboard"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="dashboard-grid">
            <TravelScoreCard
              score={data.travelScore?.overallScore ?? 0}
              label={data.travelScore?.comfortLabel ?? ""}
              unavailable={!data.travelScore}
            />

            <OccupationSuitabilityCard
              occupation={occupation}
              onOccupationChange={setOccupation}
              data={occupationData ?? undefined}
              loading={occupationLoading}
            />
          </div>

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
    </>
  );
}
