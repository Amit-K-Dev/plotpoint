

export const ANALYSIS_SECTIONS = [
  { key: "genre",          icon: "🎭", label: "Genre & Classification" },
  { key: "narrative",      icon: "📖", label: "Narrative & Plot Hints" },
  { key: "themes",         icon: "🔍", label: "Thematic Depth" },
  { key: "cinematography", icon: "🎬", label: "Cinematic Style" },
  { key: "tone",           icon: "🌑", label: "Emotional Atmosphere" },
  { key: "characters",     icon: "👥", label: "Character Dynamics" },
  { key: "sound",          icon: "🎵", label: "Sound & Score" },
  { key: "easter_eggs",    icon: "🥚", label: "Easter Eggs & Hidden Clues" },
  { key: "pacing",         icon: "⏱️",  label: "Trailer Pacing & Structure" },
  { key: "audience",       icon: "🎯", label: "Target Audience" },
  { key: "marketing",      icon: "📣", label: "Marketing Strategy" },
] as const;

export const EXTRA_SECTIONS = [
  { key: "director_style",      icon: "🎥", label: "Director's Signature" },
  { key: "cast_dynamics",       icon: "🌟", label: "Cast Dynamics" },
  { key: "franchise_potential", icon: "🏛️",  label: "Franchise Potential" },
  { key: "awards_potential",    icon: "🏆", label: "Awards Potential" },
] as const;

export const LIKELIHOOD_CONFIG = {
  High:   { color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.3)",  pct: 85 },
  Medium: { color: "#f0c040", bg: "rgba(240,192,64,0.12)",  border: "rgba(240,192,64,0.3)",  pct: 55 },
  Low:    { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)", pct: 25 },
} as const;

export const WATCHLIST_STATUSES: WatchlistStatus[] = [
  "Want to Watch", "Watching", "Watched", "Dropped",
];

export const STATUS_COLORS: Record = {
  "Want to Watch": "#60b0f0",
  Watching:        "#f0c040",
  Watched:         "#4ade80",
  Dropped:         "#f87171",
};

export const HYPE_BARS = [
  { key: "visuals",     label: "Visuals",     color: "#60b0f0" },
  { key: "story",       label: "Story",       color: "#c084fc" },
  { key: "cast",        label: "Cast",        color: "#f0c040" },
  { key: "originality", label: "Originality", color: "#4ade80" },
] as const;

export const QUICK_QUESTIONS = [
  "What's the biggest clue in the trailer?",
  "Who is the real villain?",
  "Will this win awards?",
  "Is there a twist ending?",
];

export const LOADING_MESSAGES = [
  "Scanning visual language…",
  "Decoding narrative threads…",
  "Building fan theories…",
  "Mapping emotion arc…",
  "Hunting easter eggs…",
  "Finalising deep dive…",
];

export const MAX_HISTORY = 30;
export const MAX_IMAGES  = 5;

export const STORAGE_KEYS = {
  history:   "tra_history",
  watchlist: "tra_watchlist",
} as const;
