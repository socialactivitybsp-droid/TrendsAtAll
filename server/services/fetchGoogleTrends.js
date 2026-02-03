import { getCache, setCache } from './cache.js';

const CACHE_TTL = 5 * 60 * 1000;

const sanitizeResponse = (text) => text.replace(/^[^)]+\)\]\}'/, '');

const mapDailyTrend = (trend, index) => ({
  title: trend.title?.query || trend.title || 'Trending search',
  subtitle: 'Rising · India',
  image: trend.image?.imageUrl || '',
  rank: index + 1,
  platform: 'Google Trends',
  url: 'https://trends.google.com',
});

const mapRealtimeStory = (story, index) => ({
  title: story.title || 'Trending topic',
  subtitle: `${story.category || 'Category'} · India`,
  image: story.image?.imgUrl || '',
  rank: index + 1,
  platform: 'Google Trends',
  url: 'https://trends.google.com',
});

export const fetchDailyTrends = async () => {
  const cacheKey = 'google-trends-daily';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch('https://trends.google.com/trends/api/dailytrends?hl=en-IN&geo=IN&ns=15');
  if (!response.ok) {
    throw new Error('Failed to fetch Google daily trends');
  }
  const text = await response.text();
  const data = JSON.parse(sanitizeResponse(text));
  const trends = data.default?.trendingSearchesDays?.[0]?.trendingSearches || [];
  const items = trends.slice(0, 10).map(mapDailyTrend);
  const payload = { items };
  setCache(cacheKey, payload, CACHE_TTL);
  return payload;
};

export const fetchRealtimeTrends = async () => {
  const cacheKey = 'google-trends-realtime';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(
    'https://trends.google.com/trends/api/realtimetrends?hl=en-IN&geo=IN&cat=all&ri=300&rs=20&sort=0'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch Google realtime trends');
  }
  const text = await response.text();
  const data = JSON.parse(sanitizeResponse(text));
  const stories = data.storySummaries?.trendingStories || [];
  const items = stories.slice(0, 10).map(mapRealtimeStory);
  const payload = { items };
  setCache(cacheKey, payload, CACHE_TTL);
  return payload;
};
