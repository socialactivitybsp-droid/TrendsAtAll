const risingFallback = [
  {
    title: 'T20 World Cup qualifiers',
    subtitle: 'Rising · India',
    image: '',
    rank: 1,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Budget 2024 highlights',
    subtitle: 'Breakout · India',
    image: '',
    rank: 2,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'EV scooter subsidy',
    subtitle: 'Rising · India',
    image: '',
    rank: 3,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Monsoon travel deals',
    subtitle: 'Breakout · India',
    image: '',
    rank: 4,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'AI resume builder',
    subtitle: 'Rising · India',
    image: '',
    rank: 5,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'UPI Lite',
    subtitle: 'Breakout · India',
    image: '',
    rank: 6,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'IPL auction list',
    subtitle: 'Rising · India',
    image: '',
    rank: 7,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Startup layoffs tracker',
    subtitle: 'Rising · India',
    image: '',
    rank: 8,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Solar rooftop subsidy',
    subtitle: 'Breakout · India',
    image: '',
    rank: 9,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'New Aadhaar update',
    subtitle: 'Rising · India',
    image: '',
    rank: 10,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
];

const categoryFallback = [
  {
    title: 'Online learning platforms',
    subtitle: 'Breakout · Education',
    image: '',
    rank: 1,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Affordable housing',
    subtitle: 'Rising · Real Estate',
    image: '',
    rank: 2,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Smart fitness bands',
    subtitle: 'Rising · Wellness',
    image: '',
    rank: 3,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Budget air purifiers',
    subtitle: 'Breakout · Home',
    image: '',
    rank: 4,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Quick commerce groceries',
    subtitle: 'Rising · Retail',
    image: '',
    rank: 5,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Electric two-wheelers',
    subtitle: 'Breakout · Mobility',
    image: '',
    rank: 6,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'SaaS productivity tools',
    subtitle: 'Rising · Business',
    image: '',
    rank: 7,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Luxury staycations',
    subtitle: 'Rising · Travel',
    image: '',
    rank: 8,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Regional OTT series',
    subtitle: 'Breakout · Entertainment',
    image: '',
    rank: 9,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
  {
    title: 'Instant credit cards',
    subtitle: 'Rising · Finance',
    image: '',
    rank: 10,
    platform: 'Google Trends',
    url: 'https://trends.google.com',
  },
];

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
      subtitle: 'India · Fallback highlights',
      items: risingFallback,
    };
  }
};

export const fetchGoogleCategoryTrends = async () => {
  return {
    title: 'Google Trends — Category Momentum',
    subtitle: 'India · Curated categories',
    items: categoryFallback,
  };
};
