import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

interface Props {
    city: string;
    onCityChange: (city: string) => void;
}

export default function TopSearchBar({ city, onCityChange }: Props) {
    const [value, setValue] = useState(city);

    function submit() {
        if (!value.trim()) return;
        onCityChange(value.trim());
    }

    return (
        <div className="top-search-bar">
            <div className="top-search-inner">
                <div className="brand">
                    <FaMapMarkerAlt />
                    <span>Weather Intelligence</span>
                </div>

                <div className="search-box">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submit()}
                        placeholder="Search city…"
                    />
                    <button onClick={submit}>
                        <FaSearch />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
