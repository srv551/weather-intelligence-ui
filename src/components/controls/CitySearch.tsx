import { useState } from "react";

interface Props {
  value: string;
  onSearch: (city: string) => void;
}

export default function CitySearch({ value, onSearch }: Props) {
  const [input, setInput] = useState(value);

  function submit() {
    const trimmed = input.trim();
    if (!trimmed) return;

    onSearch(trimmed); // ✅ replaces city, never appends
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        type="text"
        value={input}
        placeholder="Enter city (e.g. Mumbai)"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #334155",
          background: "#020617",
          color: "#e5e7eb",
        }}
      />

      <button
        onClick={submit}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}
