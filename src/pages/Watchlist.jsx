import { useState } from "react";
import ContentCard from "../components/ContentCard";

export default function Watchlist() {
  const [items] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    return saved;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1
  style={{
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  }}
>
  Watchlist
</h1>

      {items.length === 0 ? (
        <p>No items saved yet</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type="movie" />
          ))}
        </div>
      )}
    </div>
  );
}