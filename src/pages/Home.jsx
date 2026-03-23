import { useEffect, useState } from "react";
import { getTrendingMovies, discoverMovies } from "../api/tmdb";
import ContentCard from "../components/ContentCard";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trendingData = await getTrendingMovies();
      const actionData = await discoverMovies({ genre: 28 });
      const comedyData = await discoverMovies({ genre: 35 });

      setTrending(trendingData);
      setAction(actionData);
      setComedy(comedyData);
    };

    fetchData();
  }, []);

  if (!trending.length) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }
  function saveToWatchlist(item) {
  const existing = JSON.parse(localStorage.getItem("watchlist") || "[]");

  const alreadyExists = existing.some((x) => x.id === item.id);
  if (alreadyExists) return;

  const updated = [...existing, item];
  localStorage.setItem("watchlist", JSON.stringify(updated));

  // alert("Saved to Watchlist!");
}

  return (
    <div>

      {/* 🎬 HERO BANNER */}
      {trending[0] && (
        <div
          style={{
            height: "70vh",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0].backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            marginBottom: "30px",
            zIndex:1 
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #0f0f0f 10%, transparent 60%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "30px",
              maxWidth: "500px",
            }}
          >
            <h1 style={{ fontSize: "40px" }}>
              {trending[0].title}
            </h1>

            <p style={{ color: "#ccc", marginTop: "10px" }}>
              {trending[0].overview?.slice(0, 120)}...
            </p>

            <button
  style={primaryBtn}
  onClick={() => saveToWatchlist(trending[0])}
>
  + Save to Watchlist
</button>
          </div>
        </div>
      )}

      {/* CONTENT BELOW */}
      <div style={{ padding: "20px" }}>
        <Section title="🔥 Trending" data={trending} />
        <Section title="💥 Action Movies" data={action} />
        <Section title="😂 Comedy Picks" data={comedy} />
      </div>

    </div>
  );
}

function Section({ title, data }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "10px" }}>{title}</h2>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "15px",
        }}
      >
        {data.map((item) => (
          <div key={item.id} style={{ minWidth: "180px" }}>
            <ContentCard item={item} type="movie" />
          </div>
        ))}
      </div>
    </div>
  );
}

const primaryBtn = {
  background: "#e50914",
  border: "none",
  color: "white",
  padding: "10px 20px",
  borderRadius: "6px",
  fontSize: "16px",
};
