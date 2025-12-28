import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { AnimatedCard } from "../common/AnimatedCard";
import { FaPlaneDeparture } from "react-icons/fa";

interface Props {
  score: number;
  label: string;
  unavailable?: boolean;
}

export default function TravelScoreCard({
  score,
  label,
  unavailable = false,
}: Props) {
  /* ---------- Gauge config ---------- */
  const radius = 62;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const safeScore = unavailable ? 0 : score;
  const dashOffset =
    circumference - (safeScore / 100) * circumference;

  const color = unavailable
    ? "#64748b"
    : score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#facc15"
        : "#ef4444";

  /* ---------- Animated number ---------- */
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (v) =>
    unavailable ? "—" : Math.round(v).toString()
  );

  useEffect(() => {
    if (unavailable) {
      count.set(0);
      return;
    }

    const controls = animate(count, score, {
      duration: 1.2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [score, unavailable]);

  return (
    <AnimatedCard>
      {/* ---------- Header ---------- */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <FaPlaneDeparture size={22} color="#38bdf8" />
        <h3 style={{ margin: 0 }}>Travel Comfort</h3>
      </div>

      {/* ---------- Gauge ---------- */}
      <div
        style={{
          position: "relative",
          width: 160,
          height: 160,
          margin: "18px auto",
          opacity: unavailable ? 0.75 : 1,
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
              filter: unavailable
                ? "none"
                : `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>

        {/* ---------- Center text ---------- */}
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
              fontSize: "2.6rem",
              fontWeight: 800,
              color,
            }}
          >
            {displayValue}
          </motion.span>

          <small style={{ opacity: 0.8 }}>
            {unavailable ? "Not available" : label}
          </small>
        </div>
      </div>

      <p style={{ textAlign: "center", opacity: 0.8 }}>
        {unavailable
          ? "Travel comfort score is unavailable for this location"
          : "Overall suitability for travel today"}
      </p>
    </AnimatedCard>
  );
}
