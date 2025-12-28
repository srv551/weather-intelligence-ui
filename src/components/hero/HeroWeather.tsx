import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

interface Props {
    city: string;
    description: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windKph?: number;
    aqi?: number;
    sunrise?: string;
    loading?: boolean;
}

export default function HeroWeather({
    city,
    description,
    temperature,
    feelsLike,
    humidity,
    windKph,
    aqi,
    sunrise,
    loading,
}: Props) {
    const animatedTemp = useAnimatedNumber(temperature);

    const weatherClass =
        description.toLowerCase().includes("sun") ||
            description.toLowerCase().includes("clear")
            ? "weather-sunny"
            : description.toLowerCase().includes("cloud")
                ? "weather-cloudy"
                : description.toLowerCase().includes("rain")
                    ? "weather-rainy"
                    : description.toLowerCase().includes("snow")
                        ? "weather-snowy"
                        : "weather-default";

    return (
        <div className={`hero-weather ${weatherClass}`}>
            {/* Atmosphere layer */}
            <div className="hero-atmosphere" />

            {/* Loading overlay (non-blocking) */}
            {loading && (
                <div className="hero-loading-overlay">
                    Updating weather…
                </div>
            )}

            {/* Main content */}
            <div className="hero-content">
                <div className="hero-left">
                    <div>
                        <h1>{city}</h1>
                        <p className="hero-condition">{description}</p>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-temp">{animatedTemp}°C</div>
                    <div className="hero-meta">
                        <span>Feels like {feelsLike}°C</span>
                        <span>Humidity {humidity}%</span>
                    </div>
                </div>
            </div>

            {/* Enriched metrics */}
            <div className="hero-metrics">
                {typeof windKph === "number" && (
                    <div className="hero-metric">
                        <span className="metric-icon">🌬️</span>
                        <div className="metric-text">
                            <small>Wind</small>
                            <strong>{windKph} km/h</strong>
                        </div>
                    </div>
                )}

                {typeof aqi === "number" && (
                    <div className="hero-metric">
                        <span className="metric-icon">🫁</span>
                        <div className="metric-text">
                            <small>Air Quality</small>
                            <strong>AQI {aqi}</strong>
                        </div>
                    </div>
                )}

                {sunrise && (
                    <div className="hero-metric">
                        <span className="metric-icon">🌅</span>
                        <div className="metric-text">
                            <small>Sunrise</small>
                            <strong>{sunrise}</strong>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
