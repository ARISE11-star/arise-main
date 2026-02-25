import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieDetails, getTVShowDetails, getTVSeasonDetails, getBackdropUrl, getImageUrl, type Cast, type Episode } from "@/lib/tmdb";
import { getMoviePlayers, getTvShowPlayers, type PlayerSource } from "@/lib/players";
import MovieRow from "@/components/MovieRow";
import { Star, Clock, Calendar, Play, X, ChevronDown, Tv, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MovieDetail = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const isTV = type === "tv";

  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasonDropdownOpen, setSeasonDropdownOpen] = useState(false);
  const [playerActivated, setPlayerActivated] = useState(false);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["detail", type, id],
    queryFn: () => (isTV ? getTVShowDetails(Number(id)) : getMovieDetails(Number(id))),
    enabled: !!id,
  });

  const { data: seasonData } = useQuery({
    queryKey: ["season", id, selectedSeason],
    queryFn: () => getTVSeasonDetails(Number(id), selectedSeason),
    enabled: isTV && !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="h-[60vh] bg-muted animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(0 0% 14%) 0%, hsl(0 0% 20%) 50%, hsl(0 0% 14%) 100%)" }} />
      </div>
    );
  }

  if (!movie) return <div className="min-h-screen pt-20 text-center text-muted-foreground">Not found</div>;

  const title = movie.title || movie.name || "";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const cast = movie.credits?.cast.slice(0, 12) || [];
  const director = movie.credits?.crew.find((c) => c.job === "Director");

  const players: PlayerSource[] = isTV
    ? getTvShowPlayers(Number(id), selectedSeason, selectedEpisode)
    : getMoviePlayers(Number(id));

  const currentPlayer = players[selectedPlayer] || players[0];

  const seasons = movie.seasons?.filter((s) => s.season_number > 0) || [];
  const episodes = seasonData?.episodes || [];

  const handlePlayEpisode = (ep: Episode) => {
    setSelectedEpisode(ep.episode_number);
    setSelectedPlayer(0);
    setPlayerActivated(false);
    setPlayerOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Player Modal */}
      <AnimatePresence>
        {playerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border/30">
              {/* Title hidden — uncomment to restore
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {title}
                  {isTV && ` — S${selectedSeason}E${selectedEpisode}`}
                </h3>
              </div>
              */}
              <div className="flex items-center gap-2">
                {/* Player Source Selector — hidden, VidFast only for now */}
                {/* <div className="flex gap-1 overflow-x-auto hide-scrollbar">
                  {players.map((p, i) => (
                    <button
                      key={p.title}
                      onClick={() => setSelectedPlayer(i)}
                      className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${i === selectedPlayer
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {p.title}
                      {p.recommended && " ⭐"}
                    </button>
                  ))}
                </div> */}
                <button
                  onClick={() => { setPlayerOpen(false); setPlayerActivated(false); }}
                  className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <iframe
                key={currentPlayer.source}
                src={currentPlayer.source}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-shrink-0"
          >
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={title}
              className="w-48 md:w-64 rounded-xl shadow-2xl border border-border/30"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">{title}</h1>

            {movie.tagline && (
              <p className="text-muted-foreground italic mb-4 text-sm">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                  <Star className="h-4 w-4 fill-primary" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              {year && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {year}
                </span>
              )}
              {movie.runtime && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {movie.number_of_seasons && (
                <span className="text-sm text-muted-foreground">
                  {movie.number_of_seasons} Season{movie.number_of_seasons > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres.map((g) => (
                <span key={g.id} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Play Now Button */}
            <button
              onClick={() => {
                setSelectedPlayer(0);
                setPlayerActivated(false);
                setPlayerOpen(true);
              }}
              className="inline-flex items-center gap-2 gradient-red text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity mb-6"
            >
              <Play className="h-5 w-5 fill-current" />
              {isTV ? `Play S${selectedSeason}E${selectedEpisode}` : "Play Now"}
            </button>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{movie.overview}</p>
            </div>

            {director && (
              <p className="text-sm text-muted-foreground mb-6">
                <span className="text-foreground font-medium">Director:</span> {director.name}
              </p>
            )}
          </motion.div>
        </div>

        {/* Seasons & Episodes for TV */}
        {isTV && seasons.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <Tv className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Seasons & Episodes</h2>

              {/* Season Selector */}
              <div className="relative">
                <button
                  onClick={() => setSeasonDropdownOpen(!seasonDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  Season {selectedSeason}
                  <ChevronDown className={`h-4 w-4 transition-transform ${seasonDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {seasonDropdownOpen && (
                  <div className="absolute top-full mt-1 left-0 z-20 bg-card border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto min-w-[160px]">
                    {seasons.map((s) => (
                      <button
                        key={s.season_number}
                        onClick={() => {
                          setSelectedSeason(s.season_number);
                          setSelectedEpisode(1);
                          setSeasonDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedSeason === s.season_number
                          ? "bg-primary/20 text-primary font-semibold"
                          : "text-foreground hover:bg-secondary"
                          }`}
                      >
                        {s.name} ({s.episode_count} ep)
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Episodes Grid */}
            {episodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => handlePlayEpisode(ep)}
                    className={`group text-left rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] ${selectedEpisode === ep.episode_number
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-card hover:border-primary/40"
                      }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {ep.still_path ? (
                        <img
                          src={getImageUrl(ep.still_path, "w400")}
                          alt={ep.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Film className="h-8 w-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                      {ep.runtime && (
                        <span className="absolute bottom-2 right-2 bg-black/70 text-xs text-white px-2 py-0.5 rounded">
                          {ep.runtime}m
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-primary font-semibold mb-1">
                        Episode {ep.episode_number}
                        {ep.vote_average > 0 && (
                          <span className="text-muted-foreground ml-2">
                            ⭐ {ep.vote_average.toFixed(1)}
                          </span>
                        )}
                      </p>
                      <h4 className="text-sm font-medium text-foreground truncate">{ep.name}</h4>
                      {ep.overview && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ep.overview}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-video rounded-lg bg-muted animate-shimmer" style={{ backgroundSize: "200% 100%", backgroundImage: "linear-gradient(90deg, hsl(0 0% 14%) 0%, hsl(0 0% 20%) 50%, hsl(0 0% 14%) 100%)" }} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Cast</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {cast.map((person) => (
                <CastCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* Similar */}
        {movie.similar && movie.similar.results.length > 0 && (
          <MovieRow
            title="Similar"
            movies={movie.similar.results.map((m) => ({ ...m, media_type: type }))}
          />
        )}
      </div>
    </div>
  );
};

const CastCard = ({ person }: { person: Cast }) => (
  <div className="flex-shrink-0 w-24 text-center">
    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-muted mb-2">
      {person.profile_path ? (
        <img
          src={getImageUrl(person.profile_path, "w185")}
          alt={person.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
          No Photo
        </div>
      )}
    </div>
    <p className="text-xs font-medium text-foreground truncate">{person.name}</p>
    <p className="text-xs text-muted-foreground truncate">{person.character}</p>
  </div>
);

export default MovieDetail;
