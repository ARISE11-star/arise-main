import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPopularTVShows, getTopRatedTVShows, getOnTheAirTVShows, getTVGenres, discoverTV } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { useState } from "react";

const Shows = () => {
  const [searchParams] = useSearchParams();
  const genreFilter = searchParams.get("genre");
  const [activeTab, setActiveTab] = useState<"popular" | "top_rated" | "on_the_air">("popular");

  const tabs = [
    { key: "popular" as const, label: "Popular" },
    { key: "top_rated" as const, label: "Top Rated" },
    { key: "on_the_air" as const, label: "On The Air" },
  ];

  const fetchFn = {
    popular: getPopularTVShows,
    top_rated: getTopRatedTVShows,
    on_the_air: getOnTheAirTVShows,
  };

  const shows = useQuery({
    queryKey: ["tv-shows", activeTab, genreFilter],
    queryFn: () => genreFilter
      ? discoverTV({ with_genres: genreFilter, sort_by: "popularity.desc" })
      : fetchFn[activeTab](),
  });

  const genres = useQuery({ queryKey: ["tv-genres"], queryFn: getTVGenres });
  const genreName = genres.data?.genres.find((g) => String(g.id) === genreFilter)?.name;

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {genreName ? `${genreName} TV Shows` : "TV Shows"}
        </h1>

        {!genreFilter && (
          <div className="flex gap-1 bg-secondary/60 rounded-full p-1 w-fit mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {shows.isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-muted animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(0 0% 14%) 0%, hsl(0 0% 20%) 50%, hsl(0 0% 14%) 100%)" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {shows.data?.results.map((show, i) => (
              <MovieCard key={show.id} movie={{ ...show, media_type: "tv" }} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shows;
