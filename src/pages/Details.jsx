import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieProviders,
  getMovieVideos,
} from "../api/tmdb";

export default function Details() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [providers, setProviders] = useState(null);
  const [video, setVideo] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const details = await getMovieDetails(id);
      const providerData = await getMovieProviders(id);
      const videos = await getMovieVideos(id);

      const trailer = videos.find((v) => v.type === "Trailer");
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

      setItem(details);
      setProviders(providerData);
      setVideo(trailer);
      setIsSaved(watchlist.some((x) => x.id === details.id));
    };

    fetchData();
  }, [id]);

  if (!item) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : "";

  const region = providers?.US || providers?.IN || null;
  const link = region?.link;

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
  }

  return (
    <div>

      {/* 🎬 HERO BANNER */}
      <div
        style={{
          height: "70vh",
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
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
            maxWidth: "600px",
          }}
        >
          <h1 style={{ fontSize: "42px" }}>
            {item.title || item.name}
          </h1>

          <p style={{ color: "#ccc", marginTop: "10px" }}>
            ⭐ {item.vote_average?.toFixed(1)} | {item.release_date}
          </p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            {link && (
              <a href={link} target="_blank" rel="noreferrer">
                <button style={primaryBtn}>▶ Watch Now</button>
              </a>
            )}

            <button
              style={{
                ...secondaryBtn,
                background: isSaved ? "#555" : "#e50914",
              }}
              onClick={() => toggleWatchlist(item)}
            >
              {isSaved ? "✓ Saved" : "+ Watchlist"}
            </button>

            {video && (
              <button
                style={secondaryBtn}
                onClick={() => setShowTrailer(true)}
              >
                🎬 Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🎭 DETAILS */}
      <div style={{ padding: "30px" }}>
        <h2>Overview</h2>
        <p style={{ color: "#ccc", maxWidth: "800px" }}>
          {item.overview}
        </p>

        <h3 style={{ marginTop: "20px" }}>Genres</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {item.genres?.map((g) => (
            <span
              key={g.id}
              style={{
                background: "#222",
                padding: "6px 10px",
                borderRadius: "6px",
              }}
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>

      {/* 🎬 TRAILER POPUP */}
      {showTrailer && video && (
        <div
          onClick={() => setShowTrailer(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "80%", maxWidth: "800px" }}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

const primaryBtn = {
  background: "#e50914",
  border: "none",
  color: "white",
  padding: "10px 18px",
  borderRadius: "6px",
};

const secondaryBtn = {
  background: "#333",
  border: "none",
  color: "white",
  padding: "10px 18px",
  borderRadius: "6px",
};
