export interface PlayerSource {
  title: string;
  source: string;
  recommended?: boolean;
  fast?: boolean;
  ads?: boolean;
}

export const getMoviePlayers = (id: string | number): PlayerSource[] => [
  {
    title: "VidFast",
    source: `https://vidfast.pro/movie/${id}?autoPlay=false`,
    recommended: true,
    fast: true,
  },
  {
    title: "111Movies",
    source: `https://111movies.com/movie/${id}`,
    recommended: true,
    fast: true,
  },
  {
    title: "VidLink",
    source: `https://vidlink.pro/movie/${id}?player=jw&primaryColor=e50914&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false`,
    recommended: true,
    fast: true,
    ads: true,
  },
  {
    title: "VidKing",
    source: `https://www.vidking.net/embed/movie/${id}?color=e50914&autoplay=false`,
    recommended: true,
    fast: true,
  },
  {
    title: "Embed",
    source: `https://embed.su/embed/movie/${id}`,
    ads: true,
  },
  {
    title: "SuperEmbed",
    source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    fast: true,
    ads: true,
  },
  {
    title: "AutoEmbed",
    source: `https://player.autoembed.cc/embed/movie/${id}`,
    ads: true,
  },
];

export const getTvShowPlayers = (
  id: string | number,
  season: number,
  episode: number
): PlayerSource[] => [
    {
      title: "VidFast",
      source: `https://vidfast.pro/tv/${id}/${season}/${episode}?autoPlay=false`,
      recommended: true,
      fast: true,
    },
    {
      title: "111Movies",
      source: `https://111movies.com/tv/${id}/${season}/${episode}`,
      recommended: true,
      fast: true,
    },
    {
      title: "VidLink",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=e50914&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "VidKing",
      source: `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoplay=false`,
      recommended: true,
      fast: true,
    },
    {
      title: "Embed",
      source: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
      fast: true,
      ads: true,
    },
    {
      title: "AutoEmbed",
      source: `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },

  ];
