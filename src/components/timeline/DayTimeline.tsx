import { FaSun, FaCloudSun, FaMoon } from "react-icons/fa";
import { getOccupationTimeline } from "../../utils/occupationTimeline";

interface Props {
  occupation: string;
  morningTemp: number;
  afternoonTemp: number;
  eveningTemp: number;
}

export default function DayTimeline({
  occupation,
  morningTemp,
  afternoonTemp,
  eveningTemp,
}: Props) {
  const advice = getOccupationTimeline(occupation, {
    morning: morningTemp,
    afternoon: afternoonTemp,
    evening: eveningTemp,
  });

  return (
    <div className="timeline-wrapper">
      <h3>Best Time of Day for {occupation}</h3>
      <p className="timeline-subtitle">
        Recommendation based on today’s weather
      </p>

      <div className="timeline-grid">
        <TimelineCard
          icon={<FaSun />}
          label="Morning"
          temp={morningTemp}
          highlight={advice.morning.status === "Good"}
          {...advice.morning}
        />

        <TimelineCard
          icon={<FaCloudSun />}
          label="Afternoon"
          temp={afternoonTemp}
          highlight={
            advice.afternoon.status === "Good" &&
            advice.morning.status !== "Good"
          }
          {...advice.afternoon}
        />

        <TimelineCard
          icon={<FaMoon />}
          label="Evening"
          temp={eveningTemp}
          highlight={
            advice.evening.status === "Good" &&
            advice.morning.status !== "Good" &&
            advice.afternoon.status !== "Good"
          }
          {...advice.evening}
        />
      </div>
    </div>
  );
}

function TimelineCard({
  icon,
  label,
  temp,
  status,
  message,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  temp: number;
  status: "Good" | "Caution" | "Avoid";
  message: string;
  highlight?: boolean;
}) {
  const statusClass =
    status === "Good"
      ? "good"
      : status === "Caution"
      ? "caution"
      : "avoid";

  return (
    <div
      className={`timeline-card-mini ${statusClass} ${
        highlight ? "timeline-best" : ""
      }`}
    >
      <div className="timeline-top">
        {icon}
        <strong>{label}</strong>
      </div>

      <span className={`timeline-status ${statusClass}`}>
        {status}
      </span>

      <span className="timeline-temp">{temp}°C</span>

      <p className="timeline-message">{message}</p>
    </div>
  );
}
