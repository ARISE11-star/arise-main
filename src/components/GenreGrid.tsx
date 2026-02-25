import { type Genre } from "@/lib/tmdb";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface GenreGridProps {
  genres: Genre[];
  mediaType: "movie" | "tv";
}

const genreImages: Record<number, string> = {
  28: "🎬", 12: "🗺️", 16: "🎨", 35: "😂", 80: "🔫",
  99: "📹", 18: "🎭", 10751: "👨‍👩‍👧‍👦", 14: "🧙", 36: "📜",
  27: "👻", 10402: "🎵", 9648: "🔍", 10749: "❤️", 878: "🚀",
  10770: "📺", 53: "😱", 10752: "⚔️", 37: "🤠",
  10759: "🗺️", 10762: "👶", 10763: "📰", 10764: "🏠",
  10765: "🚀", 10766: "📺", 10767: "💬", 10768: "⚔️",
};

const GenreGrid = ({ genres, mediaType }: GenreGridProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-foreground mb-5">Explore by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {genres.slice(0, 10).map((genre, i) => (
          <motion.button
            key={genre.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/${mediaType === "movie" ? "movies" : "shows"}?genre=${genre.id}`)}
            className="group relative bg-card border border-border/50 rounded-lg p-4 hover:border-primary/40 transition-all duration-300 hover:bg-secondary text-left"
          >
            <span className="text-2xl mb-2 block">{genreImages[genre.id] || "🎞️"}</span>
            <span className="text-sm font-semibold text-foreground">{genre.name}</span>
            <span className="text-xs text-muted-foreground block mt-0.5 group-hover:text-primary transition-colors">
              →
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default GenreGrid;
