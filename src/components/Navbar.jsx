import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav style={navStyle}>
      {/* LEFT */}
      <h2 style={{ color: "#e50914" }}>Watchlist</h2>

      {/* CENTER LINKS */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/for-you">For You</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>

      {/* RIGHT SEARCH */}
      <input
        placeholder="Search..."
        className="search-bar"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
            closeMenu();
          }
        }}
      />

      {/* MOBILE ICON */}
      <button
        type="button"
        className="menu-icon"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/explore" onClick={closeMenu}>
            Explore
          </Link>
          <Link to="/for-you" onClick={closeMenu}>
            For You
          </Link>
          <Link to="/watchlist" onClick={closeMenu}>
            Watchlist
          </Link>
        </div>
      )}
    </nav>
  );
}

const navStyle = {
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#111",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 9999,
};
