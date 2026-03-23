import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = import.meta.env.VITE_TMDB_BASE_URL;

const client = axios.create({
  baseURL,
  params: {
    api_key: apiKey,
  },
});

export async function getTrendingMovies() {
  const res = await client.get("/trending/movie/week");
  return res.data.results;
}

export async function discoverMovies(filters = {}) {
  const params = {
    sort_by:
      filters.popularity === "asc"
        ? "popularity.asc"
        : "popularity.desc",

    with_genres: filters.genre || undefined,
    with_original_language: filters.language || undefined,
    primary_release_date_gte: filters.startDate || undefined,
    primary_release_date_lte: filters.endDate || undefined,
  };

  const res = await client.get("/discover/movie", { params });
  return res.data.results;
}

export async function getMovieDetails(id) {
  const res = await client.get(`/movie/${id}`);
  return res.data;
}

export async function getMovieProviders(id) {
  const res = await client.get(`/movie/${id}/watch/providers`);
  return res.data.results;
}

export async function searchMulti(query) {
  const res = await client.get("/search/multi", {
    params: { query },
  });
  return res.data.results;
}

export async function getMovieVideos(id) {
  const res = await client.get(`/movie/${id}/videos`);
  return res.data.results;
}
