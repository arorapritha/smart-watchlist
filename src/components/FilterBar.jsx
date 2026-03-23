import { genres } from "../data/genres";
export default function FilterBar({ filters, setFilters, onApply }) {
  
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "25px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <select
        value={filters.timeframe}
        onChange={(e) =>
          setFilters({ ...filters, timeframe: e.target.value })
        }
        style={inputStyle}
      >
        <option value="">Timeframe</option>
        <option value="last_5_years">Last 5 years</option>
        <option value="classics">Classics</option>
      </select>



<select
  value={filters.genre}
  onChange={(e) =>
    setFilters({ ...filters, genre: e.target.value })
  }
  style={inputStyle}
>
  <option value="">Genre</option>
  {genres.map((g) => (
    <option key={g.id} value={g.id}>
      {g.name}
    </option>
  ))}
</select>
      <input
        placeholder="Language (en, hi)"
        value={filters.language}
        onChange={(e) =>
          setFilters({ ...filters, language: e.target.value })
        }
        style={inputStyle}
      />

      <select
        value={filters.popularity}
        onChange={(e) =>
          setFilters({ ...filters, popularity: e.target.value })
        }
        style={inputStyle}
      >
        <option value="desc">Most Popular</option>
        <option value="asc">Least Popular</option>
      </select>

      <button onClick={onApply} style={buttonStyle}>
        Apply
      </button>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "white",
};

const buttonStyle = {
  background: "#e50914",
  border: "none",
  color: "white",
  padding: "10px 16px",
  borderRadius: "8px",
};