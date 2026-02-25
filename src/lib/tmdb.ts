const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return "/placeholder.svg";
  return `${IMG_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null) => getImageUrl(path, "original");

export const getApiKey = (): string => import.meta.env.VITE_TMDB_API_KEY ?? "";

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const key = getApiKey();
  if (!key) throw new Error("TMDB API key not set");
  const searchParams = new URLSearchParams({ api_key: key, ...params });
  const res = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  media_type?: string;
  popularity: number;
}

export interface MovieDetails extends Movie {
  runtime?: number;
  number_of_seasons?: number;
  seasons?: Season[];
  genres: { id: number; name: string }[];
  tagline?: string;
  status: string;
  production_companies: { id: number; name: string; logo_path: string | null }[];
  videos?: { results: Video[] };
  credits?: { cast: Cast[]; crew: Crew[] };
  similar?: { results: Movie[] };
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
  air_date: string | null;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string | null;
  runtime: number | null;
  vote_average: number;
}

export interface SeasonDetails {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episodes: Episode[];
  poster_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Movie endpoints
export const getTrending = (timeWindow: "day" | "week" = "week") =>
  fetchTMDB<TMDBResponse<Movie>>(`/trending/all/${timeWindow}`);

export const getPopularMovies = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/popular", { page: String(page) });

export const getTopRatedMovies = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/top_rated", { page: String(page) });

export const getNowPlayingMovies = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/now_playing", { page: String(page) });

export const getUpcomingMovies = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/upcoming", { page: String(page) });

// TV endpoints
export const getPopularTVShows = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/tv/popular", { page: String(page) });

export const getTopRatedTVShows = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/tv/top_rated", { page: String(page) });

export const getOnTheAirTVShows = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/tv/on_the_air", { page: String(page) });

// Details
export const getMovieDetails = (id: number) =>
  fetchTMDB<MovieDetails>(`/movie/${id}`, { append_to_response: "videos,credits,similar" });

export const getTVShowDetails = (id: number) =>
  fetchTMDB<MovieDetails>(`/tv/${id}`, { append_to_response: "videos,credits,similar" });

// Search
export const searchMulti = (query: string, page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>("/search/multi", { query, page: String(page) });

// Genres
export const getMovieGenres = () => fetchTMDB<{ genres: Genre[] }>("/genre/movie/list");
export const getTVGenres = () => fetchTMDB<{ genres: Genre[] }>("/genre/tv/list");

// Season Details
export const getTVSeasonDetails = (tvId: number, seasonNumber: number) =>
  fetchTMDB<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);

// Discover
export const discoverMovies = (params: Record<string, string> = {}) =>
  fetchTMDB<TMDBResponse<Movie>>("/discover/movie", params);

export const discoverTV = (params: Record<string, string> = {}) =>
  fetchTMDB<TMDBResponse<Movie>>("/discover/tv", params);
