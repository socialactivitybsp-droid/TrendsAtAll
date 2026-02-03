const mapDailyTrend = (trend, index) => ({
  title: trend.title?.query || trend.title || 'Trending search',
  subtitle: 'Rising · India',
  image: trend.image?.imageUrl || '',
  rank: index + 1,
  platform: 'Google Trends',
  url: 'https://trends.google.com',
});

const safeParseTrends = (text) => {
  const sanitized = text.replace(/^[^)]+\)\]\}'/, '');
  return JSON.parse(sanitized);
};

export const fetchGoogleRisingSearches = async () => {
  try {
    const response = await fetch('https://trends.google.com/trends/api/dailytrends?hl=en-IN&geo=IN&ns=15');
    if (!response.ok) {
      throw new Error('Failed to load daily trends');
    }
    const text = await response.text();
    const data = safeParseTrends(text);
    const trends = data.default?.trendingSearchesDays?.[0]?.trendingSearches || [];
    const items = trends.slice(0, 10).map(mapDailyTrend);

    if (items.length === 0) {
      throw new Error('No trends found');
    }

    return {
      title: 'Google Trends — Top Rising Searches',
      subtitle: 'India · Live snapshot',
      items,
    };
  } catch (error) {
    return {
      title: 'Google Trends — Top Rising Searches',
      subtitle: 'India · Data unavailable',
      items: [],
    };
  }
};

const mapRealtimeStory = (story, index) => ({
  title: story.title || 'Trending topic',
  subtitle: `${story.category || 'Category'} · India`,
  image: story.image?.imgUrl || '',
  rank: index + 1,
  platform: 'Google Trends',
  url: 'https://trends.google.com',
});

export const fetchGoogleCategoryTrends = async () => {
  try {
    const response = await fetch(
      'https://trends.google.com/trends/api/realtimetrends?hl=en-IN&geo=IN&cat=all&ri=300&rs=20&sort=0'
    );
    if (!response.ok) {
      throw new Error('Failed to load realtime trends');
    }
    const text = await response.text();
    const data = safeParseTrends(text);
    const stories = data.storySummaries?.trendingStories || [];
    const items = stories.slice(0, 10).map(mapRealtimeStory);
    return {
      title: 'Google Trends — Category Momentum',
      subtitle: 'India · Live categories',
      items,
    };
  } catch (error) {
    return {
      title: 'Google Trends — Category Momentum',
      subtitle: 'India · Data unavailable',
      items: [],
    };
  }
};
