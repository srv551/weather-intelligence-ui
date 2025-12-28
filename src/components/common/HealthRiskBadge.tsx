import { motion } from "framer-motion";

interface Props {
  label: string;
  level: "Low" | "Moderate" | "High";
  description: string;
}

const colors = {
  Low: "#2ecc71",
  Moderate: "#f1c40f",
  High: "#e74c3c"
};

export default function HealthRiskBadge({
  label,
  level,
  description
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        borderLeft: `6px solid ${colors[level]}`,
        padding: "12px",
        marginBottom: "12px",
        background: "#fff",
        borderRadius: 8
      }}
    >
      <strong>{label}</strong>
      <p style={{ margin: "4px 0", color: colors[level] }}>
        {level} Risk
      </p>
      <small>{description}</small>
    </motion.div>
  );
}
