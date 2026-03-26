import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContentCard({ item, type, onWatchlistChange }) {
  const image = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "";

  const [isSaved, setIsSaved] = useState(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    return watchlist.some((x) => x.id === item.id);
  });

  function toggleWatchlist(item) {
    const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const alreadyExists = existing.some((x) => x.id === item.id);

    let updated;

    if (alreadyExists) {
      updated = existing.filter((x) => x.id !== item.id);
    } else {
      updated = [...existing, item];
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsSaved(!alreadyExists);
    onWatchlistChange?.(updated);
  }

  return (
  <div className="card"
    style={{
      background: "#1a1a1a",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "0.3s",
    }}
    
  >
    {image && (
      <img
        src={image}
        alt={item.title || item.name}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
        }}
      />
    )}

    <div style={{ padding: "10px" }}>
      <h3 style={{ fontSize: "16px" }}>
        {item.title || item.name}
        <p style={{ color: "#ffd700", fontSize: "14px" }}>
  ⭐ {item.vote_average?.toFixed(1)}
</p>
      </h3>

      <p style={{ fontSize: "12px", color: "#aaa" }}>
        {item.release_date || item.first_air_date}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Link to={`/details/${type}/${item.id}`} style={{ color: "#4da6ff" }}>
          Details
        </Link>

        <button
          onClick={() => toggleWatchlist(item)}
          style={{
            background: isSaved ? "#ff4d4d" : "#e50914",
            border: "none",
            color: "white",
            padding: "5px 10px",
            borderRadius: "6px",
          }}
        >
          {isSaved ? "Remove" : "Save"}
        </button>
      </div>
    </div>

    
  </div>
);
}
