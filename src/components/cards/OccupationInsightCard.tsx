import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { AnimatedCard } from "../common/AnimatedCard";
import {
  FaBriefcase,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaClock,
} from "react-icons/fa";

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

interface Props {
  data: OccupationWeatherResult;
}

export default function OccupationInsightCard({ data }: Props) {
  const {
    occupation,
    suitabilityScore,
    suitabilityLabel,
    opportunities = [],
    risks = [],
    recommendedActions = [],
    bestTimeWindow,
  } = data;

  /* ---------- Gauge math ---------- */
  const radius = 62;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const dashOffset =
    circumference - (suitabilityScore / 100) * circumference;

  const color =
    suitabilityScore >= 80
      ? "#22c55e"
      : suitabilityScore >= 60
      ? "#facc15"
      : "#ef4444";

  /* ---------- Animated counter ---------- */
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, suitabilityScore, {
      duration: 1.2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [suitabilityScore]);

  return (
    <AnimatedCard>
      <div className="occupation-card">
        {/* ---------- Header ---------- */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FaBriefcase size={22} color="#38bdf8" />
          <h3 style={{ margin: 0 }}>
            {occupation} – Work Suitability
          </h3>
        </div>

        {/* ---------- Suitability Gauge ---------- */}
        <div
          style={{
            position: "relative",
            width: 160,
            height: 160,
            margin: "12px auto",
          }}
        >
          <svg width={160} height={160}>
            <circle
              stroke="#1f2937"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={80}
              cy={80}
            />
            <motion.circle
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={80}
              cy={80}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.2 }}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.span
              style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                color,
              }}
            >
              {Math.round(count.get())}
            </motion.span>
            <small style={{ color: "#94a3b8" }}>
              {suitabilityLabel}
            </small>
          </div>
        </div>

        {/* ---------- Best Time ---------- */}
        {bestTimeWindow && (
          <p style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FaClock color="#facc15" />
            <strong>Best Time:</strong> {bestTimeWindow}
          </p>
        )}

        {/* ---------- Opportunities ---------- */}
        {opportunities.length > 0 && (
          <div>
            <strong style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <FaCheckCircle color="#22c55e" />
              Opportunities
            </strong>
            <ul>
              {opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------- Risks ---------- */}
        {risks.length > 0 && (
          <div>
            <strong
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                color: "#ef4444",
              }}
            >
              <FaExclamationTriangle />
              Risks
            </strong>
            <ul>
              {risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------- Recommended Actions ---------- */}
        {recommendedActions.length > 0 && (
          <div>
            <strong style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <FaLightbulb color="#38bdf8" />
              Recommended Actions
            </strong>
            <ul>
              {recommendedActions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </AnimatedCard>
  );
}
