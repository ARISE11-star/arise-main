import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchMulti } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { Search as SearchIcon } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMulti(query),
    enabled: !!query,
  });

  const filtered = results.data?.results.filter(
    (r) => r.media_type === "movie" || r.media_type === "tv"
  ) || [];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-muted-foreground mb-8">
            Showing results for "<span className="text-foreground">{query}</span>"
          </p>
        )}

        {!query && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Search for movies and TV shows</p>
          </div>
        )}

        {results.isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-muted animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(0 0% 14%) 0%, hsl(0 0% 20%) 50%, hsl(0 0% 14%) 100%)" }} />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((item, i) => (
              <MovieCard key={item.id} movie={item} index={i} />
            ))}
          </div>
        )}

        {query && !results.isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
