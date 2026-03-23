import { useEffect, useState } from "react";
import { discoverMovies } from "../api/tmdb";
import ContentCard from "../components/ContentCard";

export default function ForYou() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");

      if (!saved.length) return;

      const firstItem = saved[0];

      const data = await discoverMovies({
        genre: firstItem.genre_ids?.[0],
        popularity: "desc",
      });

      setItems(data);
    };

    fetchRecommendations();
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h1
  style={{
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  }}
>
  For You
</h1>

    {!items.length ? (
      <p>Save something first to get recommendations</p>
    ) : (
      <div
        className="content-grid"
      >
        {items.map((item) => (
          <ContentCard key={item.id} item={item} type="movie" />
        ))}
      </div>
    )}
  </div>
);
}
