import { motion } from "framer-motion";

export default function HeroAtmosphere({
    condition,
}: {
    condition: string;
}) {
    const text = condition.toLowerCase();

    if (text.includes("sun")) {
        return (
            <motion.div
                className="atmosphere sun-glow"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
        );
    }

    if (text.includes("cloud")) {
        return (
            <motion.div
                className="atmosphere cloud-drift"
                animate={{ x: ["-5%", "5%", "-5%"] }}
                transition={{ duration: 12, repeat: Infinity }}
            />
        );
    }

    if (text.includes("rain")) {
        return <div className="atmosphere rain-layer" />;
    }

    return null;
}
