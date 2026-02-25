import { useQuery } from "@tanstack/react-query";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import GenreGrid from "@/components/GenreGrid";
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularTVShows,
  getTopRatedTVShows,
  getMovieGenres,
} from "@/lib/tmdb";

const Index = () => {
  const trending = useQuery({ queryKey: ["trending"], queryFn: () => getTrending() });
  const popular = useQuery({ queryKey: ["popular-movies"], queryFn: () => getPopularMovies() });
  const topRated = useQuery({ queryKey: ["top-rated-movies"], queryFn: () => getTopRatedMovies() });
  const nowPlaying = useQuery({ queryKey: ["now-playing"], queryFn: () => getNowPlayingMovies() });
  const popularTV = useQuery({ queryKey: ["popular-tv"], queryFn: () => getPopularTVShows() });
  const topRatedTV = useQuery({ queryKey: ["top-rated-tv"], queryFn: () => getTopRatedTVShows() });
  const genres = useQuery({ queryKey: ["movie-genres"], queryFn: getMovieGenres });

  return (
    <div>
      <HeroBanner movies={trending.data?.results || []} />

      <div className="container mx-auto px-4">
        <MovieRow
          title="🔥 Trending Now"
          movies={trending.data?.results || []}
          isLoading={trending.isLoading}
        />

        {genres.data && (
          <GenreGrid genres={genres.data.genres} mediaType="movie" />
        )}

        <MovieRow
          title="🎬 Now Playing"
          movies={nowPlaying.data?.results || []}
          isLoading={nowPlaying.isLoading}
        />

        <MovieRow
          title="⭐ Popular Movies"
          movies={popular.data?.results || []}
          isLoading={popular.isLoading}
        />

        <MovieRow
          title="🏆 Top Rated Movies"
          movies={topRated.data?.results || []}
          isLoading={topRated.isLoading}
        />

        <MovieRow
          title="📺 Popular TV Shows"
          movies={popularTV.data?.results || []}
          isLoading={popularTV.isLoading}
        />

        <MovieRow
          title="🌟 Top Rated TV Shows"
          movies={topRatedTV.data?.results || []}
          isLoading={topRatedTV.isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
