import { useState } from "react";
import { FaWind, FaHeart, FaClock, FaInfoCircle } from "react-icons/fa";
import { getOccupationKpi } from "../../utils/occupationKpi";

interface Props {
  occupation: string;
  aqi?: number;
  uv: number;
  temperature: number;
  bestTime?: string;
}

export default function KpiStrip({
  occupation,
  aqi,
  uv,
  temperature,
  bestTime,
}: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const kpi = getOccupationKpi(occupation, {
    aqi,
    uv,
    temperature,
    bestTime,
  });

  return (
    <div className="kpi-strip">
      <KpiCard
        id="aqi"
        title="Air Quality"
        value={aqi ? `AQI ${aqi}` : "—"}
        subtitle={kpi.aqiText}
        icon={<FaWind />}
        reason={kpi.reasons.aqi}
        open={open}
        setOpen={setOpen}
      />

      <KpiCard
        id="health"
        title="Health Risk"
        value={kpi.healthText}
        subtitle={`For ${occupation}`}
        icon={<FaHeart />}
        reason={kpi.reasons.health}
        open={open}
        setOpen={setOpen}
      />

      <KpiCard
        id="time"
        title="Best Time"
        value={kpi.bestTimeText}
        subtitle="Today"
        icon={<FaClock />}
        reason={kpi.reasons.bestTime}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

function KpiCard({
  id,
  title,
  value,
  subtitle,
  icon,
  reason,
  open,
  setOpen,
}: any) {
  const isOpen = open === id;

  return (
    <div className="kpi-card">
      <div className="kpi-row">
        <div className="kpi-icon">{icon}</div>

        <div className="kpi-text">
          <span className="kpi-title">{title}</span>
          <span className="kpi-value">{value}</span>
          {subtitle && <span className="kpi-sub">{subtitle}</span>}
        </div>

        <FaInfoCircle
          className="kpi-info"
          onClick={() => setOpen(isOpen ? null : id)}
        />
      </div>

      {isOpen && <div className="kpi-reason">{reason}</div>}
    </div>
  );
}
