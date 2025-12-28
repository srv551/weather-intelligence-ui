import { useEffect, useState } from "react";
import { reverseGeocodeCity } from "../api/geoApi";

const FALLBACK_CITY = "Waterloo";
const STORAGE_KEY = "weather:lastCity";

export function useInitialCity() {
    const [city, setCity] = useState<string | null>(null);
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        // 1️⃣ Restore last city
        const savedCity = localStorage.getItem(STORAGE_KEY);
        if (savedCity) {
            setCity(savedCity);
            setResolved(true);
            return;
        }

        // 2️⃣ Ask for geolocation
        if (!navigator.geolocation) {
            setCity(FALLBACK_CITY);
            setResolved(true);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const detectedCity = await reverseGeocodeCity(
                    pos.coords.latitude,
                    pos.coords.longitude
                );

                setCity(detectedCity ?? FALLBACK_CITY);
                setResolved(true);
            },
            () => {
                // Permission denied / error
                setCity(FALLBACK_CITY);
                setResolved(true);
            },
            { timeout: 8000 }
        );
    }, []);

    // Persist on change
    useEffect(() => {
        if (city) {
            localStorage.setItem(STORAGE_KEY, city);
        }
    }, [city]);

    return {
        city,
        setCity,
        resolved,
    };
}
