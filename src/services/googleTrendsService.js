const risingFallback = [
  {
    title: 'Cricket World Cup qualifiers',
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

export const fetchGoogleRisingSearches = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/google-trends');
    if (!response.ok) {
      throw new Error('Failed to load daily trends');
    }
    const data = await response.json();
    const items = data.items || [];
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
  try {
    const response = await fetch('http://localhost:5000/api/google-trends/realtime');
    if (!response.ok) {
      throw new Error('Failed to load realtime trends');
    }
    const data = await response.json();
    const items = data.items || [];
    return {
      title: 'Google Trends — Category Momentum',
      subtitle: 'India · Live categories',
      items,
    };
  } catch (error) {
    return {
      title: 'Google Trends — Category Momentum',
      subtitle: 'India · Fallback categories',
      items: categoryFallback,
    };
  }
};
