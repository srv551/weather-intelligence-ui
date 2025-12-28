import { useEffect, useState } from "react";

export function useAnimatedNumber(value: number, duration = 500) {
    const [display, setDisplay] = useState(value);

    useEffect(() => {
        let start: number | null = null;
        const from = display;
        const to = value;

        if (from === to) return;

        function animate(timestamp: number) {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            const current = Math.round(from + (to - from) * progress);
            setDisplay(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [value]);

    return display;
}
