import { getCache, setCache } from './cache.js';

const CACHE_TTL = 10 * 60 * 1000;

const normalizeSong = (song, index) => ({
  title: song.name,
  subtitle: `${song.artistName} · Rank ${index + 1}`,
  image: song.artworkUrl100 || song.artworkUrl60 || '',
  rank: index + 1,
  platform: 'Apple Music',
  url: song.url || 'https://music.apple.com',
});

export const fetchAppleMusic = async () => {
  const cacheKey = 'apple-music-top';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch('https://rss.applemarketingtools.com/api/v2/in/music/most-played/10/songs.json');
  if (!response.ok) {
    throw new Error('Failed to fetch Apple Music charts');
  }
  const data = await response.json();
  const items = (data.feed?.results || []).map(normalizeSong).slice(0, 10);
  const payload = { items };
  setCache(cacheKey, payload, CACHE_TTL);
  return payload;
};
