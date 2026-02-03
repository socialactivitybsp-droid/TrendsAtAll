import { XMLParser } from 'fast-xml-parser';
import { getCache, setCache } from './cache.js';

const CACHE_TTL = 5 * 60 * 1000;

const normalizeEntry = (entry, index) => ({
  title: entry.title || 'Trending track',
  subtitle: `${entry.author?.name || 'YouTube'} · Rank ${index + 1}`,
  image: entry['media:group']?.['media:thumbnail']?.['@_url'] || '',
  rank: index + 1,
  platform: 'YouTube Music',
  url: entry.link?.['@_href'] || 'https://music.youtube.com',
});

export const fetchYouTubeMusic = async () => {
  const cacheKey = 'youtube-music-trending';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(
    'https://www.youtube.com/feeds/videos.xml?chart=most_popular&regionCode=IN'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch YouTube Music feed');
  }
  const xmlText = await response.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xmlText);
  const entries = parsed.feed?.entry ? [].concat(parsed.feed.entry) : [];
  const items = entries.slice(0, 10).map(normalizeEntry);
  const payload = { items };
  setCache(cacheKey, payload, CACHE_TTL);
  return payload;
};
