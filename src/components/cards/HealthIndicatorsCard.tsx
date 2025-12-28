import { AnimatedCard } from "../common/AnimatedCard";
import type { HealthRisk } from "../../types/health";
import { motion } from "framer-motion";

interface Props {
  temperature: number;
  uv: number;
  airQualityIndex?: number;
  pm25?: number;
}

export default function HealthIndicatorsCard({
  temperature,
  uv,
  airQualityIndex,
  pm25,
}: Props) {
  const risks: HealthRisk[] = [];

  // --- Heat ---
  if (temperature >= 35) {
    risks.push({
      title: "Heat Stress",
      level: "High",
      reason: `High temperature (${temperature}°C).`,
      advice: "Avoid outdoor activity and stay hydrated.",
    });
  } else if (temperature >= 30) {
    risks.push({
      title: "Heat Stress",
      level: "Moderate",
      reason: `Warm conditions (${temperature}°C).`,
      advice: "Take breaks and drink water frequently.",
    });
  } else {
    risks.push({
      title: "Heat Stress",
      level: "Low",
      reason: `Comfortable temperature (${temperature}°C).`,
      advice: "No special precautions required.",
    });
  }

  // --- UV ---
  if (uv >= 8) {
    risks.push({
      title: "UV Exposure",
      level: "High",
      reason: `Very high UV index (${uv}).`,
      advice: "Use sunscreen and avoid midday sun.",
    });
  } else if (uv >= 5) {
    risks.push({
      title: "UV Exposure",
      level: "Moderate",
      reason: `Moderate UV index (${uv}).`,
      advice: "Wear sunglasses and sunscreen.",
    });
  } else {
    risks.push({
      title: "UV Exposure",
      level: "Low",
      reason: `Low UV index (${uv}).`,
      advice: "Safe for outdoor activity.",
    });
  }

  // --- Air Quality ---
  if (airQualityIndex && airQualityIndex >= 4) {
    risks.push({
      title: "Air Quality",
      level: "High",
      reason: `Poor air quality (AQI ${airQualityIndex}).`,
      advice: "Limit outdoor exposure and consider a mask.",
    });
  } else if (airQualityIndex === 3 || (pm25 && pm25 > 35)) {
    risks.push({
      title: "Air Quality",
      level: "Moderate",
      reason: "Elevated particulate matter.",
      advice: "Sensitive individuals should be cautious.",
    });
  } else {
    risks.push({
      title: "Air Quality",
      level: "Low",
      reason: "Air quality is acceptable.",
      advice: "No restrictions on outdoor activity.",
    });
  }

  return (
    <AnimatedCard>
      <h3>Health Advisory</h3>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {risks.map((risk, index) => (
          <HealthRiskItem key={index} risk={risk} />
        ))}
      </div>
    </AnimatedCard>
  );
}

function HealthRiskItem({ risk }: { risk: HealthRisk }) {
  const color =
    risk.level === "High"
      ? "#ef4444"
      : risk.level === "Moderate"
        ? "#f59e0b"
        : "#22c55e";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: "#ffffff",
        color: "#000",
        borderRadius: 12,
        padding: 14,
        borderLeft: `6px solid ${color}`,
      }}
    >
      <strong>{risk.title}</strong>
      <p style={{ color, fontWeight: 600 }}>{risk.level} Risk</p>
      <small>{risk.reason}</small>
      <p style={{ marginTop: 6 }}>{risk.advice}</p>
    </motion.div>
  );
}
