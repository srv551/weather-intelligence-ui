import { motion } from "framer-motion";

interface SuitabilityGaugeProps {
  value: number; // 0–100
  label?: string;
  size?: number;
}

export default function SuitabilityGauge({
  value,
  label,
  size = 140
}: SuitabilityGaugeProps) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  const color =
    progress >= 80
      ? "#2ecc71"
      : progress >= 50
        ? "#f1c40f"
        : "#e74c3c";

  return (
    <div style={{ width: size, textAlign: "center" }}>
      <svg width={size} height={size}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />

        {/* Animated progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Value text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="bold"
          fill={color}
        >
          {progress}
        </text>
      </svg>

      {label && (
        <p style={{ marginTop: 8, fontWeight: 500 }}>{label}</p>
      )}
    </div>
  );
}
