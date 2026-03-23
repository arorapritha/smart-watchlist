import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
<input
  placeholder="Search movies..."
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`);
    }
  }}
  style={searchStyle}
/>
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "#e50914" }}>Watchlist</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/explore" style={linkStyle}>Explore</Link>
        <Link to="/for-you" style={linkStyle}>For You</Link>
        <Link to="/watchlist" style={linkStyle}>Watchlist</Link>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />
    </nav>
  );
}

const navStyle = {
  padding: "16px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#111",
};

const linkStyle = {
  color: "white",
};

const searchStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "white",
};