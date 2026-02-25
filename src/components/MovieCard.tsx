import { getImageUrl, type Movie } from "@/lib/tmdb";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  const title = movie.title || movie.name || "Untitled";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/${mediaType}/${movie.id}`}
        className="group block relative rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:scale-[1.03]"
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              {year && <span className="text-xs text-muted-foreground">{year}</span>}
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-primary">
                  <Star className="h-3 w-3 fill-primary" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
