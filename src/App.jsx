import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ForYou from "./pages/ForYou";
import Watchlist from "./pages/Watchlist";
import Details from "./pages/Details";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
