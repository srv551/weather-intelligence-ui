import { OccupationList } from "../../types/occupation";
import type { OccupationType } from "../../types/occupation";

interface Props {
  value: OccupationType;
  onChange: (occupation: OccupationType) => void;
}

export default function OccupationSelector({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as OccupationType)}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        background: "#0f172a",
        color: "#e5e7eb",
        border: "1px solid #334155",
        fontSize: "0.95rem",
        outline: "none",
      }}
    >
      {OccupationList.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
