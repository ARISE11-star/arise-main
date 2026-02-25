import { getBackdropUrl, type Movie } from "@/lib/tmdb";
import { Play, Star, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroBannerProps {
  movies: Movie[];
}

const HeroBanner = ({ movies }: HeroBannerProps) => {
  const [current, setCurrent] = useState(0);
  const featured = movies.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!featured.length) return null;

  const movie = featured[current];
  const title = movie.title || movie.name || "";
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-3 mb-5 max-w-lg">
              {movie.overview}
            </p>
            <div className="flex items-center gap-3 mb-6">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 text-sm text-primary font-semibold">
                  <Star className="h-4 w-4 fill-primary" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {(movie.release_date || movie.first_air_date || "").slice(0, 4)}
              </span>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/${mediaType}/${movie.id}`}
                className="gradient-red text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Play className="h-4 w-4 fill-current" /> Watch Now
              </Link>
              <Link
                to={`/${mediaType}/${movie.id}`}
                className="bg-secondary text-foreground px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-accent transition-colors"
              >
                <Info className="h-4 w-4" /> More Info
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="flex gap-1.5 mt-6">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-4 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
