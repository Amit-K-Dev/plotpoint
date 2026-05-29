const PATTERNS = [
  /youtu\.be\/([^?&#]+)/,
  /youtube\.com\/watch\?v=([^&#]+)/,
  /youtube\.com\/embed\/([^?&#]+)/,
  /youtube\.com\/shorts\/([^?&#]+)/,
];

export function extractYouTubeId(url) {
  if (!url) return null;

  for (const pattern of PATTERNS) {
    const match = url.match(pattern);

    if (match) {
      return match[1];
    }
  }

  return null;
}

export function getEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}