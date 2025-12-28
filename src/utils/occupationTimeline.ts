export type TimeStatus = "Good" | "Caution" | "Avoid";

export interface TimelineAdvice {
    status: TimeStatus;
    message: string;
}

export function getOccupationTimeline(
    occupation: string,
    temps: {
        morning: number;
        afternoon: number;
        evening: number;
    }
): Record<"morning" | "afternoon" | "evening", TimelineAdvice> {
    const isHotAfternoon = temps.afternoon >= 32;

    switch (occupation) {
        case "Farmer":
            return {
                morning: {
                    status: "Good",
                    message: "Ideal for field work and harvesting",
                },
                afternoon: {
                    status: isHotAfternoon ? "Avoid" : "Caution",
                    message: "Heat stress risk; avoid heavy farm work",
                },
                evening: {
                    status: "Good",
                    message: "Suitable for irrigation and inspection",
                },
            };

        case "OfficeWorker":
            return {
                morning: {
                    status: "Good",
                    message: "Best time for commute and meetings",
                },
                afternoon: {
                    status: "Caution",
                    message: "Limit outdoor exposure during breaks",
                },
                evening: {
                    status: "Good",
                    message: "Comfortable for commute home",
                },
            };

        case "DeliveryExecutive":
            return {
                morning: {
                    status: "Good",
                    message: "Best window for deliveries",
                },
                afternoon: {
                    status: "Avoid",
                    message: "High heat risk; reduce delivery load",
                },
                evening: {
                    status: "Caution",
                    message: "Safer but stay hydrated",
                },
            };

        default:
            return {
                morning: {
                    status: "Good",
                    message: "Comfortable conditions",
                },
                afternoon: {
                    status: "Caution",
                    message: "Weather may cause discomfort",
                },
                evening: {
                    status: "Good",
                    message: "Cooling down; suitable for outings",
                },
            };
    }
}
