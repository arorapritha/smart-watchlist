import { useEffect, useState } from "react";
import { discoverMovies, getTrendingMovies } from "../api/tmdb";
import ContentCard from "../components/ContentCard";
import FilterBar from "../components/FilterBar";

export default function Explore() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
    popularity: "desc",
    timeframe: "",
  });

useEffect(() => {
  const fetchData = async () => {
    const data = await getTrendingMovies();
    setItems(data);
  };

  fetchData();
  
}, []);



async function applyFilters() {
  let startDate = "";
  let endDate = "";

  if (filters.timeframe === "last_5_years") {
    startDate = "2018-01-01";
    endDate = "2026-12-31";
  } else if (filters.timeframe === "classics") {
    startDate = "1980-01-01";
    endDate = "2010-12-31";
  }

  const data = await discoverMovies({
    genre: filters.genre,
    language: filters.language,
    popularity: filters.popularity,
    startDate,
    endDate,
  });

  setItems(data);
}

  return (
    <div style={{ padding: "20px" }}>
      <h1
  style={{
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
  }}
>
  Explore
</h1>
      <FilterBar filters={filters} setFilters={setFilters} onApply={applyFilters} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {items.map((item) => (
          <ContentCard key={item.id} item={item} type="movie" />
        ))}
      </div>
    </div>
  );
}