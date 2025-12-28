import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { AnimatedCard } from "../common/AnimatedCard";
import OccupationSelector from "../controls/OccupationSelector";
import type { OccupationType } from "../../types/occupation";
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
    occupation: OccupationType;
    onOccupationChange: (o: OccupationType) => void;
    data?: OccupationWeatherResult;
    loading?: boolean;
}

export default function OccupationSuitabilityCard({
    occupation,
    onOccupationChange,
    data,
    loading,
}: Props) {
    const score = data?.suitabilityScore ?? 0;
    const label = data?.suitabilityLabel ?? "—";

    /* ---------- Gauge ---------- */
    const radius = 62;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const dashOffset =
        circumference - (score / 100) * circumference;

    const color =
        score >= 80
            ? "#22c55e"
            : score >= 60
                ? "#facc15"
                : "#ef4444";

    const glow =
        score >= 80
            ? "rgba(34,197,94,0.45)"
            : score >= 60
                ? "rgba(250,204,21,0.45)"
                : "rgba(239,68,68,0.45)";

    /* ---------- Animated number ---------- */
    const count = useMotionValue(0);
    const displayValue = useTransform(count, (v) =>
        Math.round(v).toString()
    );

    useEffect(() => {
        if (!loading) {
            const controls = animate(count, score, {
                duration: 1.2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [score, loading]);

    return (
        <AnimatedCard>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FaBriefcase size={22} color="#38bdf8" />
                <h3 style={{ margin: 0 }}>Occupation Suitability</h3>
            </div>

            {/* Selector */}
            <div style={{ marginTop: 12 }}>
                <OccupationSelector
                    value={occupation}
                    onChange={onOccupationChange}
                />
            </div>

            {loading && (
                <p style={{ marginTop: 20, opacity: 0.7 }}>
                    Loading suitability insights…
                </p>
            )}

            {!loading && data && (
                <>
                    {/* Gauge with glow */}
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            position: "relative",
                            width: 160,
                            height: 160,
                            margin: "18px auto",
                            filter: `drop-shadow(0 0 18px ${glow})`,
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
                                {displayValue}
                            </motion.span>
                            <small>{label}</small>
                        </div>
                    </motion.div>

                    {data.bestTimeWindow && (
                        <p>
                            <FaClock color="#facc15" />{" "}
                            <strong>Best Time:</strong> {data.bestTimeWindow}
                        </p>
                    )}

                    {data.opportunities?.length ? (
                        <>
                            <strong>
                                <FaCheckCircle color="#22c55e" /> Opportunities
                            </strong>
                            <ul>
                                {data.opportunities.map((o, i) => (
                                    <li key={i}>{o}</li>
                                ))}
                            </ul>
                        </>
                    ) : null}

                    {data.risks?.length ? (
                        <>
                            <strong style={{ color: "#ef4444" }}>
                                <FaExclamationTriangle /> Risks
                            </strong>
                            <ul>
                                {data.risks.map((r, i) => (
                                    <li key={i}>{r}</li>
                                ))}
                            </ul>
                        </>
                    ) : null}

                    {data.recommendedActions?.length ? (
                        <>
                            <strong>
                                <FaLightbulb color="#38bdf8" /> Recommended Actions
                            </strong>
                            <ul>
                                {data.recommendedActions.map((a, i) => (
                                    <li key={i}>{a}</li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                </>
            )}
        </AnimatedCard>
    );
}
