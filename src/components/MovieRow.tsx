import { type Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

const MovieRow = ({ title, movies, isLoading }: MovieRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="py-6">
        <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[160px]">
              <div className="aspect-[2/3] rounded-lg bg-muted animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(0 0% 14%) 0%, hsl(0 0% 20%) 50%, hsl(0 0% 14%) 100%)" }} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!movies.length) return null;

  return (
    <section className="py-6 group/row">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full bg-secondary hover:bg-accent text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full bg-secondary hover:bg-accent text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth"
      >
        {movies.map((movie, i) => (
          <div key={movie.id} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px]">
            <MovieCard movie={movie} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
