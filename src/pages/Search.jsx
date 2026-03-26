import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMulti } from "../api/tmdb";
import ContentCard from "../components/ContentCard";

export default function Search() {
  const query = new URLSearchParams(useLocation().search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await searchMulti(query);
      setResults(data);
    };
    if (query) fetch();
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Results for "{query}"</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
          gap: "20px",
          justifyContent: "start",
        }}
      >
        {results.map((item) => (
          <ContentCard key={item.id} item={item} type="movie" />
        ))}
      </div>
    </div>
  );
}
