import { motion } from "framer-motion";

interface Props {
  condition?: string;
  size?: number;
}

export default function AnimatedWeatherIcon({
  condition = "",
  size = 64,
}: Props) {
  const c = condition.toLowerCase();

  if (c.includes("rain")) return <Rain size={size} />;
  if (c.includes("snow")) return <Snow size={size} />;
  if (c.includes("cloud")) return <Cloud size={size} />;
  if (c.includes("mist") || c.includes("fog")) return <Fog size={size} />;
  if (c.includes("clear") || c.includes("sun")) return <Sun size={size} />;

  return <Cloud size={size} />;
}

/* ---------- ICONS ---------- */

function Sun({ size }: { size: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    >
      <circle cx="32" cy="32" r="14" fill="#facc15" />
    </motion.svg>
  );
}

function Cloud({ size }: { size: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      animate={{ x: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 6 }}
    >
      <path
        d="M20 40h26a10 10 0 0 0 0-20 14 14 0 0 0-28-2"
        fill="#cbd5f5"
      />
    </motion.svg>
  );
}

function Rain({ size }: { size: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64">
      <path
        d="M20 32h26a10 10 0 0 0 0-20 14 14 0 0 0-28-2"
        fill="#cbd5f5"
      />
      {[...Array(4)].map((_, i) => (
        <motion.line
          key={i}
          x1={24 + i * 6}
          y1={40}
          x2={24 + i * 6}
          y2={52}
          stroke="#38bdf8"
          strokeWidth="2"
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.svg>
  );
}

function Snow({ size }: { size: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64">
      <path
        d="M20 32h26a10 10 0 0 0 0-20 14 14 0 0 0-28-2"
        fill="#e5e7eb"
      />
      {[...Array(3)].map((_, i) => (
        <motion.circle
          key={i}
          cx={26 + i * 8}
          cy={46}
          r={2}
          fill="white"
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.svg>
  );
}

function Fog({ size }: { size: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 4 }}
    >
      <rect x="14" y="28" width="36" height="6" fill="#cbd5e1" />
      <rect x="18" y="38" width="28" height="6" fill="#e5e7eb" />
    </motion.svg>
  );
}
