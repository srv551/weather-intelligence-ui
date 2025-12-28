import { motion } from "framer-motion";

interface Props {
  condition?: string;
}

export default function AmbientWeatherOverlay({ condition }: Props) {
  if (!condition) return null;

  const c = condition.toLowerCase();

  if (c.includes("rain")) return <Rain />;
  if (c.includes("snow")) return <Snow />;
  if (c.includes("mist") || c.includes("fog")) return <Fog />;
  if (c.includes("cloud")) return <Clouds />;
  if (c.includes("clear") || c.includes("sun")) return <Sun />;

  return null;
}

/* ---------- EFFECTS ---------- */

function Rain() {
  return (
    <div className="ambient rain">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          className="raindrop"
          animate={{ y: ["-20%", "120%"] }}
          transition={{
            duration: 0.6 + Math.random(),
            repeat: Infinity,
            delay: Math.random(),
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function Snow() {
  return (
    <div className="ambient snow">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          className="snowflake"
          animate={{ y: ["-10%", "110%"], x: [0, 20, -20] }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function Fog() {
  return <div className="ambient fog" />;
}

function Clouds() {
  return <div className="ambient clouds" />;
}

function Sun() {
  return <div className="ambient sun" />;
}
